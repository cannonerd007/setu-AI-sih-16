import { BookOpen, CircleCheck, Languages, Sparkles } from 'lucide-react-native'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Card } from '../components/Card'
import { Toast } from '../components/Toast'
import { OfflineLibraryCard } from '../features/storage/OfflineLibraryCard'
import { SyncButton } from '../features/storage/SyncButton'
import { useToast } from '../hooks/useToast'
import { colors, spacing, typography } from '../theme'

// Honest port of the web StorageScreen: this app is 100% online today, no
// local content cache or sync pipeline exists. Nothing here claims
// "Offline Ready" — see hooks/useConnectivity.ts for why network state
// alone never implies that.
export function StorageScreen() {
  const { toastMessage, showToast } = useToast()

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.banner}>
        <View style={styles.bannerIcon}>
          <CircleCheck size={20} color={colors.indigo} />
        </View>
        <View style={styles.bannerCopy}>
          <Text style={styles.bannerTitle}>यह ऐप अभी पूरी तरह ऑनलाइन है</Text>
          <Text style={styles.bannerBody}>अनुवाद के लिए इंटरनेट ज़रूरी है। ऑफ़लाइन पाठ सामग्री आने वाला फीचर है।</Text>
        </View>
      </View>

      <Text style={styles.sectionLabel}>ऑफ़लाइन पाठ सामग्री (योजना में)</Text>
      <View style={{ gap: spacing.sm }}>
        <OfflineLibraryCard icon={<Languages size={20} color={colors.geru} />} title="संथाली भाषा व आवाज़" subtitle="दुमका क्षेत्रीय बोली AI मॉडल" />
        <OfflineLibraryCard icon={<Sparkles size={20} color={colors.geru} />} title="कक्षा १-३ गणित व भाषा पाठ" subtitle="बुनियादी संख्या व भाषा अभ्यास" />
        <OfflineLibraryCard icon={<BookOpen size={20} color={colors.geru} />} title="दैनिक बालगीत व फ़्लैशकार्ड" subtitle="चित्र व बालगीत संग्रह" />
      </View>

      <Card>
        <Text style={styles.syncTitle}>नया पाठ अपडेट करें</Text>
        <Text style={styles.syncBody}>ऑफ़लाइन सिंक अभी विकास में है।</Text>
        <SyncButton onPress={() => showToast('ऑफ़लाइन सिंक अभी उपलब्ध नहीं है')} />
      </Card>

      <Toast message={toastMessage} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: { padding: spacing.md, gap: spacing.md },
  banner: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surfaceAlt, borderWidth: 1.5, borderColor: colors.ink, borderRadius: 8, padding: spacing.md },
  bannerIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceCard, alignItems: 'center', justifyContent: 'center' },
  bannerCopy: { flex: 1 },
  bannerTitle: { ...typography.headlineMd, color: colors.ink },
  bannerBody: { ...typography.bodySm, color: colors.outline },
  sectionLabel: { ...typography.labelMd, color: colors.outline },
  syncTitle: { ...typography.headlineMd, color: colors.ink },
  syncBody: { ...typography.bodySm, color: colors.outline, marginBottom: 12, marginTop: 4 },
})
