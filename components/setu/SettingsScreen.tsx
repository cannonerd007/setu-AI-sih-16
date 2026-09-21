"use client"

import { CircleHelp, Mic, Phone, ShieldCheck, SlidersHorizontal, User } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/lib/useToast"
import { LanguageRoadmapItem } from "./LanguageRoadmapItem"
import { SettingsSection } from "./SettingsSection"
import { Toast } from "./Toast"

export function SettingsScreen() {
  const [textSize, setTextSize] = useState<"normal" | "large">("normal")
  const [noiseFilter, setNoiseFilter] = useState(true)
  const { toastMessage, showToast } = useToast()

  return (
    <>
      <section className="su-card su-card--lowest su-profile-card">
        <div className="su-profile-avatar">
          <User size={24} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="su-type-headline-md">आशा मुर्मू</div>
          <div className="su-type-body-sm" style={{ color: "var(--su-geru)", fontWeight: 700 }}>
            सहायक शिक्षक • प्राथमिक विद्यालय
          </div>
          <div className="su-type-body-sm" style={{ color: "var(--su-outline)", marginTop: 4 }}>
            सत्र २०२५–२६
          </div>
        </div>
        <span className="su-tag">
          <ShieldCheck size={13} />
          सत्यापित संकुल
        </span>
      </section>

      <SettingsSection title="भाषा विस्तार रोडमैप">
        <LanguageRoadmapItem code="सं" name="संथाली (Santhali)" script="ओल चिकी लिपि एवं उच्चारण" status="ready" statusLabel="तैयार और सक्रिय" />
        <LanguageRoadmapItem code="हो" name="हो (Ho)" script="वारंग चिति लिपि" status="training" statusLabel="प्रशिक्षण जारी" />
        <LanguageRoadmapItem code="मुं" name="मुंडारी (Mundari)" script="मुंडारी बानी एवं देवनागरी" status="collecting" statusLabel="डेटा संग्रह जारी" />
      </SettingsSection>

      <section className="su-contribution-card">
        <span className="su-hero-tag" style={{ alignSelf: "flex-start" }}>
          शिक्षक सहभागिता
        </span>
        <div className="su-type-headline-md" style={{ color: "#fff" }}>
          स्थानीय बोली संवर्धन में सहयोग दें
        </div>
        <p className="su-type-body-sm" style={{ opacity: 0.92 }}>
          अपनी स्थानीय बोली में ५ छोटे वाक्य रिकॉर्ड करें और मॉडल को समृद्ध बनाएं।
        </p>
        <div className="su-contribution-sample">"बच्चों, आज हम पेड़ के बारे में सीखेंगे।"</div>
        <button
          className="su-btn su-btn--full"
          style={{ background: "#fff", color: "var(--su-geru)" }}
          onClick={() => showToast("आवाज़ योगदान अपलोड अभी उपलब्ध नहीं है")}
        >
          <Mic size={18} />
          अपनी आवाज़ जोड़ें
          <span className="su-tag-soon">जल्द</span>
        </button>
      </section>

      <SettingsSection title="पठन व ध्वनि प्राथमिकताएं">
        <div className="su-toggle-row">
          <span className="su-type-label-md" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <SlidersHorizontal size={18} />
            अक्षर का आकार
          </span>
          <div className="su-segmented" style={{ width: 180 }}>
            <button
              className={`su-segmented-btn ${textSize === "normal" ? "su-segmented-btn--active" : ""}`}
              onClick={() => setTextSize("normal")}
            >
              सामान्य
            </button>
            <button
              className={`su-segmented-btn ${textSize === "large" ? "su-segmented-btn--active" : ""}`}
              onClick={() => setTextSize("large")}
            >
              बड़ा
            </button>
          </div>
        </div>
        <div className="su-toggle-row">
          <span className="su-type-label-md" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Mic size={18} />
            माइक शोर निवारक
          </span>
          <button
            className={`su-toggle ${noiseFilter ? "su-toggle--on" : ""}`}
            role="switch"
            aria-checked={noiseFilter}
            onClick={() => setNoiseFilter(!noiseFilter)}
          >
            <span className="su-toggle-dot" />
          </button>
        </div>
      </SettingsSection>

      <SettingsSection title="सहायता एवं संकुल संपर्क">
        <div className="su-toggle-row">
          <span className="su-type-label-md" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <CircleHelp size={20} />
            समन्वयक: रमेश हेम्ब्रम
          </span>
          <a className="su-btn su-btn--sm su-btn--secondary" href="tel:9431100000">
            <Phone size={16} />
            कॉल करें
          </a>
        </div>
      </SettingsSection>

      <div className="su-type-body-sm" style={{ textAlign: "center", color: "var(--su-outline)" }}>
        SETU सेतु • संस्करण 1.0.0 (डेमो)
      </div>

      <Toast message={toastMessage} />
    </>
  )
}
