export function OfflineLibraryCard({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
}) {
  return (
    <div className="su-content-item">
      <div className="su-content-item-icon">{icon}</div>
      <div className="su-content-item-copy">
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </div>
      <span className="su-tag-soon">योजना में</span>
    </div>
  )
}
