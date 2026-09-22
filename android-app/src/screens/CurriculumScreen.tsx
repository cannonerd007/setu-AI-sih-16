import { useNavigation } from '@react-navigation/native'
import { FileText, PlayCircle } from 'lucide-react-native'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, ButtonText } from '../components/Button'
import { SoonTag } from '../components/Tag'
import { Toast } from '../components/Toast'
import { demoSentences } from '../features/curriculum/data'
import { LessonCard } from '../features/curriculum/LessonCard'
import { SentenceCard } from '../features/curriculum/SentenceCard'
import { useToast } from '../hooks/useToast'
import { colors, spacing } from '../theme'

export function CurriculumScreen() {
  const navigation = useNavigation<any>()
  const { toastMessage, showToast } = useToast()
  const noAudioYet = () => showToast('संथाली ऑडियो अभी उपलब्ध नहीं है')

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.content}
        data={demoSentences}
        keyExtractor={item => item.index}
        ListHeaderComponent={
          <LessonCard tag="कक्षा ३ • भाषा" title="हमारा सुंदर गाँव" subtitle="गाँव की चीज़ों को पहचानना और उनके नाम सीखना।" />
        }
        renderItem={({ item }) => <SentenceCard {...item} onPlay={noAudioYet} />}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        ListFooterComponent={
          <View style={{ gap: spacing.sm, marginTop: spacing.md }}>
            <Button onPress={noAudioYet} full>
              <PlayCircle size={22} color={colors.white} />
              <ButtonText>पूरा पाठ सुनाएं</ButtonText>
              <SoonTag />
            </Button>
            <Button variant="secondary" full onPress={() => navigation.navigate('Worksheets')}>
              <FileText size={18} color={colors.indigo} />
              <ButtonText color={colors.indigo}>कार्यपत्रक देखें</ButtonText>
            </Button>
          </View>
        }
      />
      <Toast message={toastMessage} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.md },
})
