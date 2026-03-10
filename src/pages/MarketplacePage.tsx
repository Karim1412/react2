import React, { useState } from 'react'
import { T } from '@/utils/tokens'
import { Badge, Button, Card, Icon, Input, SectionHeader } from '@/components/ui'
import { useVideos } from '@/hooks/useVideos'
import type { Video, VideoStatus } from '@/types'

const CATEGORIES = ['all', 'Animals', 'Comedy', 'Kids', 'Tech', 'Sports']

const ScoreBar: React.FC<{ score: number }> = ({ score }) => {
  const color = score > 80 ? T.green : score > 60 ? T.accent : T.red
  return (
    <div style={{ display:'flex',alignItems:'center',gap:8,marginBottom:12 }}>
      <span style={{ fontSize:11,color:T.textMuted,whiteSpace:'nowrap' }}>Engagement Score</span>
      <div style={{ flex:1,height:3,background:T.surfaceAlt,borderRadius:2,overflow:'hidden' }}>
        <div style={{ height:'100%',width:`${score}%`,background:color,borderRadius:2,transition:'width 0.6s ease' }}/>
      </div>
      <span style={{ fontSize:11,fontWeight:700,color,fontFamily:"'JetBrains Mono',monospace" }}>{score}</span>
    </div>
  )
}

interface VideoCardProps {
  video:   Video
  status:  VideoStatus | undefined
  onView:  (v: Video) => void
  onAccept:(id: string) => void
  onReject:(id: string) => void
  delay:   number
}

const VideoCard: React.FC<VideoCardProps> = ({ video, status, onView, onAccept, onReject, delay }) => (
  <div
    style={{
      background:   T.surface,
      border:       `1px solid ${T.border}`,
      borderRadius: 12,
      overflow:     'hidden',
      transition:   'all 0.2s ease',
      opacity:      status ? 0.75 : 1,
      animation:    `fadeIn 0.35s ease ${delay}ms both`,
    }}
    onMouseEnter={e => {
      if (!status) {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = T.borderHover
        el.style.transform   = 'translateY(-2px)'
        el.style.boxShadow   = '0 8px 32px rgba(0,0,0,0.4)'
      }
    }}
    onMouseLeave={e => {
      const el = e.currentTarget as HTMLDivElement
      el.style.borderColor = T.border
      el.style.transform   = ''
      el.style.boxShadow   = ''
    }}
  >
    {/* Thumbnail */}
    <div
      onClick={() => onView(video)}
      style={{
        height:         150,
        background:     `linear-gradient(135deg,${video.thumbnail},${video.thumbnail}88)`,
        position:       'relative',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        cursor:         'pointer',
      }}
    >
      <div style={{
        width:          42,height:42,borderRadius:'50%',
        background:     'rgba(0,0,0,0.5)',backdropFilter:'blur(8px)',
        display:        'flex',alignItems:'center',justifyContent:'center',
        border:         '1px solid rgba(255,255,255,0.2)',
      }}>
        <Icon name="play" size={16} color="#fff"/>
      </div>

      <div style={{ position:'absolute',top:10,right:10 }}>
        <Badge variant={
          status === 'accepted' ? 'success'
          : status === 'rejected' ? 'error'
          : video.status === 'reviewing' ? 'info'
          : 'warning'
        }>
          {status ?? video.status}
        </Badge>
      </div>
      <div style={{ position:'absolute',bottom:8,left:10,fontSize:10.5,color:'rgba(255,255,255,0.7)',fontFamily:"'JetBrains Mono',monospace",background:'rgba(0,0,0,0.4)',padding:'2px 6px',borderRadius:4 }}>
        {video.duration}
      </div>
      <div style={{ position:'absolute',top:10,left:10 }}>
        <span style={{ fontSize:10,background:'rgba(0,0,0,0.5)',color:'#fff',padding:'2px 6px',borderRadius:4,fontFamily:"'JetBrains Mono',monospace" }}>
          {video.category}
        </span>
      </div>
    </div>

    {/* Info */}
    <div style={{ padding:14 }}>
      <div style={{ fontSize:13,fontWeight:600,color:T.text,marginBottom:4,lineHeight:1.3 }}>{video.title}</div>
      <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12 }}>
        <span style={{ fontSize:11.5,color:T.textMuted }}>{video.creator}</span>
        <span style={{ fontSize:11,color:T.textMuted,fontFamily:"'JetBrains Mono',monospace" }}>{video.submittedAt}</span>
      </div>

      <ScoreBar score={video.score}/>

      {!status ? (
        <div style={{ display:'flex',gap:8 }}>
          <Button variant="danger" onClick={() => onReject(video.id)} style={{ flex:1,justifyContent:'center',fontSize:12 }}>
            <Icon name="x" size={12} color={T.red}/> Reject
          </Button>
          <Button variant="accent" onClick={() => onAccept(video.id)} style={{ flex:1,justifyContent:'center',fontSize:12 }}>
            <Icon name="check" size={12} color="#000"/> Accept
          </Button>
        </div>
      ) : (
        <div style={{
          textAlign:   'center',
          padding:     '8px',
          borderRadius: 8,
          fontSize:    12,
          fontWeight:  600,
          background:  status==='accepted' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
          color:       status==='accepted' ? T.green : T.red,
        }}>
          {status === 'accepted' ? '✓ Accepted' : '✗ Rejected'}
        </div>
      )}
    </div>
  </div>
)

