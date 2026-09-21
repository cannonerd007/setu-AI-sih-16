// Deliberately no "verified" badge here: this is raw Bhashini AI output with
// zero human/linguist review step in the current pipeline. Claiming it as
// verified would be false. See ValidationBadge for the one place a real
// review status exists (static curriculum content).
export function TranslationCard({
  text,
  placeholder,
}: {
  text: string
  placeholder: string
}) {
  return (
    <div className="su-translation-card">
      <div className="su-translation-accent" />
      <div className="su-translation-head">
        <span className="su-tag">संथाली</span>
      </div>
      <p className={`su-translation-text ${!text ? "su-speech-placeholder" : ""}`}>
        {text || placeholder}
      </p>
    </div>
  )
}
