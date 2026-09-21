"use client"

import { FileText, PlayCircle } from "lucide-react"
import { useToast } from "@/lib/useToast"
import { LessonCard } from "./LessonCard"
import { SentenceCard } from "./SentenceCard"
import { Toast } from "./Toast"

const rows = [
  { index: "१", hindi: "बच्चों, किताब खोलो।", santali: "ᱵᱟᱹᱲᱤ ᱠᱚ, ᱯᱟᱹᱛᱤ ᱠᱷᱚᱞ ᱢᱮ", keyTerm: "किताब" },
  { index: "२", hindi: "पहला पन्ना पढ़ो।", santali: "ᱯᱟᱹᱛᱤ ᱨᱮᱭᱟᱜ ᱢᱤᱫ ᱯᱟᱱᱟ ᱯᱟᱲᱦᱟᱣ ᱢᱮ", keyTerm: "पन्ना" },
  { index: "३", hindi: "चित्र को ध्यान से देखो।", santali: "ᱪᱤᱛᱟᱹᱨ ᱠᱚ ᱧᱮᱞ ᱢᱮ", keyTerm: "चित्र" },
]

// Sentences are static demo content, same as the previous CurriculumScreen —
// no curriculum data model exists yet. "सुनें"/"पूरा पाठ सुनाएं" show an
// honest toast instead of Stitch's fake "local TTS playing" simulation,
// since no Santali audio exists on this Bhashini account.
export function CurriculumScreen({ go }: { go: (screen: string) => void }) {
  const { toastMessage, showToast } = useToast()
  const noAudioYet = () => showToast("संथाली ऑडियो अभी उपलब्ध नहीं है")

  return (
    <>
      <LessonCard tag="कक्षा ३ • भाषा" title="हमारा सुंदर गाँव" subtitle="गाँव की चीज़ों को पहचानना और उनके नाम सीखना।" />
      {rows.map((r) => (
        <SentenceCard key={r.index} {...r} onPlay={noAudioYet} />
      ))}
      <div className="su-quick-row">
        <button className="su-btn su-btn--primary su-btn--full" onClick={noAudioYet}>
          <PlayCircle size={22} />
          पूरा पाठ सुनाएं
          <span className="su-tag-soon">जल्द</span>
        </button>
      </div>
      <button className="su-btn su-btn--secondary su-btn--full" onClick={() => go("worksheets")}>
        <FileText size={18} />
        कार्यपत्रक देखें
      </button>
      <Toast message={toastMessage} />
    </>
  )
}
