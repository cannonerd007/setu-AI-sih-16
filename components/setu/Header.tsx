import { User } from "lucide-react"

export function Header({
  title,
  onSettings,
}: {
  title: string
  onSettings: () => void
}) {
  return (
    <header className="su-header">
      <div className="su-header-row">
        <div className="su-brand">
          <div className="su-brand-mark">से</div>
          <div className="su-brand-copy">
            <span className="su-brand-title">SETU | सेतु</span>
            <span className="su-brand-sub">{title}</span>
          </div>
        </div>
        <div className="su-lang-pair">हिन्दी ⇄ संथाली</div>
        <button className="su-avatar" onClick={onSettings} aria-label="सेटिंग्स खोलें">
          <User size={16} />
        </button>
      </div>
    </header>
  )
}