const VideoModal: React.FC<{
  video:   Video
  onClose: () => void
  onAccept:(id: string) => void
  onReject:(id: string) => void
}> = ({ video, onClose, onAccept, onReject }) => (
  <div
    onClick={onClose}
    style={{
      position:       'fixed',
      inset:          0,
      zIndex:         200,
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      backdropFilter: 'blur(20px)',
      background:     'rgba(10,10,15,0.85)',
    }}
  >
    <div
      onClick={e => e.stopPropagation()}
      style={{
        width:        520,
        background:   T.surface,
        border:       `1px solid ${T.border}`,
        borderRadius: 16,
        overflow:     'hidden',
        boxShadow:    '0 40px 100px rgba(0,0,0,0.8)',
        animation:    'scaleIn 0.25s ease both',
      }}
    >
      <div style={{
        height:         240,
        background:     `linear-gradient(135deg,${video.thumbnail},${video.thumbnail}55)`,
        position:       'relative',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
      }}>
        <div style={{ width:56,height:56,borderRadius:'50%',background:'rgba(0,0,0,0.6)',display:'flex',alignItems:'center',justifyContent:'center',border:'2px solid rgba(255,255,255,0.2)' }}>
          <Icon name="play" size={22} color="#fff"/>
        </div>
        <button
          onClick={onClose}
          style={{ position:'absolute',top:12,right:12,background:'rgba(0,0,0,0.5)',border:'none',borderRadius:8,padding:6,cursor:'pointer',display:'flex' }}
        >
          <Icon name="x" size={16} color="#fff"/>
        </button>
      </div>

      <div style={{ padding:22 }}>
        <h3 style={{ fontSize:16,fontWeight:700,color:T.text,marginBottom:6 }}>{video.title}</h3>
        <div style={{ display:'flex',gap:12,marginBottom:16,flexWrap:'wrap' }}>
          {[video.creator, `${video.views} est. views`, video.duration].map((v,i) => (
            <span key={i} style={{ fontSize:12,color:T.textMuted }}>{v}</span>
          ))}
        </div>
        <ScoreBar score={video.score}/>
        <div style={{ display:'flex',gap:10,marginTop:8 }}>
          <Button variant="danger" onClick={() => { onReject(video.id); onClose() }} style={{ flex:1,justifyContent:'center' }}>
            <Icon name="x" size={13} color={T.red}/> Reject
          </Button>
          <Button variant="accent" onClick={() => { onAccept(video.id); onClose() }} style={{ flex:1,justifyContent:'center' }}>
            <Icon name="check" size={13} color="#000"/> Accept &amp; Schedule
          </Button>
        </div>
      </div>
    </div>
  </div>
)

