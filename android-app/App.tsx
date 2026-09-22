import { NavigationContainer } from '@react-navigation/native'
import { StatusBar, StyleSheet, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StatusTicker } from './src/components/StatusTicker'
import { AppNavigator } from './src/navigation/AppNavigator'
import { colors } from './src/theme'

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.shell} edges={['top']}>
        <StatusTicker />
        <View style={styles.body}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  shell: { flex: 1, backgroundColor: colors.canvas },
  body: { flex: 1 },
})

export default App
