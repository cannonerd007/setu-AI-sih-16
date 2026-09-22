import { StyleSheet, Text } from 'react-native'
import { Card } from '../../components/Card'
import { Tag } from '../../components/Tag'
import { colors, typography } from '../../theme'

export function LessonCard({ tag, title, subtitle }: { tag: string; title: string; subtitle: string }) {
  return (
    <Card lowest>
      <Tag>{tag}</Tag>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </Card>
  )
}

const styles = StyleSheet.create({
  title: { ...typography.headlineMd, color: colors.ink, marginTop: 8 },
  subtitle: { ...typography.bodySm, color: colors.outline, marginTop: 4 },
})
