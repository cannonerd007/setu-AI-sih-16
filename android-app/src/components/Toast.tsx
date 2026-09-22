import { StyleSheet, Text } from 'react-native'
import { colors, radii, typography } from '../theme'

export function Toast({ message }: { message: string | null }) {
  if (!message) return null
  return <Text style={styles.toast}>{message}</Text>
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 88,
    left: 24,
    right: 24,
    textAlign: 'center',
    backgroundColor: colors.ink,
    color: colors.white,
    borderRadius: radii.full,
    paddingVertical: 10,
    paddingHorizontal: 18,
    ...typography.labelMd,
    overflow: 'hidden',
  },
})
