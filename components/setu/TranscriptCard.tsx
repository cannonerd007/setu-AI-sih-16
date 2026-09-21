import { Mic } from "lucide-react"

export function TranscriptCard({
  label,
  text,
  placeholder,
}: {
  label: string
  text: string
  placeholder: string
}) {
  return (
    <div className="su-speech-card">
      <div className="su-speech-label-row">
        <span className="su-speech-label">
          <Mic size={16} />
          {label}
        </span>
      </div>
      <p className={`su-speech-text ${!text ? "su-speech-placeholder" : ""}`}>
        {text || placeholder}
      </p>
    </div>
  )
}
