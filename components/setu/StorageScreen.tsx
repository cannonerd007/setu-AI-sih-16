"use client"

import { BookOpen, CircleCheck, Languages, Sparkles } from "lucide-react"
import { useToast } from "@/lib/useToast"
import { OfflineLibraryCard } from "./OfflineLibraryCard"
import { SyncButton } from "./SyncButton"
import { Toast } from "./Toast"

// Honest version of Stitch's offline-library screen: this app is 100%
// online today (every translation hits Bhashini's cloud API). No local
// content cache or sync pipeline exists, so nothing here claims otherwise.
export function StorageScreen() {
  const { toastMessage, showToast } = useToast()

  return (
    <>
      <div className="su-info-banner">
        <div className="su-info-banner-icon">
          <CircleCheck size={20} />
        </div>
        <div>
          <div className="su-type-headline-md">यह ऐप अभी पूरी तरह ऑनलाइन है</div>
          <div className="su-type-body-sm" style={{ color: "var(--su-outline)" }}>
            अनुवाद के लिए इंटरनेट ज़रूरी है। ऑफ़लाइन पाठ सामग्री आने वाला फीचर है।
          </div>
        </div>
      </div>

      <div className="su-type-label-md" style={{ color: "var(--su-outline)" }}>
        ऑफ़लाइन पाठ सामग्री (योजना में)
      </div>
      <div className="su-content-row">
        <OfflineLibraryCard icon={<Languages size={20} />} title="संथाली भाषा व आवाज़" subtitle="दुमका क्षेत्रीय बोली AI मॉडल" />
        <OfflineLibraryCard icon={<Sparkles size={20} />} title="कक्षा १-३ गणित व भाषा पाठ" subtitle="बुनियादी संख्या व भाषा अभ्यास" />
        <OfflineLibraryCard icon={<BookOpen size={20} />} title="दैनिक बालगीत व फ़्लैशकार्ड" subtitle="चित्र व बालगीत संग्रह" />
      </div>

      <div className="su-card">
        <div className="su-type-headline-md">नया पाठ अपडेट करें</div>
        <p className="su-type-body-sm" style={{ color: "var(--su-outline)", margin: "4px 0 12px" }}>
          ऑफ़लाइन सिंक अभी विकास में है।
        </p>
        <SyncButton onClick={() => showToast("ऑफ़लाइन सिंक अभी उपलब्ध नहीं है")} />
      </div>

      <Toast message={toastMessage} />
    </>
  )
}
