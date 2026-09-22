import { useState } from 'react'
import { PermissionsAndroid, Platform } from 'react-native'
import { nativeAudioService } from '../../native/NativeAudioService'
import { translateVoice } from '../../services/translateService'

export type TranslatorState = 'idle' | 'recording' | 'processing' | 'result' | 'error'

// Real end-to-end now: Android permission check (RN core PermissionsAndroid),
// real microphone capture (Kotlin AudioRecorderModule via
// native/NativeAudioService's nativeAudioService), and the translateService
// HTTP call to the existing, unmodified Next.js /api/translate proxy.
export function useVoiceTranslator() {
  const [state, setState] = useState<TranslatorState>('idle')
  const [transcript, setTranscript] = useState('')
  const [translation, setTranslation] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [permissionDenied, setPermissionDenied] = useState(false)

  const requestMicPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return true
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
      title: 'माइक अनुमति',
      message: 'संथाली अनुवाद के लिए माइक ज़रूरी है।',
      buttonPositive: 'अनुमति दें',
      buttonNegative: 'रद्द करें',
    })
    return granted === PermissionsAndroid.RESULTS.GRANTED
  }

  const handleMicPress = async () => {
    if (state === 'recording') {
      setState('processing')
      try {
        const audioBase64 = await nativeAudioService.stopRecording()
        if (!audioBase64) {
          setTranscript('')
          setTranslation('')
          setErrorMessage('कोई आवाज़ रिकॉर्ड नहीं हुई — फिर से कोशिश करें')
          setState('error')
          return
        }
        const data = await translateVoice({ audioBase64, sourceLanguage: 'hi', targetLanguage: 'sat' })
        setTranscript(data.transcript)
        setTranslation(data.translation)
        setState('result')
      } catch (err: any) {
        setTranscript('')
        setTranslation('')
        setErrorMessage(err.message || 'कुछ गलत हो गया')
        setState('error')
      }
      return
    }

    const hasPermission = await requestMicPermission()
    if (!hasPermission) {
      setPermissionDenied(true)
      return
    }
    setErrorMessage('')
    setTranscript('')
    setTranslation('')
    try {
      await nativeAudioService.startRecording()
      setState('recording')
    } catch (err: any) {
      setErrorMessage(err.message || 'माइक शुरू नहीं हो सका')
      setState('error')
    }
  }

  const retryPermission = async () => {
    const granted = await requestMicPermission()
    if (granted) setPermissionDenied(false)
  }

  return {
    state,
    transcript,
    translation,
    errorMessage,
    permissionDenied,
    handleMicPress,
    retryPermission,
  }
}
