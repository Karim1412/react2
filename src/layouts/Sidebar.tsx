import React from 'react'
import { T } from '@/utils/tokens'
import { Icon } from '@/components/ui'
import type { NavPage } from '@/types'

const NAV_ITEMS: { id: NavPage; label: string; icon: string }[] = [
  { id: 'dashboard',     label: 'Dashboard',    icon: 'dashboard'     },
  { id: 'analytics',     label: 'Analytics',    icon: 'analytics'     },
  { id: 'marketplace',   label: 'Marketplace',  icon: 'marketplace'   },
  { id: 'studio',        label: 'AI Studio',    icon: 'studio'        },
  { id: 'scheduler',     label: 'Scheduler',    icon: 'scheduler'     },
  { id: 'notifications', label: 'Notifications',icon: 'notifications' },
  { id: 'settings',      label: 'Settings',     icon: 'settings'      },
]

interface SidebarProps {
  page:        NavPage
  setPage:     (p: NavPage) => void
  collapsed:   boolean
  unreadCount: number
}

export const Sidebar: React.FC<SidebarProps> = ({ page, setPage, collapsed, unreadCount }) => (
  <aside
    style={{
      width:          collapsed ? 64 : 220,
      background:     T.surface,
      borderRight:    `1px solid ${T.border}`,
      display:        'flex',
      flexDirection:  'column',
      padding:        '0 8px',
      transition:     'width 0.25s ease',
      flexShrink:     0,
      overflow:       'hidden',
    }}
  >
    {/* Logo */}
    <div
      style={{
        padding:       '20px 8px 16px',
        borderBottom:  `1px solid ${T.border}`,
        marginBottom:  8,
      }}
    >
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
        onClick={() => setPage('dashboard')}
      >
        <div
          style={{
            width:          32,
            height:         32,
            borderRadius:   9,
            background:     T.accent,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            flexShrink:     0,
          }}
        >
          <Icon name="zap" size={15} color="#000" />
        </div>
        {!collapsed && (
          <span
            className="font-display"
            style={{ fontSize: 17, fontWeight: 800, color: T.text, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}
          >
            ViraLoop
          </span>
        )}
      </div>
    </div>

    {/* Nav */}
    <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 4 }}>
      {NAV_ITEMS.map(item => {
        const active = page === item.id
        return (
          <div
            key={item.id}
            title={collapsed ? item.label : undefined}
            onClick={() => setPage(item.id)}
            style={{
              display:      'flex',
              alignItems:   'center',
              gap:          10,
              padding:      '9px 12px',
              borderRadius: 8,
              cursor:       'pointer',
              transition:   'all 0.2s ease',
              color:        active ? T.accent : T.textMuted,
              fontSize:     13.5,
              fontWeight:   500,
              whiteSpace:   'nowrap',
              background:   active ? T.accentGlow : 'transparent',
              border:       `1px solid ${active ? 'rgba(245,158,11,0.2)' : 'transparent'}`,
            }}
            onMouseEnter={e => {
              if (!active) {
                const el = e.currentTarget as HTMLDivElement
                el.style.background = T.surfaceAlt
                el.style.color      = T.text
              }
            }}
            onMouseLeave={e => {
              if (!active) {
                const el = e.currentTarget as HTMLDivElement
                el.style.background = 'transparent'
                el.style.color      = T.textMuted
              }
            }}
          >
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <Icon name={item.icon} size={17} color={active ? T.accent : T.textMuted} />
              {item.id === 'notifications' && unreadCount > 0 && (
                <span
                  style={{
                    position:   'absolute',
                    top:        -4,
                    right:      -4,
                    width:      14,
                    height:     14,
                    background: T.red,
                    borderRadius: '50%',
                    fontSize:   8,
                    display:    'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color:      '#fff',
                    fontWeight: 700,
                    border:     `2px solid ${T.surface}`,
                  }}
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </div>
            {!collapsed && <span>{item.label}</span>}
          </div>
        )
      })}
    </nav>

    {/* User */}
    <div style={{ padding: '12px 8px', borderTop: `1px solid ${T.border}` }}>
      <div
        style={{
          display:    'flex',
          alignItems: 'center',
          gap:        10,
          padding:    8,
          borderRadius: 8,
          cursor:     'pointer',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = T.surfaceAlt }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}
      >
        <div
          style={{
            width:          28,
            height:         28,
            borderRadius:   '50%',
            background:     'linear-gradient(135deg,#f59e0b,#ec4899)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            fontSize:       12,
            fontWeight:     700,
            color:          '#fff',
            flexShrink:     0,
          }}
        >
          A
        </div>
        {!collapsed && (
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: T.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Admin User
            </div>
            <div style={{ fontSize: 11, color: T.textMuted }}>Super Admin</div>
          </div>
        )}
      </div>
    </div>
  </aside>
)
