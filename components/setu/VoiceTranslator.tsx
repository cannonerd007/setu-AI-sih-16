"use client"

import { useState } from "react"
import { Mic, TouchpadOff, Volume2, WifiOff } from "lucide-react"
import { useVoiceRecorder } from "@/lib/useVoiceRecorder"
import { useToast } from "@/lib/useToast"
import { MicPermissionScreen } from "./MicPermissionScreen"
import { Toast } from "./Toast"
import { TranscriptCard } from "./TranscriptCard"
import { TranslationCard } from "./TranslationCard"

type TranslatorState = "idle" | "recording" | "processing" | "done" | "error"

// Real flow, unchanged from the working implementation:
// mic -> useVoiceRecorder -> POST /api/translate -> Bhashini -> transcript+translation.
// Only the JSX/CSS changed here; the fetch/recorder logic is identical to the
// previous TranslatorScreen, not Stitch's mock startListening()/stopListening().
export function VoiceTranslator({ onNavigate }: { onNavigate?: (screen: string) => void }) {
  const { isRecording, start, stop } = useVoiceRecorder()
  const [state, setState] = useState<TranslatorState>("idle")
  const [transcript, setTranscript] = useState("")
  const [translation, setTranslation] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [micDenied, setMicDenied] = useState(false)
  const { toastMessage, showToast } = useToast()

  const handleMicPress = async () => {
    if (state === "recording") {
      setState("processing")
      const audioBase64 = await stop()
      try {
        const res = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ audioBase64, sourceLanguage: "hi", targetLanguage: "sat" }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "अनुवाद विफल")
        setTranscript(data.transcript || "")
        setTranslation(data.translation || "")
        setState("done")
      } catch (err: any) {
        setErrorMsg(err.message || "कुछ गलत हो गया")
        setState("error")
      }
      return
    }
    setErrorMsg("")
    setState("recording")
    try {
      await start()
    } catch {
      // Real getUserMedia rejection (permission denied/blocked) — not simulated.
      setState("idle")
      setMicDenied(true)
    }
  }

  const retryPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach((t) => t.stop())
      setMicDenied(false)
    } catch {
      showToast("माइक अभी भी अवरुद्ध है — ब्राउज़र की साइट सेटिंग्स से अनुमति दें")
    }
  }

  if (micDenied) {
    return (
      <MicPermissionScreen
        onRetry={retryPermission}
        onOpenCurriculum={() => onNavigate?.("curriculum")}
      />
    )
  }

  const statusText: Record<TranslatorState, string> = {
    idle: "बोलते ही संथाली में अनुवाद दिखेगा",
    recording: "सुन रहा हूँ... रोकने के लिए फिर दबाएं",
    processing: "अनुवाद हो रहा है...",
    done: "तैयार — नीचे परिणाम देखें",
    error: errorMsg,
  }

  return (
    <>
      <div className="su-segmented">
        <button className="su-segmented-btn su-segmented-btn--active">
          <TouchpadOff size={16} />
          दबाकर बोलें
        </button>
        <button
          className="su-segmented-btn su-segmented-btn--disabled"
          onClick={() => showToast("लगातार सुनना अभी उपलब्ध नहीं है — फिलहाल दबाकर बोलें उपयोग करें")}
        >
          लगातार सुनें
          <span className="su-tag-soon">जल्द</span>
        </button>
      </div>

      <TranscriptCard label="शिक्षक • हिन्दी" text={transcript} placeholder="माइक दबाकर हिन्दी में बोलें" />
      <TranslationCard text={translation} placeholder="ᱟᱢᱟᱜ ᱵᱚᱞ ᱱᱚᱶᱰᱮ ᱦᱩᱭ ᱟᱭ" />

      <div className="su-mic-section">
        <div className="su-mic-ring">
          <div className={`su-mic-pulse ${state === "recording" ? "su-mic-pulse--active" : ""}`} />
          <button
            className={`su-mic-btn ${state === "recording" ? "su-mic-btn--recording" : ""} ${
              state === "processing" ? "su-mic-btn--processing" : ""
            }`}
            onClick={handleMicPress}
            disabled={state === "processing"}
            aria-label="माइक दबाकर बोलें"
          >
            <Mic size={32} />
            <span className="su-type-label-sm">बोलें</span>
          </button>
        </div>
        <div className="su-mic-status">
          <p className="su-mic-status-title">
            {state === "recording" ? "रोकने के लिए दबाएं" : "माइक दबाकर बोलें"}
          </p>
          <p className="su-mic-status-sub">{statusText[state]}</p>
        </div>
      </div>

      {state === "error" && (
        <div className="su-error-banner">
          <WifiOff size={16} />
          {errorMsg}
        </div>
      )}

      <button
        className="su-btn su-btn--secondary su-btn--full su-btn--sm"
        onClick={() => showToast("आवाज़ जल्द उपलब्ध होगी — इस खाते पर संथाली टीटीएस अभी उपलब्ध नहीं है")}
      >
        <Volume2 size={18} />
        पिछला वाक्य दोहराएं
        <span className="su-tag-soon">जल्द</span>
      </button>

      <div className="su-quick-row">
        <button className="su-quick-btn">शांत रहें</button>
        <button className="su-quick-btn">शाबाश!</button>
      </div>

      <Toast message={toastMessage} />
    </>
  )
}
