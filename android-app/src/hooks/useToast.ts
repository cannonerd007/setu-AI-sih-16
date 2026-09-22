import { useCallback, useRef, useState } from 'react'

// Direct port of the web project's lib/useToast.ts — same pattern, no RN-specific
// change needed since this is pure state/timers, no browser API involved.
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
