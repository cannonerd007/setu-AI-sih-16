import { CircleHelp, Mic, Phone, SlidersHorizontal, User } from 'lucide-react-native'
import { useState } from 'react'
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, ButtonText } from '../components/Button'
import { Card } from '../components/Card'
import { SoonTag, Tag } from '../components/Tag'
import { Toast } from '../components/Toast'
import { LanguageRoadmapItem } from '../features/settings/LanguageRoadmapItem'
import { SettingsSection } from '../features/settings/SettingsSection'
import { useToast } from '../hooks/useToast'
import { colors, radii, spacing, typography } from '../theme'

export function SettingsScreen() {
  const [textSize, setTextSize] = useState<'normal' | 'large'>('normal')
  const { toastMessage, showToast } = useToast()

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Card lowest>
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <User size={24} color={colors.geru} />
          </View>
          <View style={styles.profileCopy}>
            <Text style={styles.name}>आशा मुर्मू</Text>
            <Text style={styles.role}>सहायक शिक्षक • प्राथमिक विद्यालय</Text>
            <Text style={styles.session}>सत्र २०२५–२६</Text>
          </View>
          <Tag>सत्यापित संकुल</Tag>
        </View>
      </Card>

      <SettingsSection title="भाषा विस्तार रोडमैप">
        <LanguageRoadmapItem code="सं" name="संथाली (Santhali)" script="ओल चिकी लिपि एवं उच्चारण" status="ready" statusLabel="तैयार और सक्रिय" />
        <LanguageRoadmapItem code="हो" name="हो (Ho)" script="वारंग चिति लिपि" status="training" statusLabel="प्रशिक्षण जारी" />
        <LanguageRoadmapItem code="मुं" name="मुंडारी (Mundari)" script="मुंडारी बानी एवं देवनागरी" status="collecting" statusLabel="डेटा संग्रह जारी" />
      </SettingsSection>

      <View style={styles.contribution}>
        <Tag>शिक्षक सहभागिता</Tag>
        <Text style={styles.contribTitle}>स्थानीय बोली संवर्धन में सहयोग दें</Text>
        <Text style={styles.contribBody}>अपनी स्थानीय बोली में ५ छोटे वाक्य रिकॉर्ड करें और मॉडल को समृद्ध बनाएं।</Text>
        <View style={styles.sample}>
          <Text style={styles.sampleText}>"बच्चों, आज हम पेड़ के बारे में सीखेंगे।"</Text>
        </View>
        <Button onPress={() => showToast('आवाज़ योगदान अपलोड अभी उपलब्ध नहीं है')} full>
          <Mic size={18} color={colors.white} />
          <ButtonText>अपनी आवाज़ जोड़ें</ButtonText>
          <SoonTag />
        </Button>
      </View>

      <SettingsSection title="पठन प्राथमिकताएं">
        <View style={styles.toggleRow}>
          <View style={styles.toggleLabel}>
            <SlidersHorizontal size={18} color={colors.ink} />
            <Text style={styles.toggleText}>अक्षर का आकार</Text>
          </View>
          <View style={styles.sizeSwitch}>
            <Pressable style={[styles.sizeBtn, textSize === 'normal' && styles.sizeBtnActive]} onPress={() => setTextSize('normal')}>
              <Text style={[styles.sizeBtnText, textSize === 'normal' && styles.sizeBtnTextActive]}>सामान्य</Text>
            </Pressable>
            <Pressable style={[styles.sizeBtn, textSize === 'large' && styles.sizeBtnActive]} onPress={() => setTextSize('large')}>
              <Text style={[styles.sizeBtnText, textSize === 'large' && styles.sizeBtnTextActive]}>बड़ा</Text>
            </Pressable>
          </View>
        </View>
        {/* Noise suppression implies real-time audio processing, which does
            not exist yet (no Kotlin audio module in Phase 2) — shown as
            not-yet-available rather than a working toggle for a capability
            that isn't built. */}
        <View style={styles.toggleRow}>
          <View style={styles.toggleLabel}>
            <Mic size={18} color={colors.ink} />
            <Text style={styles.toggleText}>माइक शोर निवारक</Text>
          </View>
          <SoonTag />
        </View>
      </SettingsSection>

      <SettingsSection title="सहायता एवं संकुल संपर्क">
        <View style={styles.toggleRow}>
          <View style={styles.toggleLabel}>
            <CircleHelp size={20} color={colors.ink} />
            <Text style={styles.toggleText}>समन्वयक: रमेश हेम्ब्रम</Text>
          </View>
          <Button variant="secondary" onPress={() => Linking.openURL('tel:9431100000')}>
            <Phone size={16} color={colors.indigo} />
            <ButtonText color={colors.indigo}>कॉल करें</ButtonText>
          </Button>
        </View>
      </SettingsSection>

      <Text style={styles.footer}>SETU सेतु • संस्करण 1.0.0 (डेमो)</Text>
      <Toast message={toastMessage} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: { padding: spacing.md, gap: spacing.md },
  profileRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center' },
  profileCopy: { flex: 1 },
  name: { ...typography.headlineMd, color: colors.ink },
  role: { ...typography.bodySm, color: colors.geru, fontWeight: '700' },
  session: { ...typography.bodySm, color: colors.outline, marginTop: 2 },
  contribution: { backgroundColor: colors.geru, borderWidth: 2, borderColor: colors.ink, borderRadius: radii.lg, padding: spacing.md, gap: spacing.sm },
  contribTitle: { ...typography.headlineMd, color: colors.white },
  contribBody: { ...typography.bodySm, color: colors.white, opacity: 0.92 },
  sample: { backgroundColor: colors.white, borderRadius: radii.sm, padding: spacing.sm },
  sampleText: { ...typography.bodyMd, color: colors.ink, fontWeight: '600' },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm },
  toggleLabel: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  toggleText: { ...typography.labelMd, color: colors.ink },
  sizeSwitch: { flexDirection: 'row', backgroundColor: colors.surfaceAlt, borderRadius: radii.sm, padding: 2, gap: 2 },
  sizeBtn: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: radii.sm },
  sizeBtnActive: { backgroundColor: colors.geru },
  sizeBtnText: { ...typography.labelSm, color: colors.ink },
  sizeBtnTextActive: { color: colors.white },
  footer: { ...typography.bodySm, color: colors.outline, textAlign: 'center' },
})
