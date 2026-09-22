import { StyleSheet, Text, View } from 'react-native'
import { Tag } from '../../components/Tag'
import { borders, colors, radii, spacing, typography } from '../../theme'

// Deliberately no "verified" badge here — same rule as the web version:
// this is raw Bhashini AI output with zero human/linguist review step.
export function TranslationCard({
  text,
  placeholder,
}: {
  text: string
  placeholder: string
}) {
  return (
    <View style={styles.card}>
      <View style={styles.accent} />
      <Tag>संथाली</Tag>
      <Text style={[styles.text, !text && styles.placeholder]}>{text || placeholder}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: borders.thick,
    borderColor: colors.ink,
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: spacing.sm,
    overflow: 'hidden',
  },
  accent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: colors.geru,
  },
  text: { ...typography.olChiki, color: colors.geru, marginTop: 4 },
  placeholder: { color: colors.outline },
})
