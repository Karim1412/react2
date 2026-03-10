import React from 'react'
import { T } from '@/utils/tokens'
import { fmt } from '@/utils/format'

interface TooltipPayloadItem {
  name:   string
  value:  number | string
  color?: string
  fill?:  string
}

interface CustomTooltipProps {
  active?:  boolean
  payload?: TooltipPayloadItem[]
  label?:   string | number
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null

  return (
    <div
      style={{
        background:   T.surface,
        border:       `1px solid ${T.border}`,
        borderRadius: 8,
        padding:      '8px 12px',
        boxShadow:    '0 8px 32px rgba(0,0,0,0.5)',
        fontFamily:   "'DM Sans', sans-serif",
      }}
    >
      <div style={{ color: T.textMuted, fontSize: 11, marginBottom: 6, fontFamily: "'JetBrains Mono', monospace" }}>
        {label}
      </div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color ?? p.fill }} />
          <span style={{ color: T.textMuted, fontSize: 11 }}>{p.name}:</span>
          <span
            style={{
              color:      T.text,
              fontWeight: 600,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize:   12,
            }}
          >
            {typeof p.value === 'number' && p.value > 1000 ? fmt(p.value) : p.value}
          </span>
        </div>
      ))}
    </div>
  )
}
