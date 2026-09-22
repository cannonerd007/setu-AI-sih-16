import type { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SoonTag } from '../../components/Tag'
import { borders, colors, radii, spacing, typography } from '../../theme'

export function OfflineLibraryCard({ icon, title, subtitle }: { icon: ReactNode; title: string; subtitle: string }) {
  return (
    <View style={styles.item}>
      <View style={styles.icon}>{icon}</View>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <SoonTag label="योजना में" />
    </View>
  )
}

const styles = StyleSheet.create({
  item: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surfaceCard, borderWidth: borders.thin, borderColor: colors.ink, borderRadius: radii.lg, padding: spacing.sm },
  icon: { width: 44, height: 44, borderRadius: radii.sm, backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1 },
  title: { ...typography.labelMd, color: colors.ink },
  subtitle: { ...typography.labelSm, color: colors.outline },
})
