import React, { useState } from 'react'
import { T, PLATFORM_COLORS } from '@/utils/tokens'
import { Badge, Button, Card, Icon, Input, SectionHeader } from '@/components/ui'

const TABS = ['profile', 'platforms', 'api', 'notifications', 'team'] as const
type SettingsTab = typeof TABS[number]

const TAB_LABELS: Record<SettingsTab, string> = {
  profile:       'Profile',
  platforms:     'Platforms',
  api:           'API Keys',
  notifications: 'Notifications',
  team:          'Team',
}

const CONNECTED_PLATFORMS = [
  { name:'TikTok',     color:'#69C9D0',  connected: true,  handle:'@viraloop_tiktok', followers:'892K' },
  { name:'Instagram',  color:'#ec4899',  connected: true,  handle:'@viraloop',        followers:'441K' },
  { name:'YouTube',    color:'#ef4444',  connected: true,  handle:'ViraLoop',         followers:'128K' },
  { name:'Facebook',   color:'#1877F2',  connected: false, handle:'—',                followers:'—'    },
  { name:'Twitter/X',  color:'#1DA1F2',  connected: true,  handle:'@viraloop_x',      followers:'87K'  },
]

const API_KEYS = [
  { label:'Late API Key',        val:'lk_live_••••••••••••••••xK9p', desc:'Used for social media automation via Late API' },
  { label:'Late Webhook URL',    val:'https://api.viraloop.io/webhooks/late', desc:'Receives posting confirmation events' },
  { label:'AI Generation API',   val:'vg_••••••••••••••••••••4Rm2', desc:'Powers the AI Studio video generation' },
]

const NOTIF_PREFS = [
  { title:'Video published successfully', desc:'Publishing confirmations',      on: true  },
  { title:'New video submission',         desc:'When creators submit videos',   on: true  },
  { title:'Analytics milestone reached',  desc:'Views & follower thresholds',   on: false },
  { title:'Scheduled post delayed',       desc:'Posting delayed >5 minutes',    on: true  },
  { title:'AI video generation complete', desc:'When AI videos are ready',      on: true  },
  { title:'Weekly performance report',    desc:'Every Monday morning summary',  on: false },
]

const TEAM = [
  { name:'Admin User',      email:'admin@viraloop.io',  role:'Super Admin',      hue:30  },
  { name:'Sarah Chen',      email:'sarah@viraloop.io',  role:'Content Manager',  hue:110 },
  { name:'Marcus Webb',     email:'marcus@viraloop.io', role:'Analytics Lead',   hue:200 },
  { name:'Aisha Okonkwo',   email:'aisha@viraloop.io',  role:'Video Editor',     hue:280 },
]

