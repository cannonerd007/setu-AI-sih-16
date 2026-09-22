import { StyleSheet, Text, View } from 'react-native'
import { useConnectivity } from '../hooks/useConnectivity'
import { colors, typography } from '../theme'

// Replaces web's OfflineStatusTicker (navigator.onLine) with real NetInfo
// state. Reports network connectivity only — never claims "offline ready"
// (see hooks/useConnectivity.ts and StorageScreen for why that distinction
// matters).
export function StatusTicker() {
  const { isConnected } = useConnectivity()
  const label =
    isConnected === null
      ? 'नेटवर्क जाँचा जा रहा है...'
      : isConnected
        ? 'ऑनलाइन • अनुवाद उपलब्ध'
        : 'ऑफ़लाइन • अनुवाद अभी उपलब्ध नहीं'

  return (
    <View style={[styles.ticker, isConnected ? styles.online : styles.offline]}>
      <View style={styles.dot} />
      <Text style={styles.text}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  ticker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  online: { backgroundColor: colors.indigo },
  offline: { backgroundColor: colors.error },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.white,
    opacity: 0.9,
  },
  text: {
    ...typography.labelSm,
    color: colors.white,
  },
})
