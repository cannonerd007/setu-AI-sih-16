import type { ReactNode } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { borders, colors, pressOffset, radii, touchTarget, typography } from '../theme'

type Variant = 'primary' | 'secondary'

export function Button({
  children,
  onPress,
  variant = 'primary',
  disabled,
  full,
}: {
  children: ReactNode
  onPress: () => void
  variant?: Variant
  disabled?: boolean
  full?: boolean
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' ? styles.primary : styles.secondary,
        full && styles.full,
        disabled && styles.disabled,
        // Stitch's tactile press effect (box-shadow: 2px 2px 0 #221F1C) has no
        // RN box-shadow-on-press primitive — approximated with a translate.
        pressed && !disabled && { transform: [{ translateX: pressOffset }, { translateY: pressOffset }] },
      ]}
    >
      <View style={styles.content}>{children}</View>
    </Pressable>
  )
}

export function ButtonText({ children, color }: { children: ReactNode; color?: string }) {
  return <Text style={[styles.text, color ? { color } : null]}>{children}</Text>
}

const styles = StyleSheet.create({
  base: {
    minHeight: touchTarget.min + 8,
    borderRadius: radii.lg,
    borderWidth: borders.thick,
    borderColor: colors.ink,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primary: {
    backgroundColor: colors.geru,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderColor: colors.indigo,
  },
  full: {
    width: '100%',
  },
  disabled: {
    opacity: 0.55,
  },
  text: {
    ...typography.labelLg,
    color: colors.white,
  },
})
