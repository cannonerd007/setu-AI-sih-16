import { StyleSheet, Text, View } from 'react-native'
import { colors, radii, typography } from '../theme'

export function Tag({ children }: { children: string }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}

// Used everywhere a feature is not real yet — never a silent disabled
// control, always a visible, honest label.
export function SoonTag({ label = 'जल्द' }: { label?: string }) {
  return (
    <View style={styles.soon}>
      <Text style={styles.soonText}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.turmeric,
    borderRadius: radii.sm,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  text: {
    ...typography.labelSm,
    color: colors.turmericInk,
  },
  soon: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1.5,
    borderColor: colors.outline,
    borderRadius: radii.sm,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  soonText: {
    ...typography.labelSm,
    color: colors.outline,
  },
})
