import { Printer, Sparkles } from 'lucide-react-native'
import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Card } from '../components/Card'
import { Toast } from '../components/Toast'
import { FlashcardDeck } from '../features/worksheets/FlashcardDeck'
import { WorksheetPanel } from '../features/worksheets/WorksheetPanel'
import { useToast } from '../hooks/useToast'
import { colors, radii, spacing, typography } from '../theme'

export function WorksheetsScreen() {
  const [view, setView] = useState<'flashcards' | 'worksheet'>('flashcards')
  const { toastMessage, showToast } = useToast()

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Card lowest>
        <Text style={styles.label}>कक्षा और इकाई</Text>
        <Text style={styles.value}>कक्षा 1 • इकाई 3: हमारे पालतू पशु</Text>
      </Card>

      <View style={styles.tabs}>
        <Pressable style={[styles.tab, view === 'flashcards' && styles.tabActive]} onPress={() => setView('flashcards')}>
          <Sparkles size={16} color={view === 'flashcards' ? colors.white : colors.ink} />
          <Text style={[styles.tabText, view === 'flashcards' && styles.tabTextActive]}>फ़्लैशकार्ड</Text>
        </Pressable>
        <Pressable style={[styles.tab, view === 'worksheet' && styles.tabActive]} onPress={() => setView('worksheet')}>
          <Printer size={16} color={view === 'worksheet' ? colors.white : colors.ink} />
          <Text style={[styles.tabText, view === 'worksheet' && styles.tabTextActive]}>प्रिंट कार्यपत्रक</Text>
        </Pressable>
      </View>

      {view === 'flashcards' ? (
        <FlashcardDeck onNoAudio={() => showToast('संथाली ऑडियो अभी उपलब्ध नहीं है')} />
      ) : (
        <WorksheetPanel onNotAvailable={showToast} />
      )}

      <Toast message={toastMessage} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: { padding: spacing.md, gap: spacing.md },
  label: { ...typography.labelSm, color: colors.outline },
  value: { ...typography.bodyLg, color: colors.ink },
  tabs: { flexDirection: 'row', gap: 4, backgroundColor: colors.surfaceAlt, borderWidth: 1.5, borderColor: colors.ink, borderRadius: radii.lg, padding: 4 },
  tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, minHeight: 44, borderRadius: radii.sm },
  tabActive: { backgroundColor: colors.geru },
  tabText: { ...typography.labelMd, color: colors.ink },
  tabTextActive: { color: colors.white },
})
