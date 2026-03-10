import React, { useState } from 'react'
import { T } from '@/utils/tokens'
import { Icon, Button } from '@/components/ui'
import { authAPI } from '@/services/api'
import { useAppStore } from '@/store/useAppStore'

export const AuthPage: React.FC = () => {
  const login = useAppStore(s => s.login)
  const [email,    setEmail]    = useState('admin@viraloop.io')
  const [password, setPassword] = useState('password')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  const handleLogin = async () => {
    if (!email || !password) { setError('Please fill in all fields.'); return }
    setLoading(true)
    setError('')
    try {
      const { token, user } = await authAPI.login(email, password)
      login(user, token)
    } catch {
      setError('Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    background:   T.surfaceAlt,
    border:       `1px solid ${T.border}`,
    color:        T.text,
    padding:      '11px 14px',
    borderRadius: 8,
    fontFamily:   "'DM Sans', sans-serif",
    fontSize:     14,
    outline:      'none',
    width:        '100%',
    transition:   'border-color 0.2s ease, box-shadow 0.2s ease',
  }

  return (
    <div
      style={{
        minHeight:      '100vh',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        background:     T.bg,
        position:       'relative',
        overflow:       'hidden',
      }}
    >
      {/* Background orbs */}
      <div style={{ position:'absolute',top:'-20%',right:'-10%',width:600,height:600,borderRadius:'50%',background:'radial-gradient(circle,rgba(245,158,11,0.06) 0%,transparent 70%)',pointerEvents:'none' }}/>
      <div style={{ position:'absolute',bottom:'-20%',left:'-10%',width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(139,92,246,0.05) 0%,transparent 70%)',pointerEvents:'none' }}/>

      {/* Grid */}
      <div style={{
        position:            'absolute',
        inset:               0,
        backgroundImage:     `linear-gradient(${T.border} 1px,transparent 1px),linear-gradient(90deg,${T.border} 1px,transparent 1px)`,
        backgroundSize:      '40px 40px',
        opacity:             0.3,
        pointerEvents:       'none',
      }}/>

      <div style={{ width: 400, position: 'relative', zIndex: 1, animation: 'scaleIn 0.4s ease both' }}>
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            display:        'inline-flex',
            alignItems:     'center',
            gap:            10,
            background:     T.surface,
            border:         `1px solid ${T.border}`,
            padding:        '10px 20px',
            borderRadius:   12,
            marginBottom:   20,
          }}>
            <div style={{ width:28,height:28,borderRadius:8,background:T.accent,display:'flex',alignItems:'center',justifyContent:'center' }}>
              <Icon name="zap" size={14} color="#000" />
            </div>
            <span className="font-display" style={{ fontSize:20,fontWeight:800,color:T.text,letterSpacing:'-0.02em' }}>ViraLoop</span>
          </div>

          <h1 className="font-display" style={{ fontSize:28,fontWeight:800,color:T.text,marginBottom:8,letterSpacing:'-0.02em' }}>
            Welcome back
          </h1>
          <p style={{ fontSize:14,color:T.textMuted }}>Sign in to your media operations dashboard</p>
        </div>

        {/* Form card */}
        <div style={{ background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,padding:28 }}>
          {error && (
            <div style={{ background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:8,padding:'10px 14px',marginBottom:16,fontSize:13,color:T.red }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <label style={{ display:'block',fontSize:11,fontWeight:600,color:T.textMuted,marginBottom:6,textTransform:'uppercase',letterSpacing:'0.06em' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@company.com"
              style={inputStyle}
              onFocus={e => { e.currentTarget.style.borderColor=T.accent; e.currentTarget.style.boxShadow=`0 0 0 3px ${T.accentGlow}` }}
              onBlur={e  => { e.currentTarget.style.borderColor=T.border;  e.currentTarget.style.boxShadow='none' }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display:'block',fontSize:11,fontWeight:600,color:T.textMuted,marginBottom:6,textTransform:'uppercase',letterSpacing:'0.06em' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={inputStyle}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              onFocus={e => { e.currentTarget.style.borderColor=T.accent; e.currentTarget.style.boxShadow=`0 0 0 3px ${T.accentGlow}` }}
              onBlur={e  => { e.currentTarget.style.borderColor=T.border;  e.currentTarget.style.boxShadow='none' }}
            />
          </div>

          <Button
            variant="accent"
            onClick={handleLogin}
            loading={loading}
            style={{ width:'100%', justifyContent:'center', padding:12, fontSize:14 }}
          >
            Sign In <Icon name="arrow_up" size={14} color="#000" />
          </Button>

          <div style={{ display:'flex',alignItems:'center',gap:12,margin:'20px 0' }}>
            <div style={{ flex:1,height:1,background:T.border }}/>
            <span style={{ fontSize:11,color:T.textMuted }}>OR</span>
            <div style={{ flex:1,height:1,background:T.border }}/>
          </div>

          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:10 }}>
            {['Google','Microsoft'].map(p => (
              <Button key={p} variant="ghost" style={{ justifyContent:'center',fontSize:13 }}>
                {p === 'Google' ? 'G' : 'M'}&nbsp;&nbsp;{p}
              </Button>
            ))}
          </div>
        </div>

        <p style={{ textAlign:'center',fontSize:12,color:T.textMuted,marginTop:20 }}>
          No account?{' '}
          <span style={{ color:T.accent,cursor:'pointer' }}>Request access →</span>
        </p>
      </div>
    </div>
  )
}
