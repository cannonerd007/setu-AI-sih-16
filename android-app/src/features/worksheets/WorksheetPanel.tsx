import { Printer, Share2 } from 'lucide-react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Button, ButtonText } from '../../components/Button'
import { SoonTag } from '../../components/Tag'
import { borders, colors, radii, spacing, typography } from '../../theme'

// PDF export / share don't exist — Android has real file/print/share APIs
// unlike a browser tab, but building that is out of Phase 2 scope (see
// section 21). Discloses honestly instead of pretending to generate a file.
export function WorksheetPanel({ onNotAvailable }: { onNotAvailable: (msg: string) => void }) {
  return (
    <View style={styles.panel}>
      <SoonTag label="ऑफ़लाइन कार्यपत्रक (Worksheet)" />
      <Text style={styles.title}>जोड़ी मिलाओ: पशु और नाम</Text>
      <Text style={styles.subtitle}>चित्र देखकर सही हिन्दी व ओल चिकी शब्द को मिलाएँ।</Text>
      <Button full onPress={() => onNotAvailable('PDF कार्यपत्रक निर्यात अभी उपलब्ध नहीं है')}>
        <Printer size={20} color={colors.white} />
        <ButtonText>प्रिंट हेतु PDF बनाएं</ButtonText>
        <SoonTag />
      </Button>
      <Button variant="secondary" full onPress={() => onNotAvailable('साझाकरण अभी उपलब्ध नहीं है')}>
        <Share2 size={18} color={colors.indigo} />
        <ButtonText color={colors.indigo}>साझा करें</ButtonText>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  panel: { backgroundColor: colors.surfaceCard, borderWidth: borders.thick, borderColor: colors.ink, borderRadius: radii.lg, padding: spacing.md, gap: spacing.sm },
  title: { ...typography.headlineMd, color: colors.ink, marginTop: 6 },
  subtitle: { ...typography.bodySm, color: colors.outline, marginBottom: 4 },
})
