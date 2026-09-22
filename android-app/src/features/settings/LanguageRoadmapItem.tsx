import { StyleSheet, Text, View } from 'react-native'
import { colors, radii, typography } from '../../theme'

const statusStyle = {
  ready: { backgroundColor: colors.indigo, color: colors.white },
  training: { backgroundColor: colors.turmeric, color: colors.turmericInk },
  collecting: { backgroundColor: colors.surfaceAlt, color: colors.outline },
} as const

export function LanguageRoadmapItem({
  code,
  name,
  script,
  status,
  statusLabel,
}: {
  code: string
  name: string
  script: string
  status: keyof typeof statusStyle
  statusLabel: string
}) {
  const s = statusStyle[status]
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <View style={styles.iconBox}>
          <Text style={styles.iconText}>{code}</Text>
        </View>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.script}>{script}</Text>
        </View>
      </View>
      <View style={[styles.status, { backgroundColor: s.backgroundColor }]}>
        <Text style={[styles.statusText, { color: s.color }]}>{statusLabel}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  left: { flexDirection: 'row', alignItems: 'center', gap: 12, flexShrink: 1 },
  iconBox: { width: 38, height: 38, borderRadius: radii.sm, backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center' },
  iconText: { ...typography.labelLg, color: colors.ink },
  name: { ...typography.labelLg, color: colors.ink },
  script: { ...typography.bodySm, color: colors.outline },
  status: { borderRadius: radii.sm, paddingHorizontal: 8, paddingVertical: 4 },
  statusText: { ...typography.labelSm },
})
