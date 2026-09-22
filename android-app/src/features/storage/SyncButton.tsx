import { RefreshCw } from 'lucide-react-native'
import { Button, ButtonText } from '../../components/Button'
import { SoonTag } from '../../components/Tag'
import { colors } from '../../theme'

// No local storage/sync pipeline exists in Phase 2 — discloses that instead
// of simulating a fake "sync complete" state.
export function SyncButton({ onPress }: { onPress: () => void }) {
  return (
    <Button onPress={onPress} full>
      <RefreshCw size={20} color={colors.white} />
      <ButtonText>पाठ व भाषा सामग्री सिंक करें</ButtonText>
      <SoonTag />
    </Button>
  )
}
