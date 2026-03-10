// ─── Auth ──────────────────────────────────────────────────────────────────────
export interface User {
  id: string
  name: string
  email: string
  role: 'super_admin' | 'admin' | 'editor' | 'viewer'
  avatar?: string
}

// ─── Analytics ────────────────────────────────────────────────────────────────
export type Platform = 'instagram' | 'tiktok' | 'youtube' | 'facebook' | 'twitter'

export interface PlatformStats {
  platform: string
  views: number
  likes: number
  shares: number
  comments: number
  engagement: number
  color: string
}

export interface ReachDataPoint {
  month: string
  instagram: number
  tiktok: number
  youtube: number
  facebook: number
  twitter: number
}

export interface EngagementDataPoint {
  day: number
  rate: number
  posts: number
}

export interface RadarDataPoint {
  metric: string
  instagram: number
  tiktok: number
  youtube: number
  facebook: number
  twitter: number
}

// ─── Videos ───────────────────────────────────────────────────────────────────
export type VideoStatus = 'pending' | 'reviewing' | 'accepted' | 'rejected'

export interface Video {
  id: string
  title: string
  creator: string
  score: number
  views: string
  duration: string
  status: VideoStatus
  thumbnail: string
  category: string
  submittedAt: string
}

// ─── AI Generation ────────────────────────────────────────────────────────────
export type VideoStyle = 'comedy' | 'viral' | 'parody' | 'absurd' | 'wholesome'

export interface GeneratedVideo {
  id: string
  prompt: string
  duration: string
  style: VideoStyle
  time: string
  color: string
  url?: string
}

export interface GenerateVideoRequest {
  prompt: string
  style: VideoStyle
  duration: string
}

// ─── Scheduler ────────────────────────────────────────────────────────────────
export type ScheduleStatus = 'scheduled' | 'draft' | 'processing' | 'published' | 'failed'

export interface ScheduledPost {
  id: string
  title: string
  platform: string
  date: string
  time: string
  status: ScheduleStatus
  color: string
  videoId?: string
}

export interface ScheduleRequest {
  videoTitle: string
  platforms: string[]
  date: string
  time: string
}

// ─── Notifications ────────────────────────────────────────────────────────────
export type NotificationType = 'success' | 'info' | 'warning' | 'error'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  body: string
  time: string
  read: boolean
  icon: string
}

// ─── UI ───────────────────────────────────────────────────────────────────────
export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple' | 'tiktok'

export type NavPage =
  | 'dashboard'
  | 'analytics'
  | 'marketplace'
  | 'studio'
  | 'scheduler'
  | 'notifications'
  | 'settings'
