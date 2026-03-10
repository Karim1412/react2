import React, { useState } from 'react'
import { T } from '@/utils/tokens'
import { Badge, Button, Card, Icon, SectionHeader, TextArea } from '@/components/ui'
import { studioAPI } from '@/services/api'
import { generationHistory } from '@/services/mockData'
import type { GeneratedVideo, VideoStyle } from '@/types'

const STYLES: { id: VideoStyle; label: string; emoji: string }[] = [
  { id: 'comedy',   label: 'Comedy',     emoji: '😂' },
  { id: 'viral',    label: 'Viral',      emoji: '🚀' },
  { id: 'parody',   label: 'Parody',     emoji: '🎭' },
  { id: 'absurd',   label: 'Absurdist',  emoji: '🌀' },
  { id: 'wholesome',label: 'Wholesome',  emoji: '🥰' },
]

const DURATIONS = [
  { value:'15', label:'15 seconds — TikTok short'  },
  { value:'30', label:'30 seconds — Standard'      },
  { value:'45', label:'45 seconds — Extended'      },
  { value:'60', label:'60 seconds — Long form'     },
  { value:'90', label:'90 seconds — Max'           },
]

const EXAMPLES = ['Cat physics', 'Dog lawyer', 'Hamster CEO', 'Goat influencer']

