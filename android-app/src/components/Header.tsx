import { User } from 'lucide-react-native'
import { StyleSheet, Text, View } from 'react-native'
import { borders, colors, radii, spacing, typography } from '../theme'

// Settings is its own bottom tab in this phase (per Phase 2 nav spec), so
// unlike the web Header this has no onSettings/avatar-press wiring — the
// avatar here is decorative, matching Stitch's visual, without inventing a
// second navigation path to the same screen.
export function Header({ title }: { title: string }) {
  return (
    <View style={styles.header}>
      <View style={styles.brand}>
        <View style={styles.mark}>
          <Text style={styles.markText}>से</Text>
        </View>
        <View style={styles.brandCopy}>
          <Text style={styles.title}>SETU | सेतु</Text>
          <Text style={styles.subtitle}>{title}</Text>
        </View>
      </View>
      <View style={styles.langPair}>
        <Text style={styles.langPairText}>हिन्दी ⇄ संथाली</Text>
      </View>
      <View style={styles.avatar}>
        <User size={16} color={colors.white} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    backgroundColor: colors.canvas,
    borderBottomWidth: borders.thick,
    borderBottomColor: colors.ink,
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flexShrink: 1 },
  mark: {
    width: 32,
    height: 32,
    borderRadius: radii.sm,
    backgroundColor: colors.geru,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markText: { color: colors.white, fontWeight: '700' },
  brandCopy: { flexShrink: 1 },
  title: { ...typography.headlineMd, fontSize: 18, color: colors.ink },
  subtitle: { ...typography.labelSm, color: colors.outline },
  langPair: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: borders.thin,
    borderColor: colors.ink,
    borderRadius: radii.sm,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  langPairText: { ...typography.labelSm, color: colors.ink },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.geru,
    borderWidth: borders.thin,
    borderColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
