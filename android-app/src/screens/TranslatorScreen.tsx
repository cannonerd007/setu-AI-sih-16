import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, ButtonText } from '../components/Button'
import { SoonTag } from '../components/Tag'
import { Toast } from '../components/Toast'
import { MicButton } from '../features/translator/MicButton'
import { MicPermissionScreen } from '../features/translator/MicPermissionScreen'
import { TranscriptCard } from '../features/translator/TranscriptCard'
import { TranslationCard } from '../features/translator/TranslationCard'
import { useVoiceTranslator, type TranslatorState } from '../features/translator/useVoiceTranslator'
import { useToast } from '../hooks/useToast'
import { borders, colors, radii, spacing, typography } from '../theme'

const statusText: Record<TranslatorState, string> = {
  idle: 'बोलते ही संथाली में अनुवाद दिखेगा',
  recording: 'सुन रहा हूँ... रोकने के लिए फिर दबाएं',
  processing: 'अनुवाद हो रहा है...',
  result: 'तैयार — नीचे परिणाम देखें',
  error: '',
}

export function TranslatorScreen() {
  const {
    state,
    transcript,
    translation,
    errorMessage,
    permissionDenied,
    handleMicPress,
    retryPermission,
  } = useVoiceTranslator()
  const { toastMessage, showToast } = useToast()

  if (permissionDenied) {
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <MicPermissionScreen onRetry={retryPermission} />
      </ScrollView>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.segmented}>
        <View style={[styles.segBtn, styles.segActive]}>
          <Text style={styles.segText}>दबाकर बोलें</Text>
        </View>
        <View style={styles.segBtn}>
          <Text style={styles.segTextDisabled}>लगातार सुनें</Text>
          <SoonTag />
        </View>
      </View>

      <TranscriptCard label="शिक्षक • हिन्दी" text={transcript} placeholder="माइक दबाकर हिन्दी में बोलें" />
      <TranslationCard text={translation} placeholder="ᱟᱢᱟᱜ ᱵᱚᱞ ᱱᱚᱶᱰᱮ ᱦᱩᱭ ᱟᱭ" />

      <View style={styles.micSection}>
        <MicButton recording={state === 'recording'} processing={state === 'processing'} onPress={handleMicPress} />
        <Text style={styles.micTitle}>{state === 'recording' ? 'रोकने के लिए दबाएं' : 'माइक दबाकर बोलें'}</Text>
        <Text style={styles.micSub}>{state === 'error' ? errorMessage : statusText[state]}</Text>
      </View>

      <Button
        variant="secondary"
        full
        onPress={() => showToast('आवाज़ जल्द उपलब्ध होगी — इस खाते पर संथाली टीटीएस अभी उपलब्ध नहीं है')}
      >
        <ButtonText color={colors.indigo}>पिछला वाक्य दोहराएं</ButtonText>
        <SoonTag />
      </Button>

      <Toast message={toastMessage} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: { padding: spacing.md, gap: spacing.md },
  segmented: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceAlt,
    borderWidth: borders.thin,
    borderColor: colors.ink,
    borderRadius: radii.lg,
    padding: 4,
    gap: 4,
  },
  segBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10, borderRadius: radii.sm },
  segActive: { backgroundColor: colors.surfaceCard, borderWidth: 1.5, borderColor: colors.ink },
  segText: { ...typography.labelMd, color: colors.ink },
  segTextDisabled: { ...typography.labelMd, color: colors.outline },
  micSection: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.sm },
  micTitle: { ...typography.headlineMd, color: colors.geru, textAlign: 'center' },
  micSub: { ...typography.bodySm, color: colors.outline, textAlign: 'center' },
})