export const MarketplacePage: React.FC = () => {
  const { videos, statuses, acceptVideo, rejectVideo } = useVideos()
  const [search,   setSearch]   = useState('')
  const [filter,   setFilter]   = useState('all')
  const [selected, setSelected] = useState<Video | null>(null)

  const filtered = videos.filter(v => {
    const matchSearch = v.title.toLowerCase().includes(search.toLowerCase()) || v.creator.includes(search)
    const matchCat    = filter === 'all' || v.category === filter
    return matchSearch && matchCat
  })

  return (
    <div style={{ padding: 28 }}>
      <SectionHeader
        title="Video Marketplace"
        subtitle={`${videos.length} submissions awaiting review`}
        actions={
          <>
            <Button variant="ghost"><Icon name="filter" size={13}/>Filter</Button>
            <Button variant="accent"><Icon name="upload" size={13} color="#000"/>Upload Video</Button>
          </>
        }
      />

      {/* Search + filter */}
      <div style={{ display:'flex',gap:12,marginBottom:24,alignItems:'center',flexWrap:'wrap' }}>
        <div style={{ position:'relative',flex:1,maxWidth:380 }}>
          <div style={{ position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',pointerEvents:'none' }}>
            <Icon name="search" size={14} color={T.textMuted}/>
          </div>
          <input
            placeholder="Search by title or creator..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              background:   T.surfaceAlt,
              border:       `1px solid ${T.border}`,
              color:        T.text,
              padding:      '10px 14px 10px 36px',
              borderRadius: 8,
              fontFamily:   "'DM Sans',sans-serif",
              fontSize:     13,
              outline:      'none',
              width:        '100%',
              transition:   'border-color 0.2s',
            }}
            onFocus={e => { e.currentTarget.style.borderColor=T.accent }}
            onBlur={e  => { e.currentTarget.style.borderColor=T.border }}
          />
        </div>
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            style={{
              padding:'6px 14px',borderRadius:6,fontSize:12.5,cursor:'pointer',fontFamily:"'DM Sans',sans-serif",
              background: filter===c ? T.accentGlow : 'transparent',
              color:      filter===c ? T.accent : T.textMuted,
              border:     `1px solid ${filter===c ? 'rgba(245,158,11,0.25)' : 'transparent'}`,
              transition: 'all 0.2s ease',
            }}
          >
            {c === 'all' ? 'All' : c}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:24 }}>
        {[
          { label:'Total Submissions', val: videos.length, color: T.text },
          { label:'Pending Review',    val: videos.filter(v=>v.status==='pending').length, color: T.accent },
          { label:'In Review',         val: videos.filter(v=>v.status==='reviewing').length, color: T.blue },
          { label:'Accepted Today',    val: Object.values(statuses).filter(s=>s==='accepted').length, color: T.green },
        ].map(s => (
          <Card key={s.label} style={{ padding:'14px 16px',display:'flex',justifyContent:'space-between',alignItems:'center' }}>
            <span style={{ fontSize:12,color:T.textMuted }}>{s.label}</span>
            <span style={{ fontSize:18,fontWeight:700,color:s.color,fontFamily:"'JetBrains Mono',monospace" }}>{s.val}</span>
          </Card>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:16 }}>
        {filtered.map((video, i) => (
          <VideoCard
            key={video.id}
            video={video}
            status={statuses[video.id]}
            onView={setSelected}
            onAccept={acceptVideo}
            onReject={rejectVideo}
            delay={i * 40}
          />
        ))}
      </div>

      {selected && (
        <VideoModal
          video={selected}
          onClose={() => setSelected(null)}
          onAccept={acceptVideo}
          onReject={rejectVideo}
        />
      )}
    </div>
  )
}
