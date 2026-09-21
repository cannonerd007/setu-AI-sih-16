import { Volume2 } from "lucide-react"
import { ValidationBadge } from "./ValidationBadge"

export function SentenceCard({
  index,
  hindi,
  santali,
  keyTerm,
  onPlay,
}: {
  index: string
  hindi: string
  santali: string
  keyTerm: string
  onPlay: () => void
}) {
  return (
    <div className="su-sentence-card">
      <div className="su-sentence-head">
        <span className="su-sentence-num">
          <span>{index}</span>
          वाक्य
        </span>
        <ValidationBadge status="demo" />
      </div>
      <div className="su-sentence-block">
        <span className="su-sentence-block-label">हिन्दी</span>
        <p>{hindi}</p>
      </div>
      <div className="su-sentence-block">
        <span className="su-sentence-block-label">संथाली</span>
        <p className="su-olchiki">{santali}</p>
      </div>
      <span className="su-key-term">मुख्य शब्द: {keyTerm}</span>
      <button className="su-btn su-btn--primary su-btn--full su-btn--sm" onClick={onPlay}>
        <Volume2 size={18} />
        सुनें (Play)
        <span className="su-tag-soon">जल्द</span>
      </button>
    </div>
  )
}
