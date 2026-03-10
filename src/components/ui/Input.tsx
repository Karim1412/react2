import React from 'react'
import { T } from '@/utils/tokens'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Input: React.FC<InputProps> = ({ label, style, ...props }) => (
  <div>
    {label && (
      <label
        style={{
          display:       'block',
          fontSize:      11,
          fontWeight:    600,
          color:         T.textMuted,
          marginBottom:  6,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        {label}
      </label>
    )}
    <input
      {...props}
      style={{
        background:   T.surfaceAlt,
        border:       `1px solid ${T.border}`,
        color:        T.text,
        padding:      '10px 14px',
        borderRadius: 8,
        fontFamily:   "'DM Sans', sans-serif",
        fontSize:     14,
        outline:      'none',
        width:        '100%',
        transition:   'border-color 0.2s ease, box-shadow 0.2s ease',
        ...style,
      }}
      onFocus={e => {
        e.currentTarget.style.borderColor = T.accent
        e.currentTarget.style.boxShadow   = `0 0 0 3px ${T.accentGlow}`
      }}
      onBlur={e => {
        e.currentTarget.style.borderColor = T.border
        e.currentTarget.style.boxShadow   = 'none'
      }}
    />
  </div>
)

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export const TextArea: React.FC<TextAreaProps> = ({ label, style, ...props }) => (
  <div>
    {label && (
      <label
        style={{
          display:       'block',
          fontSize:      11,
          fontWeight:    600,
          color:         T.textMuted,
          marginBottom:  6,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        {label}
      </label>
    )}
    <textarea
      {...props}
      style={{
        background:   T.surfaceAlt,
        border:       `1px solid ${T.border}`,
        color:        T.text,
        padding:      '10px 14px',
        borderRadius: 8,
        fontFamily:   "'DM Sans', sans-serif",
        fontSize:     14,
        outline:      'none',
        width:        '100%',
        resize:       'none',
        lineHeight:   1.6,
        transition:   'border-color 0.2s ease, box-shadow 0.2s ease',
        ...style,
      }}
      onFocus={e => {
        e.currentTarget.style.borderColor = T.accent
        e.currentTarget.style.boxShadow   = `0 0 0 3px ${T.accentGlow}`
      }}
      onBlur={e => {
        e.currentTarget.style.borderColor = T.border
        e.currentTarget.style.boxShadow   = 'none'
      }}
    />
  </div>
)

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
}

export const Select: React.FC<SelectProps> = ({ label, children, style, ...props }) => (
  <div>
    {label && (
      <label
        style={{
          display:       'block',
          fontSize:      11,
          fontWeight:    600,
          color:         T.textMuted,
          marginBottom:  6,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        {label}
      </label>
    )}
    <select
      {...props}
      style={{
        background:   T.surfaceAlt,
        border:       `1px solid ${T.border}`,
        color:        T.text,
        padding:      '10px 14px',
        borderRadius: 8,
        fontFamily:   "'DM Sans', sans-serif",
        fontSize:     14,
        outline:      'none',
        width:        '100%',
        cursor:       'pointer',
        ...style,
      }}
    >
      {children}
    </select>
  </div>
)
