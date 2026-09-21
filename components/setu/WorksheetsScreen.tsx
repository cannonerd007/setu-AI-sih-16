"use client"

import { Printer, Sparkles } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/lib/useToast"
import { FlashcardDeck } from "./FlashcardDeck"
import { Toast } from "./Toast"
import { WorksheetPanel } from "./WorksheetPanel"

export function WorksheetsScreen() {
  const [view, setView] = useState<"flashcards" | "worksheet">("flashcards")
  const { toastMessage, showToast } = useToast()

  return (
    <>
      <div className="su-card su-card--lowest su-lesson-info">
        <div>
          <span className="su-type-label-sm" style={{ color: "var(--su-outline)" }}>
            कक्षा और इकाई
          </span>
          <div className="su-type-body-lg">कक्षा 1 • इकाई 3: हमारे पालतू पशु</div>
        </div>
      </div>

      <div className="su-view-tabs">
        <button
          className={`su-view-tab ${view === "flashcards" ? "su-view-tab--active" : ""}`}
          onClick={() => setView("flashcards")}
        >
          <Sparkles size={16} />
          फ़्लैशकार्ड
        </button>
        <button
          className={`su-view-tab ${view === "worksheet" ? "su-view-tab--active" : ""}`}
          onClick={() => setView("worksheet")}
        >
          <Printer size={16} />
          प्रिंट कार्यपत्रक
        </button>
      </div>

      {view === "flashcards" ? (
        <FlashcardDeck onNoAudio={() => showToast("संथाली ऑडियो अभी उपलब्ध नहीं है")} />
      ) : (
        <WorksheetPanel onNotAvailable={showToast} />
      )}

      <Toast message={toastMessage} />
    </>
  )
}
