import React from 'react'
import { T } from '@/utils/tokens'

interface CardProps {
  children: React.ReactNode
  padding?: number | string
  className?: string
  style?: React.CSSProperties
  hoverable?: boolean
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = 22,
  className = '',
  style,
  hoverable = false,
  onClick,
}) => (
  <div
    className={className}
    onClick={onClick}
    style={{
      background:   T.surface,
      border:       `1px solid ${T.border}`,
      borderRadius: 12,
      padding,
      transition:   'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
      cursor:       onClick ? 'pointer' : undefined,
      ...(hoverable ? {} : {}),
      ...style,
    }}
    onMouseEnter={hoverable ? e => {
      const el = e.currentTarget as HTMLDivElement
      el.style.borderColor = T.borderHover
      el.style.transform   = 'translateY(-2px)'
      el.style.boxShadow   = '0 8px 32px rgba(0,0,0,0.4)'
    } : undefined}
    onMouseLeave={hoverable ? e => {
      const el = e.currentTarget as HTMLDivElement
      el.style.borderColor = T.border
      el.style.transform   = ''
      el.style.boxShadow   = ''
    } : undefined}
  >
    {children}
  </div>
)

interface SectionHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, actions }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
    <div>
      <h2
        className="font-display"
        style={{ fontSize: 20, fontWeight: 700, color: T.text, letterSpacing: '-0.01em' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontSize: 13, color: T.textMuted, marginTop: 3 }}>{subtitle}</p>
      )}
    </div>
    {actions && <div style={{ display: 'flex', gap: 8 }}>{actions}</div>}
  </div>
)
