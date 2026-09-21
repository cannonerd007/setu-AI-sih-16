import { RefreshCw } from "lucide-react"

// No local storage/caching/sync system exists in this codebase — this
// discloses that instead of simulating a fake "sync complete" state.
export function SyncButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="su-btn su-btn--primary su-btn--full" onClick={onClick}>
      <RefreshCw size={20} />
      पाठ व भाषा सामग्री सिंक करें
      <span className="su-tag-soon">जल्द</span>
    </button>
  )
}
