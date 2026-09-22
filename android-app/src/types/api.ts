// Matches the existing, unmodified Next.js contract exactly
// (app/api/translate/route.ts + lib/bhashini.ts in the web project).
export type TranslateRequest = {
  audioBase64: string
  sourceLanguage: 'hi'
  targetLanguage: 'sat'
}

export type TranslateResponse = {
  transcript: string
  translation: string
}

export type TranslateErrorResponse = {
  error: string
}
