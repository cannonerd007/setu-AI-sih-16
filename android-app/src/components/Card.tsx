import type { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { borders, colors, radii, spacing } from '../theme'

export function Card({ children, lowest }: { children: ReactNode; lowest?: boolean }) {
  return <View style={[styles.card, lowest && styles.lowest]}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: borders.thick,
    borderColor: colors.ink,
    borderRadius: radii.lg,
    padding: spacing.md,
  },
  lowest: {
    backgroundColor: colors.surfaceCard,
  },
})
