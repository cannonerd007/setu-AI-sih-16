import { Volume2 } from 'lucide-react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Button, ButtonText } from '../../components/Button'
import { SoonTag } from '../../components/Tag'
import { ValidationBadge } from '../../components/ValidationBadge'
import { borders, colors, radii, spacing, typography } from '../../theme'

export function SentenceCard({
  index,
  hindi,
  santali,
  keyTerm,
  onPlay,
}: {
  index: string
  hindi: string
  santali: string
  keyTerm: string
  onPlay: () => void
}) {
  return (
    <View style={styles.card}>
      <View style={styles.head}>
        <View style={styles.numRow}>
          <View style={styles.num}>
            <Text style={styles.numText}>{index}</Text>
          </View>
          <Text style={styles.numLabel}>वाक्य</Text>
        </View>
        <ValidationBadge status="demo" />
      </View>
      <View style={styles.block}>
        <Text style={styles.blockLabel}>हिन्दी</Text>
        <Text style={styles.blockText}>{hindi}</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.blockLabel}>संथाली</Text>
        <Text style={[styles.blockText, typography.olChiki]}>{santali}</Text>
      </View>
      <View style={styles.keyTerm}>
        <Text style={styles.keyTermText}>मुख्य शब्द: {keyTerm}</Text>
      </View>
      <Button onPress={onPlay} full>
        <Volume2 size={18} color={colors.white} />
        <ButtonText>सुनें (Play)</ButtonText>
        <SoonTag />
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surfaceCard, borderWidth: borders.thick, borderColor: colors.ink, borderRadius: radii.lg, padding: spacing.md, gap: spacing.sm },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  numRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  num: { width: 22, height: 22, borderRadius: 11, backgroundColor: colors.turmeric, alignItems: 'center', justifyContent: 'center' },
  numText: { ...typography.numeral, fontSize: 12, color: colors.turmericInk },
  numLabel: { ...typography.labelMd, color: colors.ink },
  block: { backgroundColor: colors.surface, borderRadius: radii.sm, padding: spacing.sm },
  blockLabel: { ...typography.labelSm, color: colors.outline, marginBottom: 2 },
  blockText: { ...typography.bodyMd, color: colors.ink },
  keyTerm: { backgroundColor: colors.turmeric, borderRadius: radii.sm, paddingHorizontal: 10, paddingVertical: 6, alignSelf: 'flex-start' },
  keyTermText: { ...typography.labelMd, color: colors.turmericInk },
})
