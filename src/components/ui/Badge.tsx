import React from 'react'
import type { BadgeVariant } from '@/types'

const STYLES: Record<BadgeVariant, { bg: string; color: string }> = {
  default: { bg: 'rgba(255,255,255,0.08)',  color: '#6b6b85' },
  success: { bg: 'rgba(16,185,129,0.15)',   color: '#10b981' },
  warning: { bg: 'rgba(245,158,11,0.15)',   color: '#f59e0b' },
  error:   { bg: 'rgba(239,68,68,0.15)',    color: '#ef4444' },
  info:    { bg: 'rgba(59,130,246,0.15)',   color: '#3b82f6' },
  purple:  { bg: 'rgba(139,92,246,0.15)',   color: '#8b5cf6' },
  tiktok:  { bg: 'rgba(105,201,208,0.15)',  color: '#69C9D0' },
}

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const s = STYLES[variant]
  return (
    <span
      className={className}
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        gap:            4,
        padding:        '3px 8px',
        borderRadius:   20,
        fontSize:       11,
        fontWeight:     600,
        fontFamily:     "'JetBrains Mono', monospace",
        letterSpacing:  '0.02em',
        background:     s.bg,
        color:          s.color,
        whiteSpace:     'nowrap',
      }}
    >
      {children}
    </span>
  )
}
