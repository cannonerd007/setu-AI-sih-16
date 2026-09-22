import type { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card } from '../../components/Card'
import { colors, spacing, typography } from '../../theme'

export function SettingsSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card lowest>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.body}>{children}</View>
    </Card>
  )
}

const styles = StyleSheet.create({
  title: { ...typography.labelLg, color: colors.ink, marginBottom: spacing.sm },
  body: { gap: spacing.sm },
})
