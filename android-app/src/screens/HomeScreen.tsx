import { useNavigation } from '@react-navigation/native'
import { BookOpen, Headphones, Languages, Mic, Play } from 'lucide-react-native'
import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, ButtonText } from '../components/Button'
import { Card } from '../components/Card'
import { Toast } from '../components/Toast'
import { useToast } from '../hooks/useToast'
import { colors, radii, spacing, typography } from '../theme'

// Backend only supports Hindi -> Santali right now (unchanged
// lib/bhashini.ts in the web project). This selector is UI-only state — it
// does not switch translation direction. Same honesty rule as the web
// HomeScreen.tsx it's ported from.
export function HomeScreen() {
  const navigation = useNavigation<any>()
  const [selectedLang, setSelectedLang] = useState<'santali' | 'hindi'>('santali')
  const { toastMessage, showToast } = useToast()

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.langSelect}>
        <Pressable
          style={[styles.langBtn, selectedLang === 'santali' && styles.langBtnActive]}
          onPress={() => setSelectedLang('santali')}
        >
          <Text style={[styles.langText, selectedLang === 'santali' && styles.langTextActive]}>संथाली</Text>
        </Pressable>
        <Pressable
          style={[styles.langBtn, selectedLang === 'hindi' && styles.langBtnActive]}
          onPress={() => {
            setSelectedLang('hindi')
            showToast('अभी केवल हिन्दी → संथाली अनुवाद समर्थित है')
          }}
        >
          <Text style={[styles.langText, selectedLang === 'hindi' && styles.langTextActive]}>हिन्दी</Text>
        </Pressable>
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroHeadline}>सीधा बोलकर अनुवाद करें</Text>
        <Text style={styles.heroBody}>हिन्दी में बोलें, संथाली अनुवाद तुरंत पढ़ें।</Text>
        <Button onPress={() => navigation.navigate('Translator')} full>
          <Mic size={22} color={colors.white} />
          <ButtonText>बोलना शुरू करें</ButtonText>
        </Button>
      </View>

      <Card lowest>
        <Text style={styles.lessonTitle}>हमारा सुंदर गाँव</Text>
        <Text style={styles.lessonSub}>अपने गाँव और आसपास की चीज़ों के बारे में सीखें।</Text>
        <View style={styles.row}>
          <Button onPress={() => navigation.navigate('Curriculum')}>
            <ButtonText>पाठ शुरू करें</ButtonText>
          </Button>
          <Button variant="secondary" onPress={() => navigation.navigate('Curriculum')}>
            <BookOpen size={16} color={colors.indigo} />
            <ButtonText color={colors.indigo}>शब्दावली</ButtonText>
          </Button>
        </View>
      </Card>

      <Text style={styles.sectionLabel}>त्वरित भाषा सामग्री</Text>
      <ContentItem
        icon={<Headphones size={20} color={colors.geru} />}
        title="बारिश गीत (बालगीत)"
        subtitle="ऑडियो व चित्र कार्ड"
        onPress={() => showToast('यह ऑडियो सामग्री अभी उपलब्ध नहीं है')}
      />
      <ContentItem
        icon={<BookOpen size={20} color={colors.geru} />}
        title="सूरज और चिड़िया (कहानी)"
        subtitle="द्विभाषी सचित्र कहानी"
        onPress={() => showToast('यह सामग्री अभी उपलब्ध नहीं है')}
      />

      <View style={styles.tileGrid}>
        <Pressable style={styles.tile} onPress={() => navigation.navigate('Storage')}>
          <Languages size={18} color={colors.geru} />
          <Text style={styles.tileTitle}>भाषा सेतु पैक</Text>
        </Pressable>
        <Pressable style={styles.tile} onPress={() => navigation.navigate('Curriculum')}>
          <BookOpen size={18} color={colors.geru} />
          <Text style={styles.tileTitle}>दैनिक बालगीत</Text>
        </Pressable>
      </View>

      <Toast message={toastMessage} />
    </ScrollView>
  )
}

function ContentItem({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  onPress: () => void
}) {
  return (
    <View style={styles.contentItem}>
      <View style={styles.contentIcon}>{icon}</View>
      <View style={styles.contentCopy}>
        <Text style={styles.contentTitle}>{title}</Text>
        <Text style={styles.contentSubtitle}>{subtitle}</Text>
      </View>
      <Pressable style={styles.playBtn} onPress={onPress}>
        <Play size={16} color={colors.geru} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  content: { padding: spacing.md, gap: spacing.md },
  langSelect: { flexDirection: 'row', gap: spacing.xs, backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.ink, borderRadius: radii.lg, padding: 4 },
  langBtn: { flex: 1, minHeight: 44, alignItems: 'center', justifyContent: 'center', borderRadius: radii.sm },
  langBtnActive: { backgroundColor: colors.indigo },
  langText: { ...typography.labelMd, color: colors.ink },
  langTextActive: { color: colors.white },
  hero: { backgroundColor: colors.geru, borderWidth: 2, borderColor: colors.ink, borderRadius: radii.lg, padding: spacing.lg, gap: spacing.md },
  heroHeadline: { ...typography.headlineLg, color: colors.white },
  heroBody: { ...typography.bodyMd, color: colors.white },
  lessonTitle: { ...typography.headlineMd, color: colors.ink, marginTop: 8 },
  lessonSub: { ...typography.bodySm, color: colors.outline, marginTop: 4, marginBottom: 12 },
  row: { flexDirection: 'row', gap: spacing.sm },
  sectionLabel: { ...typography.labelMd, color: colors.outline },
  contentItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surfaceCard, borderWidth: 1.5, borderColor: colors.ink, borderRadius: radii.lg, padding: spacing.sm },
  contentIcon: { width: 44, height: 44, borderRadius: radii.sm, backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center' },
  contentCopy: { flex: 1 },
  contentTitle: { ...typography.labelMd, color: colors.ink },
  contentSubtitle: { ...typography.labelSm, color: colors.outline },
  playBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.surfaceAlt, borderWidth: 1.5, borderColor: colors.ink, alignItems: 'center', justifyContent: 'center' },
  tileGrid: { flexDirection: 'row', gap: spacing.sm },
  tile: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: spacing.sm, minHeight: 56, backgroundColor: colors.surfaceCard, borderWidth: 1.5, borderColor: colors.ink, borderRadius: radii.lg, padding: spacing.sm },
  tileTitle: { ...typography.labelMd, color: colors.ink, flexShrink: 1 },
})
