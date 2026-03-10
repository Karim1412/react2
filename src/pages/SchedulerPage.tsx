import React, { useState } from 'react'
import { T, PLATFORM_COLORS } from '@/utils/tokens'
import { Badge, Button, Card, Icon, SectionHeader, Select } from '@/components/ui'
import { useScheduler } from '@/hooks/useScheduler'
import { videos } from '@/services/mockData'

const PLATFORMS = [
  { id:'tiktok',    label:'TikTok',    color:'#69C9D0' },
  { id:'instagram', label:'Instagram', color:'#ec4899' },
  { id:'youtube',   label:'YouTube',   color:'#ef4444' },
  { id:'facebook',  label:'Facebook',  color:'#1877F2' },
  { id:'twitter',   label:'Twitter',   color:'#1DA1F2' },
]

const DAYS_SHOWN = Array.from({ length: 21 }, (_, i) => i + 1) // March 1–21

// Build a simple March 2026 calendar (starts Sunday)
const WEEKDAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
// March 1 2026 = Sunday (day 0)
const CAL_DAYS = Array.from({ length: 35 }, (_, i) => {
  const day = i - 0 + 1 // offset 0, starts Sun
  return day >= 1 && day <= 31 ? day : null
})

const statusBadge = (s: string): 'success'|'warning'|'info'|'default' =>
  s==='scheduled' ? 'success' : s==='draft' ? 'warning' : s==='processing' ? 'info' : 'default'

