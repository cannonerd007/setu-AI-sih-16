import { CircleHelp, ShieldCheck } from 'lucide-react-native'
import { StyleSheet, Text, View } from 'react-native'
import { colors, radii, typography } from '../theme'

// Port of components/setu/ValidationBadge.tsx from the web project.
// Explicit status required — no default that could silently overclaim.
// "verified" must only be passed for content an actual language expert
// reviewed. All current demo content (curriculum/worksheets) uses "demo".
export function ValidationBadge({ status }: { status: 'verified' | 'demo' }) {
  if (status === 'demo') {
    return (
      <View style={styles.demo}>
        <CircleHelp size={13} color={colors.outline} />
        <Text style={styles.demoText}>नमूना सामग्री (Demo)</Text>
      </View>
    )
  }
  return (
    <View style={styles.verified}>
      <ShieldCheck size={13} color={colors.turmericInk} />
      <Text style={styles.verifiedText}>भाषा विशेषज्ञ सत्यापित</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  demo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1.5,
    borderColor: colors.outline,
    borderRadius: radii.sm,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  demoText: { ...typography.labelSm, color: colors.outline },
  verified: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    backgroundColor: colors.turmeric,
    borderRadius: radii.sm,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  verifiedText: { ...typography.labelSm, color: colors.turmericInk },
})
