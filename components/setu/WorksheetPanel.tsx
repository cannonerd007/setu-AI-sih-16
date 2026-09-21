import { Printer, Share2 } from "lucide-react"

// PDF export / Bluetooth-WhatsApp share don't exist — no PDF library, no
// share integration in this codebase. Buttons disclose that honestly
// instead of pretending to generate/share a file.
export function WorksheetPanel({ onNotAvailable }: { onNotAvailable: (msg: string) => void }) {
  return (
    <div className="su-worksheet-panel">
      <div>
        <span className="su-tag-soon">ऑफ़लाइन कार्यपत्रक (Worksheet)</span>
        <h3 className="su-type-headline-md" style={{ marginTop: 6 }}>
          जोड़ी मिलाओ: पशु और नाम
        </h3>
        <p className="su-type-body-sm" style={{ color: "var(--su-outline)", marginTop: 4 }}>
          चित्र देखकर सही हिन्दी व ओल चिकी शब्द को मिलाएँ।
        </p>
      </div>
      <button
        className="su-btn su-btn--primary su-btn--full"
        onClick={() => onNotAvailable("PDF कार्यपत्रक निर्यात अभी उपलब्ध नहीं है")}
      >
        <Printer size={20} />
        प्रिंट हेतु PDF बनाएं
        <span className="su-tag-soon">जल्द</span>
      </button>
      <button
        className="su-btn su-btn--secondary su-btn--full su-btn--sm"
        onClick={() => onNotAvailable("ब्लूटूथ/व्हाट्सएप साझाकरण अभी उपलब्ध नहीं है")}
      >
        <Share2 size={18} />
        व्हाट्सएप या ब्लूटूथ से साझा करें
      </button>
    </div>
  )
}