export const StudioPage: React.FC = () => {
  const [prompt,     setPrompt]     = useState('')
  const [style,      setStyle]      = useState<VideoStyle>('comedy')
  const [duration,   setDuration]   = useState('30')
  const [generating, setGenerating] = useState(false)
  const [generated,  setGenerated]  = useState<GeneratedVideo | null>(null)
  const [history,    setHistory]    = useState<GeneratedVideo[]>(generationHistory)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setGenerating(true)
    setGenerated(null)
    try {
      const video = await studioAPI.generate({ prompt, style, duration })
      setGenerated(video)
      setHistory(h => [video, ...h])
    } finally {
      setGenerating(false)
    }
  }

  const SlotOption = ({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) => (
    <div
      onClick={onClick}
      style={{
        background:   selected ? T.accentGlow : T.surfaceAlt,
        border:       `1px solid ${selected ? T.accent : 'transparent'}`,
        borderRadius: 8,
        padding:      '10px 12px',
        transition:   'all 0.2s ease',
        cursor:       'pointer',
      }}
    >
      {children}
    </div>
  )

  return (
    <div style={{ padding: 28 }}>
      <SectionHeader
        title="AI Video Studio"
        subtitle="Generate AI-powered funny videos with custom prompts"
      />

      <div style={{ display:'grid',gridTemplateColumns:'1fr 380px',gap:20 }}>
        {/* Left: main studio */}
        <div style={{ display:'flex',flexDirection:'column',gap:16 }}>

          {/* Prompt */}
          <Card>
            <label style={{ display:'block',fontSize:11,fontWeight:700,color:T.textMuted,marginBottom:10,textTransform:'uppercase',letterSpacing:'0.08em' }}>
              Video Prompt
            </label>
            <TextArea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Describe your funny video idea... e.g. 'A cat tries to explain cryptocurrency to confused dogs at a finance seminar'"
              rows={4}
            />
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:10 }}>
              <span style={{ fontSize:11,color:T.textMuted,fontFamily:"'JetBrains Mono',monospace" }}>{prompt.length}/500</span>
              <div style={{ display:'flex',gap:8 }}>
                {EXAMPLES.map(ex => (
                  <button
                    key={ex}
                    onClick={() => setPrompt(`Funny video: ${ex} situation`)}
                    style={{
                      background:   'transparent',
                      border:       `1px solid ${T.border}`,
                      color:        T.textMuted,
                      padding:      '4px 10px',
                      borderRadius: 6,
                      fontSize:     11,
                      cursor:       'pointer',
                      fontFamily:   "'DM Sans',sans-serif",
                      transition:   'all 0.15s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color=T.text; (e.currentTarget as HTMLButtonElement).style.borderColor=T.borderHover }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color=T.textMuted; (e.currentTarget as HTMLButtonElement).style.borderColor=T.border }}
                  >
                    + {ex}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Style + Duration */}
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16 }}>
            <Card>
              <label style={{ display:'block',fontSize:11,fontWeight:700,color:T.textMuted,marginBottom:14,textTransform:'uppercase',letterSpacing:'0.08em' }}>
                Content Style
              </label>
              <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
                {STYLES.map(s => (
                  <SlotOption key={s.id} selected={style===s.id} onClick={() => setStyle(s.id)}>
                    <div style={{ display:'flex',alignItems:'center',gap:10 }}>
                      <span style={{ fontSize:18 }}>{s.emoji}</span>
                      <span style={{ fontSize:13,fontWeight:style===s.id?600:400,color:style===s.id?T.accent:T.text }}>{s.label}</span>
                    </div>
                  </SlotOption>
                ))}
              </div>
            </Card>

            <Card>
              <label style={{ display:'block',fontSize:11,fontWeight:700,color:T.textMuted,marginBottom:14,textTransform:'uppercase',letterSpacing:'0.08em' }}>
                Video Duration
              </label>
              <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
                {DURATIONS.map(d => (
                  <SlotOption key={d.value} selected={duration===d.value} onClick={() => setDuration(d.value)}>
                    <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                      <span style={{ fontSize:12.5,color:duration===d.value?T.accent:T.text }}>{d.label}</span>
                      {duration===d.value && <Icon name="check" size={13} color={T.accent}/>}
                    </div>
                  </SlotOption>
                ))}
              </div>
            </Card>
          </div>

          {/* Generate button */}
          <Button
            variant="accent"
            onClick={handleGenerate}
            loading={generating}
            disabled={!prompt.trim()}
            style={{ padding:14,fontSize:15,justifyContent:'center',width:'100%' }}
          >
            <Icon name="zap" size={16} color="#000"/> Generate Video
          </Button>

          {/* Preview window */}
          <Card>
            <h3 className="font-display" style={{ fontSize:13,fontWeight:700,color:T.text,marginBottom:14 }}>Preview Window</h3>
            <div style={{
              height:         220,
              borderRadius:   10,
              border:         `1px solid ${T.border}`,
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              justifyContent: 'center',
              position:       'relative',
              overflow:       'hidden',
              background:     generated
                ? `linear-gradient(135deg,${generated.color},${generated.color}66)`
                : T.surfaceAlt,
            }}>
              {generating ? (
                <div style={{
                  position:       'absolute',
                  inset:          0,
                  display:        'flex',
                  flexDirection:  'column',
                  alignItems:     'center',
                  justifyContent: 'center',
                  gap:            16,
                  backgroundImage: `linear-gradient(90deg,${T.surfaceAlt} 25%,rgba(245,158,11,0.08) 50%,${T.surfaceAlt} 75%)`,
                  backgroundSize: '200% 100%',
                  animation:      'shimmer 2s infinite',
                }}>
                  <span style={{ fontSize:40 }}>⚡</span>
                  <div style={{ fontSize:14,fontWeight:600,color:T.accent }}>AI is generating your video</div>
                  <div style={{ fontSize:12,color:T.textMuted,fontFamily:"'JetBrains Mono',monospace" }}>analyzing · building scenes · rendering</div>
                </div>
              ) : generated ? (
                <div style={{ textAlign:'center',padding:'0 20px' }}>
                  <div style={{ width:56,height:56,borderRadius:'50%',background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 12px',border:'2px solid rgba(255,255,255,0.2)' }}>
                    <Icon name="play" size={22} color="#fff"/>
                  </div>
                  <div style={{ fontSize:13,fontWeight:600,color:'#fff',marginBottom:4 }}>{generated.prompt}</div>
                  <div style={{ fontSize:11,color:'rgba(255,255,255,0.6)',fontFamily:"'JetBrains Mono',monospace" }}>{generated.duration} · {generated.style}</div>
                  <div style={{ marginTop:12,display:'flex',gap:8,justifyContent:'center' }}>
                    <Badge variant="success">✓ Generated</Badge>
                    <Badge variant="info">{generated.duration}</Badge>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ fontSize:36,marginBottom:10,opacity:0.3 }}>🎬</div>
                  <div style={{ fontSize:13,color:T.textMuted }}>Your generated video will appear here</div>
                  <div style={{ fontSize:11,color:T.textDim,marginTop:4 }}>Enter a prompt and click Generate</div>
                </>
              )}
            </div>

            {generated && (
              <div style={{ display:'flex',gap:8,marginTop:12 }}>
                <Button variant="ghost" style={{ flex:1,justifyContent:'center',fontSize:12 }}>
                  <Icon name="eye" size={12}/> Preview Full
                </Button>
                <Button variant="accent" style={{ flex:1,justifyContent:'center',fontSize:12 }}>
                  <Icon name="send" size={12} color="#000"/> Schedule Post
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Right: history + tips */}
        <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
          <Card>
            <h3 className="font-display" style={{ fontSize:13,fontWeight:700,color:T.text,marginBottom:14 }}>Generation History</h3>
            <div style={{ display:'flex',flexDirection:'column',gap:10 }}>
              {history.map(h => (
                <div
                  key={h.id}
                  style={{
                    display:      'flex',
                    gap:          12,
                    padding:      '10px 12px',
                    background:   T.surfaceAlt,
                    borderRadius: 8,
                    border:       `1px solid ${T.border}`,
                    cursor:       'pointer',
                    transition:   'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={e => { const el=e.currentTarget as HTMLDivElement; el.style.transform='translateY(-2px)'; el.style.boxShadow='0 4px 16px rgba(0,0,0,0.3)' }}
                  onMouseLeave={e => { const el=e.currentTarget as HTMLDivElement; el.style.transform=''; el.style.boxShadow='' }}
                >
                  <div style={{ width:48,height:48,borderRadius:8,background:h.color,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center' }}>
                    <Icon name="play" size={14} color="rgba(255,255,255,0.8)"/>
                  </div>
                  <div style={{ flex:1,minWidth:0 }}>
                    <div style={{ fontSize:12,fontWeight:600,color:T.text,marginBottom:4,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{h.prompt}</div>
                    <div style={{ display:'flex',gap:6 }}>
                      <Badge variant="default">{h.duration}</Badge>
                      <Badge variant="purple">{h.style}</Badge>
                    </div>
                    <div style={{ fontSize:10.5,color:T.textMuted,fontFamily:"'JetBrains Mono',monospace",marginTop:4 }}>{h.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Tips */}
          <Card style={{ background:`linear-gradient(135deg,${T.accentGlow},transparent)`,border:`1px solid rgba(245,158,11,0.2)` }}>
            <div style={{ fontSize:12,fontWeight:700,color:T.accent,marginBottom:10 }}>💡 Prompt Tips</div>
            <div style={{ display:'flex',flexDirection:'column',gap:7 }}>
              {[
                'Add animal characters for higher engagement',
                'Include a surprising twist or reversal',
                'Reference current trends and memes',
                'Keep prompts specific and visual',
                'Describe the setting in detail',
              ].map((tip, i) => (
                <div key={i} style={{ fontSize:11.5,color:T.textMuted,display:'flex',gap:6 }}>
                  <span style={{ color:T.accent,fontWeight:700,flexShrink:0 }}>→</span>
                  {tip}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
