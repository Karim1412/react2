import React from 'react'
import { T } from '@/utils/tokens'
import { Icon } from './Icon'

interface KpiCardProps {
  label:       string
  value:       string | number
  change:      string
  changeType?: 'up' | 'down'
  icon:        string
  color?:      string
  delay?:      number
}

export const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  change,
  changeType = 'up',
  icon,
  color = T.accent,
  delay = 0,
}) => (
  <div
    style={{
      background:      T.surface,
      border:          `1px solid ${T.border}`,
      borderRadius:    12,
      padding:         20,
      animation:       `fadeIn 0.35s ease ${delay}ms both`,
      transition:      'transform 0.2s ease, box-shadow 0.2s ease',
    }}
    onMouseEnter={e => {
      const el = e.currentTarget as HTMLDivElement
      el.style.transform  = 'translateY(-2px)'
      el.style.boxShadow  = '0 8px 32px rgba(0,0,0,0.4)'
    }}
    onMouseLeave={e => {
      const el = e.currentTarget as HTMLDivElement
      el.style.transform  = ''
      el.style.boxShadow  = ''
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
      <div
        style={{
          width:        40,
          height:       40,
          borderRadius: 10,
          background:   `${color}18`,
          display:      'flex',
          alignItems:   'center',
          justifyContent: 'center',
          border:       `1px solid ${color}25`,
        }}
      >
        <Icon name={icon} size={18} color={color} />
      </div>

      <span
        style={{
          fontSize:    11,
          fontWeight:  600,
          color:       changeType === 'up' ? T.green : T.red,
          background:  changeType === 'up' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
          padding:     '3px 8px',
          borderRadius: 20,
          display:     'flex',
          alignItems:  'center',
          gap:         3,
          fontFamily:  "'JetBrains Mono', monospace",
        }}
      >
        <Icon
          name={changeType === 'up' ? 'arrow_up' : 'arrow_down'}
          size={10}
          color={changeType === 'up' ? T.green : T.red}
        />
        {change}
      </span>
    </div>

    <div
      style={{
        fontSize:      26,
        fontWeight:    700,
        color:         T.text,
        letterSpacing: '-0.02em',
        marginBottom:  4,
        fontFamily:    "'JetBrains Mono', monospace",
      }}
    >
      {value}
    </div>

    <div style={{ fontSize: 12.5, color: T.textMuted, fontWeight: 500 }}>{label}</div>
  </div>
)