export const SettingsPage: React.FC = () => {
  const [tab,   setTab]   = useState<SettingsTab>('profile')
  const [saved, setSaved] = useState(false)

  const save = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ padding: 28 }}>
      <SectionHeader title="Settings" subtitle="Manage your account and platform preferences"/>

      <div style={{ display:'grid',gridTemplateColumns:'200px 1fr',gap:20 }}>
        {/* Tab nav */}
        <Card style={{ padding:8,height:'fit-content' }}>
          <nav style={{ display:'flex',flexDirection:'column',gap:2 }}>
            {TABS.map(t => (
              <div
                key={t}
                onClick={() => setTab(t)}
                style={{
                  display:'flex',alignItems:'center',gap:10,
                  padding:'9px 12px',borderRadius:8,cursor:'pointer',
                  background: tab===t ? T.accentGlow : 'transparent',
                  color:      tab===t ? T.accent : T.textMuted,
                  border:     `1px solid ${tab===t ? 'rgba(245,158,11,0.2)' : 'transparent'}`,
                  fontSize:13.5,fontWeight:500,transition:'all 0.2s ease',
                }}
                onMouseEnter={e => { if(tab!==t){ const el=e.currentTarget as HTMLDivElement; el.style.background=T.surfaceAlt; el.style.color=T.text }}}
                onMouseLeave={e => { if(tab!==t){ const el=e.currentTarget as HTMLDivElement; el.style.background='transparent'; el.style.color=T.textMuted }}}
              >
                {TAB_LABELS[t]}
              </div>
            ))}
          </nav>
        </Card>

        {/* Content */}
        <div style={{ animation:'fadeIn 0.25s ease both' }} key={tab}>
          {tab === 'profile' && (
            <Card>
              <h3 className="font-display" style={{ fontSize:16,fontWeight:700,color:T.text,marginBottom:20 }}>Profile Settings</h3>
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20 }}>
                <Input label="First Name" defaultValue="Admin"/>
                <Input label="Last Name"  defaultValue="User"/>
                <Input label="Email"      defaultValue="admin@viraloop.io" type="email"/>
                <Input label="Company"    defaultValue="ViraLoop Inc"/>
                <Input label="Role"       defaultValue="Super Admin"/>
                <Input label="Timezone"   defaultValue="UTC+0"/>
              </div>
              <Button variant="accent" onClick={save}>
                {saved ? <><Icon name="check" size={13} color="#000"/>Saved!</> : 'Save Changes'}
              </Button>
            </Card>
          )}

          {tab === 'platforms' && (
            <Card>
              <h3 className="font-display" style={{ fontSize:16,fontWeight:700,color:T.text,marginBottom:20 }}>Connected Platforms</h3>
              <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
                {CONNECTED_PLATFORMS.map(p => (
                  <div key={p.name} style={{
                    display:'flex',alignItems:'center',gap:16,
                    padding:'16px 18px',background:T.surfaceAlt,
                    borderRadius:10,border:`1px solid ${T.border}`,
                  }}>
                    <div style={{ width:10,height:10,borderRadius:'50%',background:p.color,flexShrink:0 }}/>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13.5,fontWeight:600,color:T.text }}>{p.name}</div>
                      <div style={{ fontSize:11.5,color:T.textMuted,fontFamily:"'JetBrains Mono',monospace" }}>
                        {p.handle} · {p.followers} followers
                      </div>
                    </div>
                    <Badge variant={p.connected ? 'success' : 'default'}>
                      {p.connected ? 'Connected' : 'Disconnected'}
                    </Badge>
                    <Button variant={p.connected ? 'ghost' : 'accent'} size="sm">
                      {p.connected ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {tab === 'api' && (
            <Card>
              <h3 className="font-display" style={{ fontSize:16,fontWeight:700,color:T.text,marginBottom:20 }}>API Configuration</h3>
              <div style={{ display:'flex',flexDirection:'column',gap:18 }}>
                {API_KEYS.map(k => (
                  <div key={k.label}>
                    <div style={{ fontSize:11,fontWeight:600,color:T.textMuted,marginBottom:4,textTransform:'uppercase',letterSpacing:'0.06em' }}>{k.label}</div>
                    <div style={{ fontSize:11,color:T.textMuted,marginBottom:6 }}>{k.desc}</div>
                    <div style={{ display:'flex',gap:8 }}>
                      <input
                        defaultValue={k.val}
                        readOnly
                        style={{
                          flex:1,background:T.surfaceAlt,border:`1px solid ${T.border}`,color:T.text,
                          padding:'9px 14px',borderRadius:8,fontFamily:"'JetBrains Mono',monospace",
                          fontSize:12,outline:'none',
                        }}
                      />
                      <Button variant="ghost" size="sm"><Icon name="copy" size={12}/>Copy</Button>
                      <Button variant="ghost" size="sm"><Icon name="refresh" size={12}/>Rotate</Button>
                    </div>
                  </div>
                ))}

                <div style={{ padding:14,background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:8,fontSize:12,color:T.accent }}>
                  ⚠️ API keys are encrypted at rest. Never share your live keys publicly.{' '}
                  <span style={{ textDecoration:'underline',cursor:'pointer' }}>Late API docs →</span>
                </div>
              </div>
            </Card>
          )}

          {tab === 'notifications' && (
            <Card>
              <h3 className="font-display" style={{ fontSize:16,fontWeight:700,color:T.text,marginBottom:20 }}>Notification Preferences</h3>
              <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
                {NOTIF_PREFS.map((item, i) => (
                  <div key={i} style={{
                    display:'flex',justifyContent:'space-between',alignItems:'center',
                    padding:'12px 14px',background:T.surfaceAlt,borderRadius:8,border:`1px solid ${T.border}`,
                  }}>
                    <div>
                      <div style={{ fontSize:13,fontWeight:600,color:T.text,marginBottom:2 }}>{item.title}</div>
                      <div style={{ fontSize:11.5,color:T.textMuted }}>{item.desc}</div>
                    </div>
                    <div style={{
                      width:40,height:22,borderRadius:11,
                      background: item.on ? T.accent : 'rgba(255,255,255,0.1)',
                      cursor:'pointer',position:'relative',transition:'background 0.2s',flexShrink:0,
                    }}>
                      <div style={{
                        width:16,height:16,borderRadius:'50%',background:'#fff',
                        position:'absolute',top:3,left:item.on?21:3,
                        transition:'left 0.2s ease',boxShadow:'0 1px 4px rgba(0,0,0,0.3)',
                      }}/>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {tab === 'team' && (
            <Card>
              <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20 }}>
                <h3 className="font-display" style={{ fontSize:16,fontWeight:700,color:T.text }}>Team Members</h3>
                <Button variant="accent" size="sm">
                  <Icon name="plus" size={12} color="#000"/> Invite Member
                </Button>
              </div>
              <div style={{ display:'flex',flexDirection:'column',gap:10 }}>
                {TEAM.map((m, i) => (
                  <div key={i} style={{
                    display:'flex',alignItems:'center',gap:14,padding:'12px 16px',
                    background:T.surfaceAlt,borderRadius:10,border:`1px solid ${T.border}`,
                  }}>
                    <div style={{
                      width:36,height:36,borderRadius:'50%',
                      background:`hsl(${m.hue},60%,40%)`,
                      display:'flex',alignItems:'center',justifyContent:'center',
                      fontSize:14,fontWeight:700,color:'#fff',flexShrink:0,
                    }}>
                      {m.name[0]}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13,fontWeight:600,color:T.text }}>{m.name}</div>
                      <div style={{ fontSize:11.5,color:T.textMuted }}>{m.email}</div>
                    </div>
                    <Badge variant={m.role==='Super Admin' ? 'warning' : 'default'}>{m.role}</Badge>
                    <Button variant="ghost" size="sm">
                      <Icon name="edit" size={12}/>
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
