'use client'

import { useState } from 'react'
import { AppShell } from '@/components/setu/AppShell'
import { CurriculumScreen } from '@/components/setu/CurriculumScreen'
import { HomeScreen } from '@/components/setu/HomeScreen'
import { SettingsScreen } from '@/components/setu/SettingsScreen'
import { StorageScreen } from '@/components/setu/StorageScreen'
import { VoiceTranslator } from '@/components/setu/VoiceTranslator'
import { WorksheetsScreen } from '@/components/setu/WorksheetsScreen'

const titles: Record<string, string> = {
  home: 'आपका आज का शिक्षण साथी',
  translator: 'बोलें और सीखें',
  curriculum: 'पाठ और वाक्य अभ्यास',
  worksheets: 'देखें, बोलें, सीखें',
  storage: 'आपकी सामग्री',
  settings: 'सेटिंग्स',
}

export default function Page() {
  const [screen, setScreen] = useState('home')
  const [settings, setSettings] = useState(false)
  const active = settings ? 'settings' : screen
  const goTab = (s: string) => { setScreen(s); setSettings(false) }

  return (
    <AppShell title={titles[active]} activeTab={screen} onTabChange={goTab} onSettings={() => setSettings(true)}>
      {active === 'home' && <HomeScreen go={goTab} />}
      {active === 'translator' && <VoiceTranslator onNavigate={goTab} />}
      {active === 'curriculum' && <CurriculumScreen go={goTab} />}
      {active === 'worksheets' && <WorksheetsScreen />}
      {active === 'storage' && <StorageScreen />}
      {active === 'settings' && <SettingsScreen />}
    </AppShell>
  )
}
