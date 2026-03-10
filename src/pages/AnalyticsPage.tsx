import React, { useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend,
} from 'recharts'
import { T, PLATFORM_COLORS } from '@/utils/tokens'
import { fmt } from '@/utils/format'
import { Badge, Card, CustomTooltip, SectionHeader } from '@/components/ui'
import { platformData, reachData, radarData, engagementData } from '@/services/mockData'

const ALL_PLATFORMS = ['all', 'Instagram', 'TikTok', 'YouTube', 'Facebook', 'Twitter'] as const
type PlatformFilter = typeof ALL_PLATFORMS[number]

export const AnalyticsPage: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<PlatformFilter>('all')
  const totalViews = platformData.reduce((s, p) => s + p.views, 0)

  const engVariant = (e: number): 'success' | 'warning' | 'default' =>
    e > 10 ? 'success' : e > 5 ? 'warning' : 'default'

  return (
    <div style={{ padding: 28 }}>
      {/* Platform tab strip */}
      <div style={{ display:'flex',gap:8,marginBottom:24,flexWrap:'wrap' }}>
        {ALL_PLATFORMS.map(p => (
          <button
            key={p}
            onClick={() => setActivePlatform(p)}
            style={{
              padding:      '6px 14px',
              borderRadius: 6,
              fontSize:     12.5,
              fontWeight:   500,
              cursor:       'pointer',
              border:       `1px solid ${activePlatform===p ? 'rgba(245,158,11,0.25)' : 'transparent'}`,
              background:   activePlatform===p ? T.accentGlow : 'transparent',
              color:        activePlatform===p ? T.accent : T.textMuted,
              fontFamily:   "'DM Sans',sans-serif",
              transition:   'all 0.2s ease',
            }}
          >
            {p === 'all' ? 'All Platforms' : p}
          </button>
        ))}
      </div>

      {/* Platform metric cards */}
      <div style={{ display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:12,marginBottom:24 }}>
        {platformData.map(p => (
          <Card
            key={p.platform}
            hoverable
            onClick={() => setActivePlatform(p.platform as PlatformFilter)}
            style={{
              padding:     16,
              cursor:      'pointer',
              borderColor: activePlatform===p.platform ? `${p.color}60` : T.border,
            }}
          >
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10 }}>
              <span style={{ fontSize:12,fontWeight:600,color: activePlatform===p.platform ? p.color : T.textMuted }}>{p.platform}</span>
              <span style={{ fontSize:10,color:T.textMuted,fontFamily:"'JetBrains Mono',monospace" }}>{p.engagement}%</span>
            </div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:20,fontWeight:700,color:T.text }}>{fmt(p.views)}</div>
            <div style={{ fontSize:11,color:T.textMuted,marginTop:2 }}>views</div>
            <div style={{ height:3,background:T.surfaceAlt,borderRadius:2,overflow:'hidden',marginTop:10 }}>
              <div style={{ height:'100%',borderRadius:2,background:p.color,width:`${p.engagement * 5}%`,transition:'width 0.6s ease' }}/>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display:'grid',gridTemplateColumns:'3fr 2fr',gap:16,marginBottom:16 }}>
        <Card>
          <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20 }}>
            <div>
              <h3 className="font-display" style={{ fontSize:14,fontWeight:700,color:T.text }}>Reach Growth</h3>
              <p style={{ fontSize:11.5,color:T.textMuted,marginTop:2 }}>
                {activePlatform==='all' ? 'All platforms' : activePlatform} — monthly views
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={reachData} margin={{ top:5,right:5,left:-20,bottom:0 }}>
              <defs>
                {Object.entries(PLATFORM_COLORS).filter(([k])=>!k.includes(' ')).slice(0,5).map(([k,c]) => (
                  <linearGradient key={k} id={`ag-${k}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={c} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={c} stopOpacity={0}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false}/>
              <XAxis dataKey="month" tick={{ fill:T.textMuted,fontSize:11,fontFamily:"'JetBrains Mono',monospace" }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill:T.textMuted,fontSize:10 }} axisLine={false} tickLine={false} tickFormatter={v=>fmt(v)}/>
              <Tooltip content={<CustomTooltip/>}/>
              {activePlatform === 'all' ? (
                ['tiktok','instagram','youtube','facebook','twitter'].map(k => (
                  <Area key={k} type="monotone" dataKey={k}
                    stroke={PLATFORM_COLORS[k]} fill={`url(#ag-${k})`}
                    strokeWidth={1.5} dot={false}
                  />
                ))
              ) : (
                <Area
                  type="monotone"
                  dataKey={activePlatform.toLowerCase()}
                  stroke={PLATFORM_COLORS[activePlatform]}
                  fill={`url(#ag-${activePlatform.toLowerCase()})`}
                  strokeWidth={2.5}
                  dot={false}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="font-display" style={{ fontSize:14,fontWeight:700,color:T.text,marginBottom:16 }}>Platform Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid stroke={T.border}/>
              <PolarAngleAxis dataKey="metric" tick={{ fill:T.textMuted,fontSize:11 }}/>
              <PolarRadiusAxis tick={false} axisLine={false}/>
              <Radar name="TikTok"    dataKey="tiktok"    stroke="#69C9D0" fill="#69C9D0" fillOpacity={0.15} strokeWidth={2}/>
              <Radar name="Instagram" dataKey="instagram" stroke={T.pink}  fill={T.pink}  fillOpacity={0.1}  strokeWidth={2}/>
              <Radar name="YouTube"   dataKey="youtube"   stroke={T.red}   fill={T.red}   fillOpacity={0.1}  strokeWidth={1.5}/>
              <Legend wrapperStyle={{ fontSize:11,fontFamily:"'JetBrains Mono',monospace",paddingTop:8 }}/>
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Detailed metrics table */}
      <Card padding={0} style={{ overflow:'hidden' }}>
        <div style={{ padding:'16px 20px',borderBottom:`1px solid ${T.border}`,display:'flex',justifyContent:'space-between',alignItems:'center' }}>
          <h3 className="font-display" style={{ fontSize:14,fontWeight:700,color:T.text }}>Detailed Metrics</h3>
        </div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%',borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:T.surfaceAlt }}>
                {['Platform','Views','Likes','Shares','Comments','Engagement'].map(h => (
                  <th key={h} style={{
                    padding:        '10px 16px',
                    textAlign:      h==='Platform' ? 'left' : 'right',
                    fontSize:       11,
                    fontWeight:     600,
                    color:          T.textMuted,
                    textTransform:  'uppercase',
                    letterSpacing:  '0.06em',
                    borderBottom:   `1px solid ${T.border}`,
                    whiteSpace:     'nowrap',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {platformData.map(p => (
                <tr
                  key={p.platform}
                  style={{ borderBottom:`1px solid ${T.border}`, transition:'background 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.background = T.surfaceAlt }}
                  onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = 'transparent' }}
                >
                  <td style={{ padding:'12px 16px',display:'flex',alignItems:'center',gap:10 }}>
                    <div style={{ width:8,height:8,borderRadius:'50%',background:p.color }}/>
                    <span style={{ fontSize:13,fontWeight:600,color:T.text }}>{p.platform}</span>
                  </td>
                  {[p.views, p.likes, p.shares, p.comments].map((v, j) => (
                    <td key={j} style={{ padding:'12px 16px',textAlign:'right',fontSize:12.5,fontFamily:"'JetBrains Mono',monospace",color:T.text }}>
                      {fmt(v)}
                    </td>
                  ))}
                  <td style={{ padding:'12px 16px',textAlign:'right' }}>
                    <Badge variant={engVariant(p.engagement)}>{p.engagement}%</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
