# Fonts — PENDING

No font files exist in this directory yet. Nothing here was invented or
substituted — see `src/theme/typography.ts` for the full explanation.

## Needed files (from stitch-reference/*/DESIGN.md)

| Family | Files | Use |
|---|---|---|
| Mukta | `Mukta-Regular.ttf`, `Mukta-Medium.ttf`, `Mukta-SemiBold.ttf`, `Mukta-Bold.ttf` | Hindi + Latin UI text |
| Baloo 2 | `Baloo2-Medium.ttf`, `Baloo2-SemiBold.ttf`, `Baloo2-Bold.ttf` | numerals only |
| Noto Sans Ol Chiki | `NotoSansOlChiki-Regular.ttf`, `NotoSansOlChiki-Bold.ttf` | Santali/Ol Chiki script — critical |

## Integration steps once files exist

1. Place the `.ttf` files directly in this directory.
2. From `android-app/`: `npm install --save-dev react-native-asset` (not yet a
   project dependency — only needed for this one-time link step).
3. Run `npx react-native-asset` — copies fonts into
   `android/app/src/main/assets/fonts/` and links them for the app.
4. Update `src/theme/typography.ts`: replace the `FONT_*_PENDING` constants
   with the exact filename (minus `.ttf`) — Android resolves `fontFamily` to
   the font FILE name, not the font's internal metadata name. This is the
   most common source of "font not applying" bugs on Android.
5. Rebuild the app (`npx react-native run-android`) — font changes require a
   native rebuild, not just a Metro reload.

## Why this matters for Santali specifically

Ol Chiki glyph coverage on stock Android AOSP fonts is inconsistent across
OS versions/OEM skins, especially on older/low-cost devices (this project's
actual target hardware per the performance-target requirements). Until
Noto Sans Ol Chiki is bundled and verified on a real Android 9 device,
Santali text may render as tofu boxes or a low-quality fallback glyph. This
is a real, testable risk — not resolved by this Phase 2 scaffold.
