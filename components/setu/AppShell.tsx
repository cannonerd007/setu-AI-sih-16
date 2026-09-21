import type { ReactNode } from "react"
import { BottomNav } from "./BottomNav"
import { Header } from "./Header"
import { OfflineStatusTicker } from "./OfflineStatusTicker"

export function AppShell({
  title,
  activeTab,
  onTabChange,
  onSettings,
  children,
}: {
  title: string
  activeTab: string
  onTabChange: (id: string) => void
  onSettings: () => void
  children: ReactNode
}) {
  return (
    <div className="su-shell">
      <OfflineStatusTicker />
      <Header title={title} onSettings={onSettings} />
      <main className="su-shell-content">{children}</main>
      <BottomNav active={activeTab} onChange={onTabChange} />
    </div>
  )
}
