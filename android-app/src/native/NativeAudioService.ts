import { NativeModules } from 'react-native'

// Contract TranslatorScreen codes against. Backed for real by the Kotlin
// module android/.../audio/AudioRecorderModule.kt (registered as
// "AudioRecorder"), which records 16kHz mono 16-bit PCM via AudioRecord and
// returns it as a base64 WAV string — the exact format the existing,
// unmodified web flow already sends (see lib/useVoiceRecorder.ts's
// encodeWAV() and lib/bhashini.ts's `audioFormat: "wav"`).
export interface NativeAudioService {
  startRecording(): Promise<void>
  stopRecording(): Promise<string> // resolves to base64 16kHz mono WAV, matching Bhashini's expected input format
}

// Real microphone capture, MVP demo scope. Throws if the native module
// isn't linked (e.g. running under Jest with no native binary) — callers
// should not silently fall back to mock behavior in that case.
export const nativeAudioService: NativeAudioService = {
  startRecording() {
    if (!NativeModules.AudioRecorder) {
      return Promise.reject(new Error('AudioRecorder native module not available'))
    }
    return NativeModules.AudioRecorder.startRecording()
  },
  stopRecording() {
    if (!NativeModules.AudioRecorder) {
      return Promise.reject(new Error('AudioRecorder native module not available'))
    }
    return NativeModules.AudioRecorder.stopRecording()
  },
}

// MOCK — PHASE 2 ONLY.
// Does not touch any microphone or produce real audio. Exists purely so the
// Translator screen's state machine (idle/recording/processing/result/error)
// is exercisable during UI development. stopRecording() resolves to an empty
// string, which the real service call will correctly reject (matches actual
// error behavior, not a fabricated success).
export const mockNativeAudioService: NativeAudioService = {
  async startRecording() {
    return
  },
  async stopRecording() {
    return ''
  },
}
