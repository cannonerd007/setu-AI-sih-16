"use client"

import { useCallback, useRef, useState } from "react"

// Shared across screens to disclose "not built yet" instead of faking success
// (Bhashini TTS, offline sync, PDF export, etc. all route through this).
export function useToast() {
  const [message, setMessage] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = useCallback((text: string, durationMs = 2400) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setMessage(text)
    timerRef.current = setTimeout(() => setMessage(null), durationMs)
  }, [])

  return { toastMessage: message, showToast }
}
