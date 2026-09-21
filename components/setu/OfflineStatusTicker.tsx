"use client"

import { useEffect, useState } from "react"

// Reflects real navigator.onLine — never hardcodes "offline ready".
// Translation genuinely requires network (Bhashini is a cloud API), so an
// honest online/offline indicator is the correct claim here, not a fake one.
export function OfflineStatusTicker() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    setIsOnline(navigator.onLine)
    const goOnline = () => setIsOnline(true)
    const goOffline = () => setIsOnline(false)
    window.addEventListener("online", goOnline)
    window.addEventListener("offline", goOffline)
    return () => {
      window.removeEventListener("online", goOnline)
      window.removeEventListener("offline", goOffline)
    }
  }, [])

  return (
    <div className={`su-ticker ${isOnline ? "su-ticker--online" : "su-ticker--offline"}`}>
      <span className="su-ticker-dot" />
      {isOnline ? "ऑनलाइन • अनुवाद उपलब्ध" : "ऑफ़लाइन • अनुवाद अभी उपलब्ध नहीं"}
    </div>
  )
}
