import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Notification, NavPage } from '@/types'
import { notifications as mockNotifications } from '@/services/mockData'

interface AppState {
  // Auth
  user: User | null
  isAuthed: boolean
  login:  (user: User, token: string) => void
  logout: () => void

  // Navigation
  page: NavPage
  setPage: (page: NavPage) => void
  sidebarCollapsed: boolean
  toggleSidebar: () => void

  // Dark mode
  darkMode: boolean
  toggleDarkMode: () => void

  // Notifications
  notifications: Notification[]
  unreadCount: number
  markRead:    (id: string) => void
  markAllRead: () => void
  addNotification: (n: Notification) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // ── Auth ────────────────────────────────────────────────────────────────
      user:     null,
      isAuthed: false,

      login: (user, token) => {
        localStorage.setItem('viraloop_token', token)
        set({ user, isAuthed: true })
      },

      logout: () => {
        localStorage.removeItem('viraloop_token')
        set({ user: null, isAuthed: false, page: 'dashboard' })
      },

      // ── Navigation ──────────────────────────────────────────────────────────
      page: 'dashboard',
      setPage: page => set({ page }),

      sidebarCollapsed: false,
      toggleSidebar: () => set(s => ({ sidebarCollapsed: !s.sidebarCollapsed })),

      // ── Theme ───────────────────────────────────────────────────────────────
      darkMode: true,
      toggleDarkMode: () => set(s => ({ darkMode: !s.darkMode })),

      // ── Notifications ────────────────────────────────────────────────────────
      notifications: mockNotifications,
      unreadCount:   mockNotifications.filter(n => !n.read).length,

      markRead: id =>
        set(s => {
          const notifications = s.notifications.map(n =>
            n.id === id ? { ...n, read: true } : n,
          )
          return { notifications, unreadCount: notifications.filter(n => !n.read).length }
        }),

      markAllRead: () =>
        set(s => ({
          notifications: s.notifications.map(n => ({ ...n, read: true })),
          unreadCount:   0,
        })),

      addNotification: n =>
        set(s => ({
          notifications: [n, ...s.notifications],
          unreadCount:   s.unreadCount + (n.read ? 0 : 1),
        })),
    }),
    {
      name:    'viraloop-store',
      partialize: state => ({
        darkMode:         state.darkMode,
        sidebarCollapsed: state.sidebarCollapsed,
        user:             state.user,
        isAuthed:         state.isAuthed,
      }),
    },
  ),
)
