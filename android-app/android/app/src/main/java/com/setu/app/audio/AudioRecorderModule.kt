package com.setu.app.audio

import android.annotation.SuppressLint
import android.media.AudioFormat
import android.media.AudioRecord
import android.media.MediaRecorder
import android.util.Base64
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.ByteArrayOutputStream

// Minimal real microphone capture — MVP demo scope only. Records 16kHz mono
// 16-bit PCM via AudioRecord (matches exactly what the existing, unmodified
// Next.js Bhashini flow expects: see lib/useVoiceRecorder.ts's WAV encoder
// and lib/bhashini.ts's `audioFormat: "wav", samplingRate: 16000`), wraps it
// in a WAV header, and returns it as one base64 string — same shape the web
// prototype already sends today, so app/api/translate/route.ts and
// lib/bhashini.ts need zero changes.
//
// Deliberately not a TurboModule/generalized audio framework: a classic
// ReactContextBaseJavaModule is enough, RN 0.87's New Architecture still
// supports these through its interop layer.
class AudioRecorderModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  companion object {
    private const val SAMPLE_RATE = 16000
    private const val CHANNEL_CONFIG = AudioFormat.CHANNEL_IN_MONO
    private const val AUDIO_FORMAT = AudioFormat.ENCODING_PCM_16BIT
  }

  private var audioRecord: AudioRecord? = null
  private var recordingThread: Thread? = null
  @Volatile private var isRecording = false
  private val pcmBuffer = ByteArrayOutputStream()

  override fun getName() = "AudioRecorder"

  @SuppressLint("MissingPermission") // caller (JS) already obtained RECORD_AUDIO via PermissionsAndroid before calling this
  @ReactMethod
  fun startRecording(promise: Promise) {
    if (isRecording) {
      promise.resolve(null)
      return
    }
    try {
      val minBufferSize = AudioRecord.getMinBufferSize(SAMPLE_RATE, CHANNEL_CONFIG, AUDIO_FORMAT)
      if (minBufferSize <= 0) {
        promise.reject("AUDIO_RECORD_ERROR", "Device does not support 16kHz mono PCM recording")
        return
      }
      val record = AudioRecord(
        MediaRecorder.AudioSource.MIC,
        SAMPLE_RATE,
        CHANNEL_CONFIG,
        AUDIO_FORMAT,
        minBufferSize * 2,
      )
      if (record.state != AudioRecord.STATE_INITIALIZED) {
        promise.reject("AUDIO_RECORD_ERROR", "AudioRecord failed to initialize")
        return
      }
      audioRecord = record
      pcmBuffer.reset()
      isRecording = true
      record.startRecording()

      recordingThread = Thread {
        val chunk = ByteArray(minBufferSize)
        while (isRecording) {
          val read = record.read(chunk, 0, chunk.size)
          if (read > 0) {
            synchronized(pcmBuffer) { pcmBuffer.write(chunk, 0, read) }
          }
        }
      }
      recordingThread?.start()
      promise.resolve(null)
    } catch (e: Exception) {
      promise.reject("AUDIO_RECORD_ERROR", e.message, e)
    }
  }

  @ReactMethod
  fun stopRecording(promise: Promise) {
    if (!isRecording) {
      promise.resolve("")
      return
    }
    isRecording = false
    try {
      recordingThread?.join(2000)
      audioRecord?.stop()
      audioRecord?.release()
      audioRecord = null

      val pcmBytes = synchronized(pcmBuffer) { pcmBuffer.toByteArray() }
      if (pcmBytes.isEmpty()) {
        android.util.Log.d("AudioRecorderModule", "stopRecording: pcmBytes empty")
        promise.resolve("")
        return
      }
      var peak = 0
      var i = 0
      val windowSamples = SAMPLE_RATE // 1-second windows
      var windowIdx = 0
      var windowSum = 0.0
      var windowCount = 0
      val rmsPerSecond = StringBuilder()
      while (i + 1 < pcmBytes.size) {
        val sample = ((pcmBytes[i + 1].toInt() shl 8) or (pcmBytes[i].toInt() and 0xff)).toShort()
        val absVal = kotlin.math.abs(sample.toInt())
        if (absVal > peak) peak = absVal
        windowSum += (sample.toDouble() * sample.toDouble())
        windowCount++
        if (windowCount >= windowSamples) {
          val rms = kotlin.math.sqrt(windowSum / windowCount)
          rmsPerSecond.append(rms.toInt()).append(",")
          windowSum = 0.0
          windowCount = 0
          windowIdx++
        }
        i += 2
      }
      android.util.Log.d("AudioRecorderModule", "stopRecording: bytes=${pcmBytes.size} durationSec=${pcmBytes.size / (SAMPLE_RATE * 2.0)} peakAmplitude=$peak (max 32767) rmsPerSec=$rmsPerSecond")
      val wavBytes = encodeWav(pcmBytes, SAMPLE_RATE)
      try {
        val debugFile = java.io.File(reactApplicationContext.filesDir, "last_recording.wav")
        debugFile.writeBytes(wavBytes)
        android.util.Log.d("AudioRecorderModule", "wrote debug wav to ${debugFile.absolutePath} (${wavBytes.size} bytes)")
      } catch (e: Exception) {
        android.util.Log.e("AudioRecorderModule", "failed to write debug wav", e)
      }
      val base64 = Base64.encodeToString(wavBytes, Base64.NO_WRAP)
      promise.resolve(base64)
    } catch (e: Exception) {
      promise.reject("AUDIO_RECORD_ERROR", e.message, e)
    }
  }

  // Same 44-byte PCM WAV header shape as the web project's encodeWAV() in
  // lib/useVoiceRecorder.ts — mono, 16-bit, matching sample rate.
  private fun encodeWav(pcm: ByteArray, sampleRate: Int): ByteArray {
    val totalDataLen = pcm.size + 36
    val byteRate = sampleRate * 2 // mono * 16-bit
    val header = ByteArray(44)

    fun writeString(offset: Int, s: String) {
      for (i in s.indices) header[offset + i] = s[i].code.toByte()
    }
    fun writeIntLE(offset: Int, value: Int) {
      header[offset] = (value and 0xff).toByte()
      header[offset + 1] = ((value shr 8) and 0xff).toByte()
      header[offset + 2] = ((value shr 16) and 0xff).toByte()
      header[offset + 3] = ((value shr 24) and 0xff).toByte()
    }
    fun writeShortLE(offset: Int, value: Int) {
      header[offset] = (value and 0xff).toByte()
      header[offset + 1] = ((value shr 8) and 0xff).toByte()
    }

    writeString(0, "RIFF")
    writeIntLE(4, totalDataLen)
    writeString(8, "WAVE")
    writeString(12, "fmt ")
    writeIntLE(16, 16)
    writeShortLE(20, 1) // PCM
    writeShortLE(22, 1) // mono
    writeIntLE(24, sampleRate)
    writeIntLE(28, byteRate)
    writeShortLE(32, 2)
    writeShortLE(34, 16)
    writeString(36, "data")
    writeIntLE(40, pcm.size)

    return header + pcm
  }
}
