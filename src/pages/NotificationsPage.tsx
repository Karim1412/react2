import React, { useState } from 'react'
import { T } from '@/utils/tokens'
import { Badge, Button, Card, SectionHeader } from '@/components/ui'
import { useAppStore } from '@/store/useAppStore'
import type { NotificationType } from '@/types'

const FILTERS = ['all', 'unread', 'success', 'info', 'warning'] as const
type Filter = typeof FILTERS[number]

const TYPE_VARIANT: Record<NotificationType, 'success'|'warning'|'info'|'error'> = {
  success: 'success',
  warning: 'warning',
  info:    'info',
  error:   'error',
}

export const NotificationsPage: React.FC = () => {
  const { notifications, unreadCount, markRead, markAllRead } = useAppStore()
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = filter === 'all'    ? notifications
    : filter === 'unread' ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === filter)

  return (
    <div style={{ padding: 28 }}>
      <SectionHeader
        title="Notification Center"
        subtitle={`${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`}
        actions={
          <Button variant="ghost" size="sm" onClick={markAllRead}>
            Mark all as read
          </Button>
        }
      />

      {/* Filter tabs */}
      <div style={{ display:'flex',gap:8,marginBottom:20 }}>
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding:'6px 14px',borderRadius:6,fontSize:12.5,cursor:'pointer',fontFamily:"'DM Sans',sans-serif",
              background: filter===f ? T.accentGlow : 'transparent',
              color:      filter===f ? T.accent : T.textMuted,
              border:     `1px solid ${filter===f ? 'rgba(245,158,11,0.25)' : 'transparent'}`,
              textTransform:'capitalize',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Summary cards */}
      <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:24 }}>
        {[
          { label:'Total',     val: notifications.length,                              color: T.text   },
          { label:'Unread',    val: notifications.filter(n=>!n.read).length,           color: T.accent },
          { label:'Successes', val: notifications.filter(n=>n.type==='success').length,color: T.green  },
          { label:'Warnings',  val: notifications.filter(n=>n.type==='warning').length,color: T.red    },
        ].map(s => (
          <Card key={s.label} style={{ padding:'14px 18px',display:'flex',justifyContent:'space-between',alignItems:'center' }}>
            <span style={{ fontSize:12,color:T.textMuted }}>{s.label}</span>
            <span style={{ fontSize:20,fontWeight:700,color:s.color,fontFamily:"'JetBrains Mono',monospace" }}>{s.val}</span>
          </Card>
        ))}
      </div>

      {/* Notifications list */}
      <Card padding={0} style={{ overflow:'hidden' }}>
        {filtered.length === 0 ? (
          <div style={{ padding:40,textAlign:'center',color:T.textMuted,fontSize:13 }}>
            No notifications to show
          </div>
        ) : filtered.map(n => (
          <div
            key={n.id}
            style={{
              padding:      '14px 18px',
              borderBottom: `1px solid ${T.border}`,
              background:   n.read ? 'transparent' : 'rgba(245,158,11,0.02)',
              cursor:       'pointer',
              transition:   'background 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background=T.surfaceAlt }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background=n.read?'transparent':'rgba(245,158,11,0.02)' }}
          >
            <div style={{ display:'flex',gap:14,alignItems:'flex-start' }}>
              {/* Icon bubble */}
              <div style={{
                width:40,height:40,borderRadius:10,flexShrink:0,
                background: n.type==='success' ? 'rgba(16,185,129,0.12)'
                  : n.type==='warning' ? 'rgba(245,158,11,0.12)'
                  : 'rgba(59,130,246,0.12)',
                display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,
              }}>
                {n.icon}
              </div>

              <div style={{ flex:1 }}>
                <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:4 }}>
                  <span style={{ fontSize:13.5,fontWeight:n.read?500:700,color:T.text }}>{n.title}</span>
                  <div style={{ display:'flex',gap:8,alignItems:'center',flexShrink:0,marginLeft:12 }}>
                    <span style={{ fontSize:10.5,color:T.textMuted,fontFamily:"'JetBrains Mono',monospace" }}>{n.time}</span>
                    <Badge variant={TYPE_VARIANT[n.type]}>{n.type}</Badge>
                    {!n.read && (
                      <div style={{ width:7,height:7,borderRadius:'50%',background:T.accent,flexShrink:0 }}/>
                    )}
                  </div>
                </div>
                <p style={{ fontSize:12.5,color:T.textMuted,lineHeight:1.5 }}>{n.body}</p>
              </div>

              {!n.read && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => markRead(n.id)}
                  style={{ flexShrink:0 }}
                >
                  Mark read
                </Button>
              )}
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}
