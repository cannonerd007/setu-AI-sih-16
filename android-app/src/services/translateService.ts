import type { TranslateErrorResponse, TranslateRequest, TranslateResponse } from '../types/api'

// The existing Next.js project (app/api/translate/route.ts) is the ONLY
// place Bhashini credentials live. This RN app never sees
// BHASHINI_USER_ID/BHASHINI_API_KEY — it just calls this HTTPS endpoint,
// same as a browser would.
//
// PENDING: no real deployment URL configured yet. `10.0.2.2` only resolves
// inside the Android emulator (alias for the host machine) — a physical
// device can't reach it. Currently pointed at a temporary cloudflared quick
// tunnel (`cloudflared tunnel --url http://localhost:3000`) exposing the
// Mac's local `pnpm dev` server for physical-device testing; the Mac and
// that tunnel process must stay running for this URL to work. This will
// move to a build-time config (e.g. react-native-config) once there's a
// real deployment to point at.
const TRANSLATE_API_BASE_URL = 'https://encyclopedia-cir-dive-talent.trycloudflare.com'

export async function translateVoice(
  request: TranslateRequest,
): Promise<TranslateResponse> {
  const res = await fetch(`${TRANSLATE_API_BASE_URL}/api/translate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })
  const data = (await res.json()) as TranslateResponse | TranslateErrorResponse
  if (!res.ok || 'error' in data) {
    throw new Error('error' in data ? data.error : 'अनुवाद विफल')
  }
  return data
}
