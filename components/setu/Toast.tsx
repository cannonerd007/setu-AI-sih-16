export function Toast({ message }: { message: string | null }) {
  if (!message) return null
  return <div className="su-toast">{message}</div>
}
