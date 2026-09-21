import { BookOpen, FileText, FolderOpen, Home, Waves } from "lucide-react"

const tabs = [
  { id: "home", label: "होम", icon: Home },
  { id: "translator", label: "अनुवादक", icon: Waves },
  { id: "curriculum", label: "पाठ्यक्रम", icon: BookOpen },
  { id: "worksheets", label: "कार्यपत्रक", icon: FileText },
  { id: "storage", label: "संग्रह", icon: FolderOpen },
] as const

export function BottomNav({
  active,
  onChange,
}: {
  active: string
  onChange: (id: string) => void
}) {
  return (
    <nav className="su-bottom-nav">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = active === tab.id
        return (
          <button
            key={tab.id}
            className={`su-nav-item ${isActive ? "su-nav-item--active" : ""}`}
            onClick={() => onChange(tab.id)}
          >
            <Icon size={22} />
            <span>{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