export const SchedulerPage: React.FC = () => {
  const { posts, schedule, remove } = useScheduler()
  const [view,              setView]              = useState<'calendar'|'list'>('calendar')
  const [selectedVideo,     setSelectedVideo]     = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [selectedDate,      setSelectedDate]      = useState<number | null>(null)
  const [selectedTime,      setSelectedTime]      = useState('09:00')
  const [saving,            setSaving]            = useState(false)
  const [success,           setSuccess]           = useState(false)

  const togglePlatform = (p: string) =>
    setSelectedPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])

  const eventDays = new Set(posts.map(s => parseInt(s.date.split(' ')[1])))

  const handleSchedule = async () => {
    if (!selectedVideo || !selectedPlatforms.length || !selectedDate) return
    setSaving(true)
    await schedule({
      videoTitle: selectedVideo,
      platforms:  selectedPlatforms,
      date:       `Mar ${selectedDate}`,
      time:       selectedTime,
    })
    setSaving(false)
    setSuccess(true)
    setSelectedVideo('')
    setSelectedPlatforms([])
    setSelectedDate(null)
    setTimeout(() => setSuccess(false), 2500)
  }

  return (
    <div style={{ padding: 28 }}>
      <SectionHeader
        title="Content Scheduler"
        subtitle="Plan and schedule your video publishing across all platforms"
        actions={
          <div style={{ display:'flex',gap:6 }}>
            {(['calendar','list'] as const).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  padding:'6px 14px',borderRadius:6,fontSize:12.5,cursor:'pointer',fontFamily:"'DM Sans',sans-serif",
                  background: view===v ? T.accentGlow : 'transparent',
                  color:      view===v ? T.accent : T.textMuted,
                  border:     `1px solid ${view===v ? 'rgba(245,158,11,0.25)' : 'transparent'}`,
                }}
              >
                {v.charAt(0).toUpperCase()+v.slice(1)}
              </button>
            ))}
          </div>
        }
      />

      <div style={{ display:'grid',gridTemplateColumns:'320px 1fr',gap:20 }}>
        {/* Form */}
        <Card>
          <h3 className="font-display" style={{ fontSize:13,fontWeight:700,color:T.text,marginBottom:18 }}>Schedule New Post</h3>

          {success && (
            <div style={{ background:'rgba(16,185,129,0.1)',border:'1px solid rgba(16,185,129,0.25)',borderRadius:8,padding:'10px 14px',marginBottom:14,fontSize:12.5,color:T.green }}>
              ✓ Post scheduled successfully!
            </div>
          )}

          {/* Video select */}
          <div style={{ marginBottom:14 }}>
            <Select label="Select Video" value={selectedVideo} onChange={e => setSelectedVideo(e.target.value)}>
              <option value="">Choose a video...</option>
              {videos.map(v => (
                <option key={v.id} value={v.title}>{v.title.slice(0,38)}</option>
              ))}
            </Select>
          </div>

          {/* Platforms */}
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11,fontWeight:600,color:T.textMuted,marginBottom:8,textTransform:'uppercase',letterSpacing:'0.06em' }}>Platforms</div>
            <div style={{ display:'flex',flexWrap:'wrap',gap:6 }}>
              {PLATFORMS.map(p => (
                <div
                  key={p.id}
                  onClick={() => togglePlatform(p.id)}
                  style={{
                    display:     'inline-flex',
                    alignItems:  'center',
                    gap:         5,
                    padding:     '5px 10px',
                    borderRadius: 20,
                    fontSize:    11,
                    fontWeight:  600,
                    cursor:      'pointer',
                    border:      `1px solid ${selectedPlatforms.includes(p.id) ? `${p.color}50` : T.border}`,
                    background:  selectedPlatforms.includes(p.id) ? `${p.color}18` : 'transparent',
                    color:       selectedPlatforms.includes(p.id) ? p.color : T.textMuted,
                    transition:  'all 0.15s ease',
                  }}
                >
                  {selectedPlatforms.includes(p.id) && <Icon name="check" size={10} color={p.color}/>}
                  {p.label}
                </div>
              ))}
            </div>
          </div>

          {/* Date picker */}
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11,fontWeight:600,color:T.textMuted,marginBottom:8,textTransform:'uppercase',letterSpacing:'0.06em' }}>Date</div>
            <div style={{ display:'flex',flexWrap:'wrap',gap:4 }}>
              {Array.from({length:10},(_,i)=>i+10).map(d => (
                <div
                  key={d}
                  onClick={() => setSelectedDate(d)}
                  style={{
                    width:34,height:34,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',
                    fontSize:12.5,cursor:'pointer',fontWeight:selectedDate===d?700:400,
                    background: selectedDate===d ? T.accent : T.surfaceAlt,
                    color:      selectedDate===d ? '#000' : T.text,
                    border:     `1px solid ${selectedDate===d ? T.accent : T.border}`,
                    transition: 'all 0.15s ease',
                  }}
                >
                  {d}
                </div>
              ))}
            </div>
          </div>

          {/* Time */}
          <div style={{ marginBottom:18 }}>
            <div style={{ fontSize:11,fontWeight:600,color:T.textMuted,marginBottom:8,textTransform:'uppercase',letterSpacing:'0.06em' }}>Time</div>
            <input
              type="time"
              value={selectedTime}
              onChange={e => setSelectedTime(e.target.value)}
              style={{
                background:'#16161f',border:`1px solid ${T.border}`,color:T.text,
                padding:'10px 14px',borderRadius:8,fontFamily:"'DM Sans',sans-serif",
                fontSize:14,outline:'none',width:'100%',
              }}
            />
          </div>

          <Button
            variant="accent"
            onClick={handleSchedule}
            loading={saving}
            disabled={!selectedVideo || !selectedPlatforms.length || !selectedDate}
            style={{ width:'100%',justifyContent:'center' }}
          >
            <Icon name="clock" size={14} color="#000"/> Schedule Post
          </Button>
        </Card>

        {/* Calendar / List */}
        {view === 'calendar' ? (
          <Card>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20 }}>
              <h3 className="font-display" style={{ fontSize:15,fontWeight:700,color:T.text }}>March 2026</h3>
              <div style={{ display:'flex',gap:8 }}>
                <Button variant="ghost" size="sm">← Prev</Button>
                <Button variant="ghost" size="sm">Next →</Button>
              </div>
            </div>

            {/* Weekday headers */}
            <div style={{ display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:4,marginBottom:8 }}>
              {WEEKDAYS.map(d => (
                <div key={d} style={{ textAlign:'center',fontSize:10.5,fontWeight:600,color:T.textMuted,padding:'4px 0',fontFamily:"'JetBrains Mono',monospace" }}>{d}</div>
              ))}
            </div>

            {/* Days grid */}
            <div style={{ display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:4 }}>
              {CAL_DAYS.map((d, i) => {
                const isToday   = d === 10
                const hasEvent  = d !== null && eventDays.has(d)
                const isSelected= d === selectedDate
                return (
                  <div
                    key={i}
                    onClick={() => d && setSelectedDate(d)}
                    style={{
                      aspectRatio:    '1',
                      display:        'flex',
                      flexDirection:  'column',
                      alignItems:     'center',
                      justifyContent: 'center',
                      borderRadius:   8,
                      cursor:         d ? 'pointer' : 'default',
                      fontSize:       13,
                      position:       'relative',
                      background:     isSelected ? T.accentGlow : isToday ? 'rgba(245,158,11,0.08)' : 'transparent',
                      color:          d ? (isToday ? T.accent : T.text) : T.textDim,
                      border:         `1px solid ${isSelected ? 'rgba(245,158,11,0.3)' : 'transparent'}`,
                      fontWeight:     isToday ? 700 : 400,
                      opacity:        d ? 1 : 0.2,
                      transition:     'all 0.15s ease',
                    }}
                    onMouseEnter={e => { if(d&&!isSelected) (e.currentTarget as HTMLDivElement).style.background=T.surfaceAlt }}
                    onMouseLeave={e => { if(d&&!isSelected) (e.currentTarget as HTMLDivElement).style.background=isToday?'rgba(245,158,11,0.08)':'transparent' }}
                  >
                    {d ?? ''}
                    {hasEvent && (
                      <div style={{ position:'absolute',bottom:4,width:4,height:4,borderRadius:'50%',background:T.accent }}/>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Events for selected day */}
            {selectedDate && (
              <div style={{ marginTop:20,paddingTop:16,borderTop:`1px solid ${T.border}` }}>
                <div style={{ fontSize:11,fontWeight:600,color:T.textMuted,marginBottom:10,fontFamily:"'JetBrains Mono',monospace",textTransform:'uppercase',letterSpacing:'0.06em' }}>
                  Posts on Mar {selectedDate}
                </div>
                <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
                  {posts.filter(s => s.date === `Mar ${selectedDate}`).length === 0 ? (
                    <div style={{ fontSize:12,color:T.textMuted,padding:'12px 0' }}>No posts scheduled for this day.</div>
                  ) : posts.filter(s => s.date === `Mar ${selectedDate}`).map(s => (
                    <div key={s.id} style={{ display:'flex',alignItems:'center',gap:12,padding:'8px 12px',background:T.surfaceAlt,borderRadius:8,border:`1px solid ${T.border}` }}>
                      <div style={{ width:4,height:28,borderRadius:2,background:s.color }}/>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:12.5,fontWeight:600,color:T.text }}>{s.title}</div>
                        <div style={{ fontSize:10.5,color:T.textMuted,fontFamily:"'JetBrains Mono',monospace" }}>{s.platform} · {s.time}</div>
                      </div>
                      <Badge variant={statusBadge(s.status)}>{s.status}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ) : (
          <Card padding={0} style={{ overflow:'hidden' }}>
            <div style={{ padding:'16px 20px',borderBottom:`1px solid ${T.border}`,display:'flex',justifyContent:'space-between',alignItems:'center' }}>
              <h3 className="font-display" style={{ fontSize:14,fontWeight:700,color:T.text }}>All Scheduled Posts</h3>
              <span style={{ fontSize:12,color:T.textMuted,fontFamily:"'JetBrains Mono',monospace" }}>{posts.length} total</span>
            </div>
            {posts.map(s => (
              <div
                key={s.id}
                style={{ display:'flex',alignItems:'center',gap:16,padding:'14px 20px',borderBottom:`1px solid ${T.border}`,transition:'background 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background=T.surfaceAlt }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background='transparent' }}
              >
                <div style={{ width:4,height:40,borderRadius:2,background:s.color,flexShrink:0 }}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13.5,fontWeight:600,color:T.text,marginBottom:3 }}>{s.title}</div>
                  <div style={{ fontSize:11.5,color:T.textMuted,fontFamily:"'JetBrains Mono',monospace" }}>
                    {s.platform} · {s.date} at {s.time}
                  </div>
                </div>
                <Badge variant={statusBadge(s.status)}>{s.status}</Badge>
                <Button variant="ghost" size="sm"><Icon name="edit" size={12}/>Edit</Button>
                <Button variant="danger" size="sm" onClick={() => remove(s.id)}>
                  <Icon name="trash" size={12} color={T.red}/>
                </Button>
              </div>
            ))}
          </Card>
        )}
      </div>
    </div>
  )
}
