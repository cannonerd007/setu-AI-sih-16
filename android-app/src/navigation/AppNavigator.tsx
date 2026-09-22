import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BookOpen, FileText, FolderOpen, Home as HomeIcon, Settings as SettingsIcon, Waves } from 'lucide-react-native'
import { Header } from '../components/Header'
import { CurriculumScreen } from '../screens/CurriculumScreen'
import { HomeScreen } from '../screens/HomeScreen'
import { SettingsScreen } from '../screens/SettingsScreen'
import { StorageScreen } from '../screens/StorageScreen'
import { TranslatorScreen } from '../screens/TranslatorScreen'
import { WorksheetsScreen } from '../screens/WorksheetsScreen'
import { borders, colors } from '../theme'

// Mic Permission Denied is NOT a tab — it's a state rendered inside
// TranslatorScreen (see features/translator/useVoiceTranslator.ts), per
// Phase 2 nav spec. Six primary screens, flat bottom-tab structure, no
// nested stack navigators — nothing here justifies one yet.
export type RootTabParamList = {
  Home: undefined
  Translator: undefined
  Curriculum: undefined
  Worksheets: undefined
  Storage: undefined
  Settings: undefined
}

const Tab = createBottomTabNavigator<RootTabParamList>()

const titles: Record<keyof RootTabParamList, string> = {
  Home: 'आपका आज का शिक्षण साथी',
  Translator: 'बोलें और सीखें',
  Curriculum: 'पाठ और वाक्य अभ्यास',
  Worksheets: 'देखें, बोलें, सीखें',
  Storage: 'आपकी सामग्री',
  Settings: 'सेटिंग्स',
}

export function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => <Header title={titles[route.name as keyof RootTabParamList]} />,
        tabBarActiveTintColor: colors.geru,
        tabBarInactiveTintColor: colors.outline,
        tabBarStyle: {
          backgroundColor: colors.canvas,
          borderTopWidth: borders.thick,
          borderTopColor: colors.ink,
          height: 64,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'होम', tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} /> }} />
      <Tab.Screen name="Translator" component={TranslatorScreen} options={{ tabBarLabel: 'अनुवादक', tabBarIcon: ({ color, size }) => <Waves color={color} size={size} /> }} />
      <Tab.Screen name="Curriculum" component={CurriculumScreen} options={{ tabBarLabel: 'पाठ्यक्रम', tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size} /> }} />
      <Tab.Screen name="Worksheets" component={WorksheetsScreen} options={{ tabBarLabel: 'कार्यपत्रक', tabBarIcon: ({ color, size }) => <FileText color={color} size={size} /> }} />
      <Tab.Screen name="Storage" component={StorageScreen} options={{ tabBarLabel: 'संग्रह', tabBarIcon: ({ color, size }) => <FolderOpen color={color} size={size} /> }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: 'सेटिंग्स', tabBarIcon: ({ color, size }) => <SettingsIcon color={color} size={size} /> }} />
    </Tab.Navigator>
  )
}
