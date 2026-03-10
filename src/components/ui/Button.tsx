import React from 'react'
import { T } from '@/utils/tokens'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'accent' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

const LoadingDots = () => (
  <div style={{ display: 'flex', gap: 4 }}>
    {[0, 0.2, 0.4].map((delay, i) => (
      <div
        key={i}
        style={{
          width: 6, height: 6,
          borderRadius: '50%',
          background: 'currentColor',
          animation: `blink 1s ease infinite ${delay}s`,
        }}
      />
    ))}
  </div>
)

export const Button: React.FC<ButtonProps> = ({
  variant = 'ghost',
  size = 'md',
  loading = false,
  children,
  disabled,
  style,
  ...props
}) => {
  const pad = size === 'sm' ? '5px 12px' : size === 'lg' ? '12px 24px' : '8px 16px'
  const fontSize = size === 'sm' ? 12 : size === 'lg' ? 15 : 13

  const base: React.CSSProperties = {
    display:       'inline-flex',
    alignItems:    'center',
    gap:           6,
    padding:       pad,
    borderRadius:  8,
    fontFamily:    "'DM Sans', sans-serif",
    fontWeight:    600,
    fontSize,
    cursor:        disabled || loading ? 'not-allowed' : 'pointer',
    border:        'none',
    transition:    'all 0.2s ease',
    opacity:       disabled || loading ? 0.5 : 1,
    whiteSpace:    'nowrap',
  }

  const variants: Record<string, React.CSSProperties> = {
    accent: {
      background: T.accent,
      color:      '#000',
    },
    ghost: {
      background: 'transparent',
      color:      T.textMuted,
      border:     `1px solid ${T.border}`,
    },
    danger: {
      background: 'rgba(239,68,68,0.12)',
      color:      T.red,
      border:     `1px solid rgba(239,68,68,0.3)`,
    },
  }

  return (
    <button
      {...props}
      disabled={disabled || loading}
      style={{ ...base, ...variants[variant], ...style }}
    >
      {loading ? <LoadingDots /> : children}
    </button>
  )
}
