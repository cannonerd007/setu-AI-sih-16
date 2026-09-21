"use client"

import { ChevronRight, Keyboard, MicOff, RefreshCw, Volume2 } from "lucide-react"
import { useToast } from "@/lib/useToast"
import { Toast } from "./Toast"

// Real permission-denied state, driven by an actual getUserMedia rejection
// in VoiceTranslator (not a mocked screen). "टैबलेट सेटिंग्स खोलें" from
// Stitch is dropped — a web page cannot open Android system settings; the
// only real action available here is asking the browser for the mic again.
export function MicPermissionScreen({
  onRetry,
  onOpenCurriculum,
}: {
  onRetry: () => void
  onOpenCurriculum: () => void
}) {
  const { toastMessage, showToast } = useToast()

  return (
    <>
      <div className="su-card su-card--lowest su-permission-hero">
        <div className="su-permission-icon">
          <MicOff size={32} />
        </div>
        <h2 className="su-type-headline-lg">आवाज़ सुनने के लिए माइक की अनुमति दें</h2>
        <p className="su-type-body-md" style={{ color: "var(--su-outline)" }}>
          संथाली अनुवाद के लिए ब्राउज़र का माइक चालू होना ज़रूरी है। आपकी आवाज़ केवल Bhashini को अनुवाद के लिए भेजी जाती है, कहीं और सुरक्षित नहीं रखी जाती।
        </p>
      </div>

      <div className="su-card">
        <div className="su-type-label-lg" style={{ marginBottom: 10 }}>
          अनुमति कैसे चालू करें
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div className="su-step-row">
            <span className="su-step-num">1</span>
            <span className="su-type-body-sm">नीचे "फिर से अनुमति माँगें" दबाएं।</span>
          </div>
          <div className="su-step-row">
            <span className="su-step-num">2</span>
            <span className="su-type-body-sm">ब्राउज़र के पॉपअप में "Allow" (अनुमति दें) चुनें।</span>
          </div>
          <div className="su-step-row">
            <span className="su-step-num">3</span>
            <span className="su-type-body-sm">अगर पॉपअप न दिखे, तो ब्राउज़र के एड्रेस बार में माइक आइकन दबाकर अनुमति बदलें।</span>
          </div>
        </div>
      </div>

      <button className="su-btn su-btn--primary su-btn--full" onClick={onRetry}>
        <RefreshCw size={20} />
        फिर से अनुमति माँगें
      </button>

      <div className="su-card">
        <div className="su-type-label-lg" style={{ marginBottom: 10 }}>
          बिना माइक कक्षा जारी रखें
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <button className="su-fallback-row" onClick={onOpenCurriculum}>
            <div className="su-fallback-icon">
              <Volume2 size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="su-type-label-md">पाठ्यक्रम देखें</div>
              <div className="su-type-body-sm" style={{ color: "var(--su-outline)" }}>
                संथाली व हिन्दी वाक्य पढ़ें
              </div>
            </div>
            <ChevronRight size={18} />
          </button>
          <button
            className="su-fallback-row"
            onClick={() => showToast("टाइप करके अनुवाद अभी उपलब्ध नहीं है — इसे मौजूदा माइक-आधारित अनुवाद से जोड़ने के लिए बैकएंड में बदलाव चाहिए")}
          >
            <div className="su-fallback-icon">
              <Keyboard size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="su-type-label-md">टाइप करके पढ़ाएं</div>
              <div className="su-type-body-sm" style={{ color: "var(--su-outline)" }}>
                हिन्दी लिखकर संथाली अनुवाद पाएं
              </div>
            </div>
            <span className="su-tag-soon">जल्द</span>
          </button>
        </div>
      </div>

      <Toast message={toastMessage} />
    </>
  )
}
