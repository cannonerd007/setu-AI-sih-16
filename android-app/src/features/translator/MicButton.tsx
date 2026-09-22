import { Mic } from 'lucide-react-native'
import { useEffect, useRef } from 'react'
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import { borders, colors, micButton, typography } from '../../theme'

export function MicButton({
  recording,
  processing,
  onPress,
}: {
  recording: boolean
  processing: boolean
  onPress: () => void
}) {
  const pulse = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (!recording) {
      pulse.setValue(1)
      return
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.5, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 0, useNativeDriver: true }),
      ]),
    )
    loop.start()
    return () => loop.stop()
  }, [recording, pulse])

  return (
    <View style={styles.ring}>
      {recording && (
        <Animated.View
          style={[
            styles.pulse,
            { transform: [{ scale: pulse }], opacity: pulse.interpolate({ inputRange: [1, 1.5], outputRange: [0.5, 0] }) },
          ]}
        />
      )}
      <Pressable
        onPress={onPress}
        disabled={processing}
        style={[styles.core, recording && styles.recording, processing && styles.processing]}
      >
        <Mic size={32} color={colors.white} />
        <Text style={styles.label}>बोलें</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  ring: {
    width: micButton.ring,
    height: micButton.ring,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  pulse: {
    position: 'absolute',
    width: micButton.core,
    height: micButton.core,
    borderRadius: micButton.core / 2,
    backgroundColor: colors.turmeric,
  },
  core: {
    width: micButton.core,
    height: micButton.core,
    borderRadius: micButton.core / 2,
    backgroundColor: colors.geru,
    borderWidth: borders.thick,
    borderColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  recording: { backgroundColor: colors.error },
  processing: { opacity: 0.7 },
  label: { ...typography.labelSm, color: colors.white, fontWeight: '700' },
})
