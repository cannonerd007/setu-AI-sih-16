"use client"

import { ChevronLeft, ChevronRight, ImageOff, Volume2 } from "lucide-react"
import { useState } from "react"

const deck = [
  { hindi: "गाय", olchiki: "ᱜᱟᱹᱭ", sentence: "\"गाय हमें मीठा दूध देती है।\" • ᱜᱟᱹᱭ ᱫᱚ ᱛᱚᱣᱟᱭ ᱮᱢᱚᱜ-ᱟ᱾" },
  { hindi: "बकरी", olchiki: "ᱢᱮᱨᱚᱢ", sentence: "\"बकरी हरी पत्तियाँ खाती है।\" • ᱢᱮᱨᱚᱢ ᱫᱚ ᱥᱟᱠᱟᱢᱮ ᱡᱚᱢ-ᱟ᱾" },
  { hindi: "बैल", olchiki: "ᱰᱟᱝᱜᱽᱨᱟ", sentence: "\"बैल खेत जोतने में मदद करता है।\" • ᱰᱟᱝᱜᱽᱨᱟ ᱫᱚ ᱥᱤ ᱨᱮ ᱜᱚᱲᱚᱣᱟᱭ᱾" },
  { hindi: "मुर्गी", olchiki: "ᱥᱤᱢ", sentence: "\"मुर्गी सुबह-सुबह बाँग देती है।\" • ᱥᱤᱢ ᱫᱚ ᱥᱮᱛᱟᱜ ᱨᱟᱜ-ᱟᱭ᱾" },
]

// Static demo vocabulary deck — no content/CMS model exists yet. The "सुनें"
// button is honest about there being no Santali audio, unlike Stitch's mock
// which simulated a working local TTS voice.
export function FlashcardDeck({ onNoAudio }: { onNoAudio: () => void }) {
  const [index, setIndex] = useState(0)
  const card = deck[index]
  const step = (dir: number) => setIndex((index + dir + deck.length) % deck.length)

  return (
    <div className="su-flashcard">
      <div className="su-flashcard-strip">
        <span>कक्षा १</span>
        <span>सोहराय चित्रकला शैली</span>
      </div>
      <div className="su-flashcard-art">
        <ImageOff size={32} />
        <span className="su-flashcard-badge">कार्ड #{index + 1}</span>
      </div>
      <div className="su-flashcard-body">
        <h2 className="su-flashcard-hindi">{card.hindi}</h2>
        <span className="su-flashcard-olchiki-chip">संथाली (ओल चिकी): {card.olchiki}</span>
        <p className="su-flashcard-sentence">{card.sentence}</p>
        <button className="su-btn su-btn--primary su-btn--full" onClick={onNoAudio}>
          <Volume2 size={18} />
          सुनें
          <span className="su-tag-soon">जल्द</span>
        </button>
      </div>
      <div className="su-flashcard-nav">
        <button className="su-flashcard-nav-btn" onClick={() => step(-1)}>
          <ChevronLeft size={18} />
          पिछला
        </button>
        <span className="su-flashcard-count">
          {index + 1} / {deck.length}
        </span>
        <button className="su-flashcard-nav-btn" onClick={() => step(1)}>
          अगला
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
