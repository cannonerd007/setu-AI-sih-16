import { CircleHelp, ShieldCheck } from "lucide-react"

// Explicit status required — no default that could silently overclaim.
// "verified" must only be passed for content an actual language expert
// reviewed. Static/sample content should use "demo", not "verified".
export function ValidationBadge({ status }: { status: "verified" | "demo" }) {
  if (status === "demo") {
    return (
      <span className="su-tag-soon">
        <CircleHelp size={13} />
        नमूना सामग्री (Demo)
      </span>
    )
  }
  return (
    <span className="su-tag">
      <ShieldCheck size={13} />
      भाषा विशेषज्ञ सत्यापित
    </span>
  )
}
