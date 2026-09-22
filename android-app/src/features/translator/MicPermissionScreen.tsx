import { MicOff, RefreshCw } from 'lucide-react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Button, ButtonText } from '../../components/Button'
import { Card } from '../../components/Card'
import { colors, spacing, typography } from '../../theme'

// Part of the Translator flow (not a bottom tab) — TranslatorScreen renders
// this in place of the normal UI when useVoiceTranslator's real
// PermissionsAndroid check reports denial.
export function MicPermissionScreen({ onRetry }: { onRetry: () => void }) {
  return (
    <View style={styles.container}>
      <Card lowest>
        <View style={styles.hero}>
          <View style={styles.icon}>
            <MicOff size={32} color={colors.error} />
          </View>
          <Text style={styles.title}>आवाज़ सुनने के लिए माइक की अनुमति दें</Text>
          <Text style={styles.body}>
            संथाली अनुवाद के लिए Android का माइक चालू होना ज़रूरी है। आपकी आवाज़ केवल Bhashini को अनुवाद के लिए भेजी जाती है।
          </Text>
        </View>
      </Card>
      <Button onPress={onRetry} full>
        <RefreshCw size={20} color={colors.white} />
        <ButtonText>फिर से अनुमति माँगें</ButtonText>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { gap: spacing.md },
  hero: { alignItems: 'center', gap: spacing.sm },
  icon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#ffdad6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { ...typography.headlineLg, color: colors.ink, textAlign: 'center' },
  body: { ...typography.bodyMd, color: colors.outline, textAlign: 'center' },
})
