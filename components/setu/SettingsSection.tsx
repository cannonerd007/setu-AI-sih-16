import type { ReactNode } from "react"

export function SettingsSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="su-card su-card--lowest">
      <div className="su-type-label-lg" style={{ marginBottom: 12 }}>
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{children}</div>
    </section>
  )
}
