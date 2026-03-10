import React from 'react'
import {
  AreaChart, Area, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { T, PLATFORM_COLORS } from '@/utils/tokens'
import { fmt } from '@/utils/format'
import { KpiCard, Card, Badge, CustomTooltip } from '@/components/ui'
import { platformData, reachData, engagementData, scheduledPosts, notifications } from '@/services/mockData'

export const DashboardPage: React.FC = () => {
  const totalReach = platformData.reduce((s, p) => s + p.views, 0)

  return (
    <div style={{ padding: 28 }}>
      {/* KPIs */}
      <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:28 }}>
        <KpiCard label="Total Published Videos"   value="1,847"        change="12.4%" changeType="up"   icon="film"      color={T.accent}  delay={0}   />
        <KpiCard label="Total Reach This Month"   value={fmt(totalReach)} change="23.1%" changeType="up" icon="eye"       color={T.green}   delay={60}  />
        <KpiCard label="Avg. Engagement Rate"     value="8.7%"         change="2.3%"  changeType="up"   icon="zap"       color={T.purple}  delay={120} />
        <KpiCard label="Scheduled Posts"          value="34"           change="4"     changeType="up"   icon="scheduler" color={T.blue}    delay={180} />
      </div>

      {/* Charts row */}
      <div style={{ display:'grid',gridTemplateColumns:'2fr 1fr',gap:16,marginBottom:28 }}>
        {/* Reach area chart */}
        <Card>
          <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20 }}>
            <div>
              <h3 className="font-display" style={{ fontSize:14,fontWeight:700,color:T.text }}>Platform Reach</h3>
              <p style={{ fontSize:11.5,color:T.textMuted,marginTop:2 }}>Monthly views across all platforms</p>
            </div>
            <Badge variant="success">+23.1% this month</Badge>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={reachData} margin={{ top:5,right:5,left:-20,bottom:0 }}>
              <defs>
                {[['tiktok','#69C9D0'],['instagram',T.pink],['youtube',T.red]].map(([k,c]) => (
                  <linearGradient key={k} id={`dash-${k}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={c} stopOpacity={0.25}/>
                    <stop offset="95%" stopColor={c} stopOpacity={0}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false}/>
              <XAxis dataKey="month" tick={{ fill:T.textMuted,fontSize:11,fontFamily:"'JetBrains Mono',monospace" }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill:T.textMuted,fontSize:10,fontFamily:"'JetBrains Mono',monospace" }} axisLine={false} tickLine={false} tickFormatter={v=>fmt(v)}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Area type="monotone" dataKey="tiktok"    stroke="#69C9D0" fill="url(#dash-tiktok)"    strokeWidth={2} dot={false}/>
              <Area type="monotone" dataKey="instagram" stroke={T.pink}  fill="url(#dash-instagram)" strokeWidth={2} dot={false}/>
              <Area type="monotone" dataKey="youtube"   stroke={T.red}   fill="url(#dash-youtube)"   strokeWidth={2} dot={false}/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Platform breakdown */}
        <Card>
          <h3 className="font-display" style={{ fontSize:14,fontWeight:700,color:T.text,marginBottom:20 }}>Platform Breakdown</h3>
          <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
            {platformData.map(p => (
              <div key={p.platform}>
                <div style={{ display:'flex',justifyContent:'space-between',marginBottom:6 }}>
                  <span style={{ fontSize:12.5,color:T.text,fontWeight:500 }}>{p.platform}</span>
                  <span style={{ fontSize:12,color:T.textMuted,fontFamily:"'JetBrains Mono',monospace" }}>{fmt(p.views)}</span>
                </div>
                <div style={{ height:4,background:T.surfaceAlt,borderRadius:2,overflow:'hidden' }}>
                  <div style={{
                    height:     '100%',
                    borderRadius: 2,
                    background: p.color,
                    width:      `${(p.views / (totalReach * 1.1)) * 100}%`,
                    transition: 'width 0.8s ease',
                  }}/>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom row */}
      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16 }}>
        {/* Engagement */}
        <Card>
          <h3 className="font-display" style={{ fontSize:14,fontWeight:700,color:T.text,marginBottom:4 }}>Engagement Rate</h3>
          <p style={{ fontSize:11.5,color:T.textMuted,marginBottom:16 }}>Last 30 days</p>
          <ResponsiveContainer width="100%" height={130}>
            <LineChart data={engagementData.slice(-14)} margin={{ top:5,right:5,left:-30,bottom:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false}/>
              <XAxis dataKey="day" tick={{ fill:T.textMuted,fontSize:10 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill:T.textMuted,fontSize:10 }} axisLine={false} tickLine={false}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Line type="monotone" dataKey="rate" stroke={T.accent} strokeWidth={2} dot={false}/>
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Upcoming posts */}
        <Card>
          <h3 className="font-display" style={{ fontSize:14,fontWeight:700,color:T.text,marginBottom:14 }}>Upcoming Posts</h3>
          <div style={{ display:'flex',flexDirection:'column',gap:10 }}>
            {scheduledPosts.slice(0, 4).map(s => (
              <div key={s.id} style={{
                display:     'flex',
                alignItems:  'center',
                gap:         10,
                padding:     '8px 10px',
                background:  T.surfaceAlt,
                borderRadius: 8,
                border:      `1px solid ${T.border}`,
              }}>
                <div style={{ width:4,height:32,borderRadius:2,background:s.color,flexShrink:0 }}/>
                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ fontSize:12,fontWeight:600,color:T.text,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{s.title}</div>
                  <div style={{ fontSize:10.5,color:T.textMuted,fontFamily:"'JetBrains Mono',monospace" }}>{s.platform} · {s.date} {s.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Activity */}
        <Card>
          <h3 className="font-display" style={{ fontSize:14,fontWeight:700,color:T.text,marginBottom:14 }}>Recent Activity</h3>
          <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
            {notifications.slice(0, 4).map(n => (
              <div key={n.id} style={{ display:'flex',gap:10,alignItems:'flex-start' }}>
                <span style={{ fontSize:16,marginTop:1 }}>{n.icon}</span>
                <div>
                  <div style={{ fontSize:12,fontWeight:600,color:T.text,lineHeight:1.3 }}>{n.title}</div>
                  <div style={{ fontSize:10.5,color:T.textMuted,fontFamily:"'JetBrains Mono',monospace",marginTop:2 }}>{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
