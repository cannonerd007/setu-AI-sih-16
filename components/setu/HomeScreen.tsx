"use client"

import { BookOpen, Headphones, Languages, Mic, Play } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/lib/useToast"
import { Toast } from "./Toast"

// Backend only supports Hindi -> Santali right now (lib/bhashini.ts hardcodes
// this direction). The language selector below is honest about that instead
// of pretending the app is bidirectional.
export function HomeScreen({ go }: { go: (screen: string) => void }) {
  // UI-only selection state — picking हिन्दी does NOT switch the app to a
  // Hindi->Hindi or reverse-direction translation mode. Bhashini only does
  // Hindi->Santali; the toast on हिन्दी exists just to say that plainly.
  const [selectedLang, setSelectedLang] = useState<"santali" | "hindi">("santali")
  const { toastMessage, showToast } = useToast()

  const selectSantali = () => setSelectedLang("santali")
  const selectHindi = () => {
    setSelectedLang("hindi")
    showToast("अभी केवल हिन्दी → संथाली अनुवाद समर्थित है")
  }

  return (
    <>
      <div className="su-lang-select">
        <button
          className={`su-lang-select-btn ${selectedLang === "santali" ? "su-lang-select-btn--active" : ""}`}
          onClick={selectSantali}
        >
          संथाली
        </button>
        <button
          className={`su-lang-select-btn ${selectedLang === "hindi" ? "su-lang-select-btn--active" : ""}`}
          onClick={selectHindi}
        >
          हिन्दी
        </button>
      </div>

      <section className="su-hero-card">
        <span className="su-hero-tag">कक्षा अनुवादक</span>
        <div>
          <h2 className="su-type-headline-lg">सीधा बोलकर अनुवाद करें</h2>
          <p className="su-type-body-md">हिन्दी में बोलें, संथाली अनुवाद तुरंत पढ़ें।</p>
        </div>
        <button className="su-hero-cta" onClick={() => go("translator")}>
          <Mic size={22} />
          बोलना शुरू करें
        </button>
      </section>

      <section className="su-card su-card--lowest">
        <span className="su-tag">कक्षा ३ • भाषा</span>
        <h3 className="su-type-headline-md" style={{ marginTop: 8 }}>
          हमारा सुंदर गाँव
        </h3>
        <p className="su-type-body-sm" style={{ color: "var(--su-outline)", marginTop: 4 }}>
          अपने गाँव और आसपास की चीज़ों के बारे में सीखें।
        </p>
        <div className="su-quick-row" style={{ marginTop: 12 }}>
          <button className="su-btn su-btn--primary su-btn--sm" onClick={() => go("curriculum")}>
            पाठ शुरू करें
          </button>
          <button className="su-btn su-btn--secondary su-btn--sm" onClick={() => go("curriculum")}>
            <BookOpen size={16} />
            शब्दावली
          </button>
        </div>
      </section>

      <div className="su-content-row">
        <div className="su-type-label-md" style={{ color: "var(--su-outline)" }}>
          त्वरित भाषा सामग्री
        </div>
        <div className="su-content-item">
          <div className="su-content-item-icon">
            <Headphones size={20} />
          </div>
          <div className="su-content-item-copy">
            <strong>बारिश गीत (बालगीत)</strong>
            <span>ऑडियो व चित्र कार्ड</span>
          </div>
          <button
            className="su-content-item-play"
            onClick={() => showToast("यह ऑडियो सामग्री अभी उपलब्ध नहीं है")}
            aria-label="चलाएं"
          >
            <Play size={16} />
          </button>
        </div>
        <div className="su-content-item">
          <div className="su-content-item-icon">
            <BookOpen size={20} />
          </div>
          <div className="su-content-item-copy">
            <strong>सूरज और चिड़िया (कहानी)</strong>
            <span>द्विभाषी सचित्र कहानी</span>
          </div>
          <button
            className="su-content-item-play"
            onClick={() => showToast("यह सामग्री अभी उपलब्ध नहीं है")}
            aria-label="चलाएं"
          >
            <Play size={16} />
          </button>
        </div>
      </div>

      <div className="su-tile-grid">
        <button className="su-tile" onClick={() => go("storage")}>
          <div className="su-tile-icon">
            <Languages size={18} />
          </div>
          <div className="su-tile-copy">
            <strong>भाषा सेतु पैक</strong>
            <span>कक्षा 1 से 3 संथाली</span>
          </div>
        </button>
        <button className="su-tile" onClick={() => go("curriculum")}>
          <div className="su-tile-icon">
            <BookOpen size={18} />
          </div>
          <div className="su-tile-copy">
            <strong>दैनिक बालगीत</strong>
            <span>Ol Chiki गीत संग्रह</span>
          </div>
        </button>
      </div>

      <Toast message={toastMessage} />
    </>
  )
}
