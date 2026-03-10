import React from 'react'
import { Sidebar } from './Sidebar'
import { Topbar }  from './Topbar'
import { useAppStore } from '@/store/useAppStore'
import { T } from '@/utils/tokens'

interface AppLayoutProps {
  children: React.ReactNode
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { page, setPage, sidebarCollapsed, unreadCount } = useAppStore()

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: T.bg }}>
      <Sidebar
        page={page}
        setPage={setPage}
        collapsed={sidebarCollapsed}
        unreadCount={unreadCount}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Topbar />

        <main
          key={page}
          style={{
            flex:       1,
            overflowY:  'auto',
            background: T.bg,
            animation:  'fadeIn 0.3s ease both',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
