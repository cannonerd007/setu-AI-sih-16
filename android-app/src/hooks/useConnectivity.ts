import NetInfo from '@react-native-community/netinfo'
import { useEffect, useState } from 'react'

// Replaces the web project's `navigator.onLine` with real NetInfo state.
//
// IMPORTANT: this reports NETWORK connectivity only. It does NOT mean the
// app is "offline ready" — that requires local content/database/model
// assets to actually exist (none do yet, see StorageScreen). Any screen
// using this must not conflate "has network" with "works offline".
export function useConnectivity() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? false)
    })
    return unsubscribe
  }, [])

  return { isConnected }
}
