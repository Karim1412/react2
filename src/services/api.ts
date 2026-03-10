/**
 * Mock API service layer — mirrors the real Late API structure.
 * Swap these functions out for real axios calls when going live.
 *
 * Late API docs: https://docs.getlate.dev/
 */

import axios from 'axios'
import { delay } from '@/utils/format'
import type { GenerateVideoRequest, GeneratedVideo, ScheduleRequest, ScheduledPost } from '@/types'

// ─── Axios instance (will hit real backend when env var is set) ───────────────
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('viraloop_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authAPI = {
  login: async (email: string, _password: string) => {
    await delay(1200)
    // Mock — replace with: return api.post('/auth/login', { email, password })
    return { token: 'mock_token_abc123', user: { id: 'u1', name: 'Admin User', email, role: 'super_admin' as const } }
  },

  logout: async () => {
    localStorage.removeItem('viraloop_token')
  },
}

// ─── Videos ───────────────────────────────────────────────────────────────────
export const videosAPI = {
  list: async () => {
    await delay(400)
    const { videos } = await import('./mockData')
    return videos
  },

  accept: async (id: string) => {
    await delay(300)
    return { id, status: 'accepted' as const }
  },

  reject: async (id: string) => {
    await delay(300)
    return { id, status: 'rejected' as const }
  },
}

// ─── AI Studio ────────────────────────────────────────────────────────────────
export const studioAPI = {
  /**
   * POST /api/generate-video
   * Mocked — takes ~3.5 s to simulate generation.
   */
  generate: async (req: GenerateVideoRequest): Promise<GeneratedVideo> => {
    await delay(3500)
    return {
      id:       `g${Date.now()}`,
      prompt:   req.prompt,
      duration: `${req.duration}s`,
      style:    req.style,
      time:     'Just now',
      color:    `hsl(${Math.random() * 360 | 0},55%,32%)`,
      url:      'https://example.com/mock-video.mp4',
    }
  },
}

// ─── Scheduler ────────────────────────────────────────────────────────────────
export const schedulerAPI = {
  /**
   * GET /api/scheduled
   */
  list: async (): Promise<ScheduledPost[]> => {
    await delay(300)
    const { scheduledPosts } = await import('./mockData')
    return scheduledPosts
  },

  /**
   * POST /api/schedule
   */
  create: async (req: ScheduleRequest): Promise<ScheduledPost> => {
    await delay(500)
    const { PLATFORM_COLORS } = await import('@/utils/tokens')
    const platform = req.platforms[0] ?? 'TikTok'
    return {
      id:       `s${Date.now()}`,
      title:    req.videoTitle,
      platform: platform.charAt(0).toUpperCase() + platform.slice(1),
      date:     req.date,
      time:     req.time,
      status:   'scheduled',
      color:    PLATFORM_COLORS[platform] ?? '#f59e0b',
    }
  },

  delete: async (id: string) => {
    await delay(300)
    return { id, deleted: true }
  },
}

// ─── Analytics ────────────────────────────────────────────────────────────────
export const analyticsAPI = {
  overview: async () => {
    await delay(400)
    const { platformData, reachData, engagementData, radarData } = await import('./mockData')
    return { platformData, reachData, engagementData, radarData }
  },
}

// ─── Notifications ────────────────────────────────────────────────────────────
export const notificationsAPI = {
  list: async () => {
    await delay(200)
    const { notifications } = await import('./mockData')
    return notifications
  },

  markRead: async (id: string) => {
    await delay(100)
    return { id, read: true }
  },

  markAllRead: async () => {
    await delay(200)
    return { success: true }
  },
}

export default api
