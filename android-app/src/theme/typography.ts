import { Platform } from 'react-native'

// ============================================================
// FONT STATUS: PENDING — no .ttf files exist in this project yet.
// ============================================================
// Stitch's DESIGN.md specifies three typefaces:
//   - Mukta        (Hindi + Latin UI text)
//   - Baloo 2       (numerals only)
//   - Noto Sans Ol Chiki (Santali/Ol Chiki script — critical, do not skip)
//
// RN Android does NOT support the web's `@import url(fonts.googleapis.com)`
// mechanism used in app/globals.css. Fonts must be bundled as .ttf/.otf
// files shipped inside the APK. The real integration steps (not done in
// this phase):
//   1. Obtain the actual font files, e.g.:
//        Mukta-Regular.ttf, Mukta-Medium.ttf, Mukta-SemiBold.ttf, Mukta-Bold.ttf
//        Baloo2-Medium.ttf, Baloo2-SemiBold.ttf, Baloo2-Bold.ttf
//        NotoSansOlChiki-Regular.ttf, NotoSansOlChiki-Bold.ttf
//   2. Place them in android-app/assets/fonts/
//   3. Add `"assets": ["./assets/fonts/"]` to react-native.config.js
//   4. Run `npx react-native-asset` (copies into
//      android/app/src/main/assets/fonts/, links for New Architecture)
//   5. Reference by exact filename-derived family name in `fontFamily` below
//      (Android resolves fontFamily to the .ttf filename, not the font's
//      internal name — this trips people up)
//
// Until then, `fontFamily: undefined` below falls through to RN's Android
// system default (Roboto) for Latin/Devanagari, and to whatever the OS's
// installed Ol Chiki fallback glyph coverage is for Santali text — which on
// stock Android 9 devices may be incomplete or absent. This is a real,
// visible gap, not cosmetic — Ol Chiki rendering must be verified once real
// devices are available (see Phase 2 report, section O).
const FONT_MUKTA_PENDING = undefined
const FONT_OLCHIKI_PENDING = undefined
const FONT_BALOO_PENDING = undefined

export const fonts = {
  mukta: FONT_MUKTA_PENDING,
  olChiki: FONT_OLCHIKI_PENDING,
  baloo: FONT_BALOO_PENDING,
}

type TextStyle = {
  fontFamily?: string
  fontSize: number
  fontWeight: '400' | '500' | '600' | '700'
  lineHeight: number
  letterSpacing?: number
}

// Scale ported from stitch-reference DESIGN.md / app/globals.css su-type-*.
export const typography: Record<string, TextStyle> = {
  headlineXl: { fontFamily: fonts.mukta, fontSize: 32, fontWeight: '700', lineHeight: 40 },
  headlineLg: { fontFamily: fonts.mukta, fontSize: 24, fontWeight: '700', lineHeight: 32 },
  headlineMd: { fontFamily: fonts.mukta, fontSize: 20, fontWeight: '600', lineHeight: 28 },
  bodyLg: { fontFamily: fonts.mukta, fontSize: 18, fontWeight: '500', lineHeight: 26 },
  bodyMd: { fontFamily: fonts.mukta, fontSize: 16, fontWeight: '400', lineHeight: 24 },
  bodySm: { fontFamily: fonts.mukta, fontSize: 14, fontWeight: '400', lineHeight: 20 },
  labelLg: { fontFamily: fonts.mukta, fontSize: 16, fontWeight: '700', lineHeight: 22, letterSpacing: 0.5 },
  labelMd: { fontFamily: fonts.mukta, fontSize: 14, fontWeight: '600', lineHeight: 18, letterSpacing: 0.25 },
  labelSm: { fontFamily: fonts.mukta, fontSize: 12, fontWeight: '600', lineHeight: 16, letterSpacing: 0.5 },
  olChiki: { fontFamily: fonts.olChiki, fontSize: 20, fontWeight: '700', lineHeight: 30 },
  numeral: { fontFamily: fonts.baloo, fontSize: 16, fontWeight: '600', lineHeight: 22 },
}

// Documents Android-version-only scope — no iOS-specific font weight quirks
// to worry about since this project is Android-only (ios/ removed).
export const isAndroid = Platform.OS === 'android'
