export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const

export const radii = {
  sm: 4,
  lg: 8,
  full: 9999,
} as const

export const borders = {
  thin: 1.5,
  thick: 2,
} as const

// Stitch DESIGN.md's tactile press effect: "box-shadow: 2px 2px 0 #221F1C".
// RN has no box-shadow-on-press primitive — Pressable components apply this
// as a translateX/translateY on their pressed style instead (see
// components/Button.tsx), this constant is just the offset amount.
export const pressOffset = 2
