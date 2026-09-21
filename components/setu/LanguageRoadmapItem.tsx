const statusClass = {
  ready: "su-roadmap-status--ready",
  training: "su-roadmap-status--training",
  collecting: "su-roadmap-status--collecting",
} as const

export function LanguageRoadmapItem({
  code,
  name,
  script,
  status,
  statusLabel,
}: {
  code: string
  name: string
  script: string
  status: keyof typeof statusClass
  statusLabel: string
}) {
  return (
    <div className="su-roadmap-item">
      <div className="su-roadmap-left">
        <span className="su-roadmap-icon">{code}</span>
        <div>
          <div className="su-type-label-lg">{name}</div>
          <div className="su-type-body-sm" style={{ color: "var(--su-outline)" }}>
            {script}
          </div>
        </div>
      </div>
      <span className={`su-roadmap-status ${statusClass[status]}`}>{statusLabel}</span>
    </div>
  )
}
