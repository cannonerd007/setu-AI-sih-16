import { ChevronLeft, ChevronRight, ImageOff, Volume2 } from 'lucide-react-native'
import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Button, ButtonText } from '../../components/Button'
import { SoonTag } from '../../components/Tag'
import { borders, colors, radii, spacing, typography } from '../../theme'
import { flashcardDeck } from './data'

export function FlashcardDeck({ onNoAudio }: { onNoAudio: () => void }) {
  const [index, setIndex] = useState(0)
  const card = flashcardDeck[index]
  const step = (dir: number) => setIndex((index + dir + flashcardDeck.length) % flashcardDeck.length)

  return (
    <View style={styles.card}>
      <View style={styles.strip}>
        <Text style={styles.stripText}>कक्षा १</Text>
        <Text style={styles.stripText}>सोहराय चित्रकला शैली</Text>
      </View>
      <View style={styles.art}>
        <ImageOff size={32} color={colors.outline} />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>कार्ड #{index + 1}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.hindi}>{card.hindi}</Text>
        <View style={styles.chip}>
          <Text style={styles.chipText}>संथाली (ओल चिकी): {card.olchiki}</Text>
        </View>
        <Text style={styles.sentence}>{card.sentence}</Text>
        <Button onPress={onNoAudio} full>
          <Volume2 size={18} color={colors.white} />
          <ButtonText>सुनें</ButtonText>
          <SoonTag />
        </Button>
      </View>
      <View style={styles.nav}>
        <Pressable style={styles.navBtn} onPress={() => step(-1)}>
          <ChevronLeft size={18} color={colors.ink} />
          <Text style={styles.navText}>पिछला</Text>
        </Pressable>
        <Text style={styles.count}>
          {index + 1} / {flashcardDeck.length}
        </Text>
        <Pressable style={styles.navBtn} onPress={() => step(1)}>
          <Text style={styles.navText}>अगला</Text>
          <ChevronRight size={18} color={colors.ink} />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surfaceCard, borderWidth: borders.thick, borderColor: colors.ink, borderRadius: radii.lg, overflow: 'hidden' },
  strip: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 8, backgroundColor: colors.surfaceAlt },
  stripText: { ...typography.labelSm, color: colors.ink },
  art: { aspectRatio: 4 / 3, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  badge: { position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(34,31,28,0.85)', borderRadius: radii.sm, paddingHorizontal: 8, paddingVertical: 2 },
  badgeText: { ...typography.labelSm, color: colors.white },
  body: { padding: spacing.md, alignItems: 'center', gap: 8 },
  hindi: { ...typography.headlineLg, fontSize: 30, color: colors.geru },
  chip: { backgroundColor: colors.surfaceAlt, borderRadius: radii.full, paddingHorizontal: 14, paddingVertical: 4 },
  chipText: { ...typography.olChiki, fontSize: 16 },
  sentence: { ...typography.labelMd, color: colors.outline, textAlign: 'center' },
  nav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.sm, borderTopWidth: 1.5, borderTopColor: colors.ink },
  navBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, minHeight: 44, paddingHorizontal: 12, borderWidth: 1.5, borderColor: colors.ink, borderRadius: radii.sm, backgroundColor: colors.surface },
  navText: { ...typography.labelMd, color: colors.ink },
  count: { ...typography.numeral, color: colors.outline },
})
