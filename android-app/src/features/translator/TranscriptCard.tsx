import { Mic } from 'lucide-react-native'
import { StyleSheet, Text, View } from 'react-native'
import { borders, colors, radii, spacing, typography } from '../../theme'

export function TranscriptCard({
  label,
  text,
  placeholder,
}: {
  label: string
  text: string
  placeholder: string
}) {
  return (
    <View style={styles.card}>
      <View style={styles.labelRow}>
        <Mic size={16} color={colors.outline} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={[styles.text, !text && styles.placeholder]}>{text || placeholder}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceCard,
    borderWidth: borders.thick,
    borderColor: colors.ink,
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: spacing.xs,
  },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  label: { ...typography.labelMd, color: colors.outline },
  text: { ...typography.headlineMd, color: colors.ink },
  placeholder: { color: colors.outline, fontWeight: '400' },
})
