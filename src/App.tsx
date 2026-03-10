import React from 'react'
import { useAppStore } from '@/store/useAppStore'
import { AppLayout } from '@/layouts/AppLayout'
import { AuthPage }          from '@/pages/AuthPage'
import { DashboardPage }     from '@/pages/DashboardPage'
import { AnalyticsPage }     from '@/pages/AnalyticsPage'
import { MarketplacePage }   from '@/pages/MarketplacePage'
import { StudioPage }        from '@/pages/StudioPage'
import { SchedulerPage }     from '@/pages/SchedulerPage'
import { NotificationsPage } from '@/pages/NotificationsPage'
import { SettingsPage }      from '@/pages/SettingsPage'

const PAGES: Record<string, React.FC> = {
  dashboard:     DashboardPage,
  analytics:     AnalyticsPage,
  marketplace:   MarketplacePage,
  studio:        StudioPage,
  scheduler:     SchedulerPage,
  notifications: NotificationsPage,
  settings:      SettingsPage,
}

export default function App() {
  const { isAuthed, page } = useAppStore()

  if (!isAuthed) return <AuthPage/>

  const PageComponent = PAGES[page] ?? DashboardPage

  return (
    <AppLayout>
      <PageComponent/>
    </AppLayout>
  )
}
