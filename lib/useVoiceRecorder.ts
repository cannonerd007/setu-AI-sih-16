"use client"

import { useCallback, useRef, useState } from "react"

// Bhashini's ASR wants 16kHz mono PCM WAV, base64-encoded. The browser's
// MediaRecorder only gives you compressed webm/opus, so instead we tap
// the raw audio graph with a ScriptProcessorNode and encode WAV ourselves.
//
// Heads up: ScriptProcessorNode is a deprecated Web Audio API (superseded
// by AudioWorklet) but it's still supported everywhere, including Android
// WebView, and is far less code to get working under time pressure. If
// this app has a longer life after the hackathon, that's a real thing to
// revisit — not something to leave as an unexamined assumption.

const TARGET_SAMPLE_RATE = 16000

export function useVoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const processorRef = useRef<ScriptProcessorNode | null>(null)
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const chunksRef = useRef<Float32Array[]>([])

  const start = useCallback(async () => {
    chunksRef.current = []
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    streamRef.current = stream

    const audioCtx = new AudioContext()
    audioCtxRef.current = audioCtx
    const source = audioCtx.createMediaStreamSource(stream)
    sourceRef.current = source

    const processor = audioCtx.createScriptProcessor(4096, 1, 1)
    processorRef.current = processor
    processor.onaudioprocess = (e) => {
      chunksRef.current.push(new Float32Array(e.inputBuffer.getChannelData(0)))
    }
    source.connect(processor)
    // Must connect to a destination for onaudioprocess to fire in most
    // browsers, even though we don't want it audible — hence zero gain.
    const silence = audioCtx.createGain()
    silence.gain.value = 0
    processor.connect(silence)
    silence.connect(audioCtx.destination)

    setIsRecording(true)
  }, [])

  const stop = useCallback((): Promise<string> => {
    return new Promise((resolve) => {
      const audioCtx = audioCtxRef.current
      processorRef.current?.disconnect()
      sourceRef.current?.disconnect()
      streamRef.current?.getTracks().forEach((t) => t.stop())
      setIsRecording(false)

      const totalLength = chunksRef.current.reduce((sum, c) => sum + c.length, 0)
      const merged = new Float32Array(totalLength)
      let offset = 0
      for (const chunk of chunksRef.current) {
        merged.set(chunk, offset)
        offset += chunk.length
      }

      const inRate = audioCtx?.sampleRate ?? 48000
      const downsampled = downsample(merged, inRate, TARGET_SAMPLE_RATE)
      const pcm = floatTo16BitPCM(downsampled)
      const wavBuffer = encodeWAV(pcm, TARGET_SAMPLE_RATE)
      audioCtx?.close()

      resolve(arrayBufferToBase64(wavBuffer))
    })
  }, [])

  return { isRecording, start, stop }
}

function downsample(buffer: Float32Array, inRate: number, outRate: number) {
  if (outRate === inRate) return buffer
  const ratio = inRate / outRate
  const newLength = Math.round(buffer.length / ratio)
  const result = new Float32Array(newLength)
  let offsetResult = 0
  let offsetBuffer = 0
  while (offsetResult < result.length) {
    const nextOffsetBuffer = Math.round((offsetResult + 1) * ratio)
    let accum = 0
    let count = 0
    for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
      accum += buffer[i]
      count++
    }
    result[offsetResult] = accum / (count || 1)
    offsetResult++
    offsetBuffer = nextOffsetBuffer
  }
  return result
}

function floatTo16BitPCM(input: Float32Array) {
  const output = new Int16Array(input.length)
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]))
    output[i] = s < 0 ? s * 0x8000 : s * 0x7fff
  }
  return output
}

function encodeWAV(samples: Int16Array, sampleRate: number) {
  const buffer = new ArrayBuffer(44 + samples.length * 2)
  const view = new DataView(buffer)

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i))
  }

  writeString(0, "RIFF")
  view.setUint32(4, 36 + samples.length * 2, true)
  writeString(8, "WAVE")
  writeString(12, "fmt ")
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true) // PCM
  view.setUint16(22, 1, true) // mono
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  writeString(36, "data")
  view.setUint32(40, samples.length * 2, true)

  let offset = 44
  for (let i = 0; i < samples.length; i++, offset += 2) {
    view.setInt16(offset, samples[i], true)
  }

  return buffer
}

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = ""
  const bytes = new Uint8Array(buffer)
  const chunkSize = 0x8000
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...Array.from(bytes.subarray(i, i + chunkSize)))
  }
  return btoa(binary)
}
