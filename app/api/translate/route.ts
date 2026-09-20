import { NextRequest, NextResponse } from "next/server"
import { voiceToVoice } from "@/lib/bhashini"

// This runs on Vercel's server, not in the browser — your Bhashini key
// never reaches the tablet. The frontend only ever calls this route.
export async function POST(req: NextRequest) {
  try {
    const { audioBase64, sourceLanguage, targetLanguage, sampleRate } =
      await req.json()

    if (!audioBase64) {
      return NextResponse.json(
        { error: "audioBase64 is required" },
        { status: 400 }
      )
    }

    const result = await voiceToVoice({
      audioBase64,
      sourceLanguage,
      targetLanguage,
      sampleRate,
    })

    return NextResponse.json(result)
  } catch (err: any) {
    console.error("Bhashini translate error:", err)
    return NextResponse.json(
      { error: err?.message ?? "Translation failed" },
      { status: 500 }
    )
  }
}
