import React, { useState } from 'react'
import { T } from '@/utils/tokens'
import { Icon } from '@/components/ui'
import { Badge } from '@/components/ui'
import { useAppStore } from '@/store/useAppStore'
import type { NavPage } from '@/types'

const NAV_LABELS: Record<NavPage, string> = {
  dashboard:     'Dashboard',
  analytics:     'Analytics',
  marketplace:   'Video Marketplace',
  studio:        'AI Studio',
  scheduler:     'Content Scheduler',
  notifications: 'Notifications',
  settings:      'Settings',
}

export const Topbar: React.FC = () => {
  const { page, setPage, darkMode, toggleDarkMode, toggleSidebar, notifications, unreadCount } = useAppStore()
  const [showNotif, setShowNotif]   = useState(false)
  const [searchVal, setSearchVal]   = useState('')

  const title = NAV_LABELS[page] ?? 'Dashboard'
  const today = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

  return (
    <div
      style={{
        height:        56,
        background:    T.surface,
        borderBottom:  `1px solid ${T.border}`,
        display:       'flex',
        alignItems:    'center',
        paddingLeft:   16,
        paddingRight:  20,
        gap:           12,
        flexShrink:    0,
        position:      'relative',
        zIndex:        50,
      }}
    >
      {/* Sidebar toggle */}
      <button
        onClick={toggleSidebar}
        title="Toggle sidebar"
        style={{
          background:   'none',
          border:       'none',
          cursor:       'pointer',
          color:        T.textMuted,
          padding:      4,
          borderRadius: 6,
          display:      'flex',
          alignItems:   'center',
        }}
      >
        <Icon name="menu" size={16} />
      </button>

      <h1
        className="font-display"
        style={{ fontSize: 15, fontWeight: 700, color: T.text, letterSpacing: '-0.01em' }}
      >
        {title}
      </h1>

      <span
        style={{
          fontSize:     11,
          color:        T.textMuted,
          fontFamily:   "'JetBrains Mono', monospace",
          background:   T.surfaceAlt,
          padding:      '3px 8px',
          borderRadius: 4,
          border:       `1px solid ${T.border}`,
          marginLeft:   4,
        }}
      >
        {today}
      </span>

      <div style={{ flex: 1 }} />

      {/* Search */}
      <div style={{ position: 'relative', width: 220 }}>
        <div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
          <Icon name="search" size={13} color={T.textMuted} />
        </div>
        <input
          placeholder="Search..."
          value={searchVal}
          onChange={e => setSearchVal(e.target.value)}
          style={{
            background:   T.surfaceAlt,
            border:       `1px solid ${T.border}`,
            color:        T.text,
            padding:      '7px 14px 7px 32px',
            borderRadius: 8,
            fontFamily:   "'DM Sans', sans-serif",
            fontSize:     13,
            outline:      'none',
            width:        '100%',
            transition:   'border-color 0.2s ease',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = T.accent }}
          onBlur={e  => { e.currentTarget.style.borderColor = T.border  }}
        />
      </div>

      {/* Dark mode */}
      <button
        onClick={toggleDarkMode}
        style={{
          background:   T.surfaceAlt,
          border:       `1px solid ${T.border}`,
          borderRadius: 8,
          padding:      '7px 9px',
          cursor:       'pointer',
          color:        T.textMuted,
          display:      'flex',
          alignItems:   'center',
        }}
      >
        <Icon name={darkMode ? 'sun' : 'moon'} size={15} color={T.textMuted} />
      </button>

      {/* Bell */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowNotif(v => !v)}
          style={{
            background:   T.surfaceAlt,
            border:       `1px solid ${T.border}`,
            borderRadius: 8,
            padding:      '7px 9px',
            cursor:       'pointer',
            display:      'flex',
            alignItems:   'center',
            position:     'relative',
          }}
        >
          <Icon name="bell" size={15} color={unreadCount > 0 ? T.accent : T.textMuted} />
          {unreadCount > 0 && (
            <span style={{ position: 'absolute', top: 4, right: 4, width: 7, height: 7, background: T.red, borderRadius: '50%' }} />
          )}
        </button>

        {showNotif && (
          <div
            style={{
              position:     'absolute',
              right:        0,
              top:          'calc(100% + 8px)',
              width:        340,
              background:   T.surface,
              border:       `1px solid ${T.border}`,
              borderRadius: 12,
              boxShadow:    '0 20px 60px rgba(0,0,0,0.6)',
              zIndex:       100,
              overflow:     'hidden',
              animation:    'scaleIn 0.2s ease both',
            }}
          >
            <div style={{ padding: '14px 16px', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: T.text }}>Notifications</span>
              <span
                style={{ fontSize: 11, color: T.accent, cursor: 'pointer' }}
                onClick={() => { setPage('notifications'); setShowNotif(false) }}
              >
                View all →
              </span>
            </div>

            {notifications.slice(0, 4).map(n => (
              <div
                key={n.id}
                style={{
                  padding:      '12px 16px',
                  borderBottom: `1px solid ${T.border}`,
                  cursor:       'pointer',
                  background:   n.read ? 'transparent' : 'rgba(245,158,11,0.03)',
                  transition:   'background 0.15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = T.surfaceAlt }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = n.read ? 'transparent' : 'rgba(245,158,11,0.03)' }}
              >
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 18, marginTop: 1 }}>{n.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: T.text, marginBottom: 2 }}>{n.title}</div>
                    <div style={{ fontSize: 11.5, color: T.textMuted, lineHeight: 1.4 }}>{n.body}</div>
                  </div>
                  <span style={{ fontSize: 10, color: T.textDim, whiteSpace: 'nowrap', fontFamily: "'JetBrains Mono', monospace" }}>{n.time}</span>
                </div>
              </div>
            ))}

            <div style={{ padding: '10px 16px', borderTop: `1px solid ${T.border}`, textAlign: 'center' }}>
              <span
                style={{ fontSize: 12, color: T.textMuted, cursor: 'pointer' }}
                onClick={() => { setPage('notifications'); setShowNotif(false) }}
              >
                See all {notifications.length} notifications
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Profile */}
      <div
        style={{
          display:     'flex',
          alignItems:  'center',
          gap:         8,
          cursor:      'pointer',
          padding:     '5px 10px',
          borderRadius: 8,
          border:      `1px solid ${T.border}`,
          background:  T.surfaceAlt,
        }}
      >
        <div
          style={{
            width:          24,
            height:         24,
            borderRadius:   '50%',
            background:     'linear-gradient(135deg,#f59e0b,#ec4899)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            fontSize:       10,
            fontWeight:     700,
            color:          '#fff',
          }}
        >
          A
        </div>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: T.text }}>Admin</span>
      </div>
    </div>
  )
}
