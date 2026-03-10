import type {
  ReachDataPoint,
  EngagementDataPoint,
  PlatformStats,
  RadarDataPoint,
  Video,
  ScheduledPost,
  Notification,
  GeneratedVideo,
} from '@/types'
import { T, PLATFORM_COLORS } from '@/utils/tokens'

// ─── Reach / Analytics ───────────────────────────────────────────────────────
export const reachData: ReachDataPoint[] = Array.from({ length: 12 }, (_, i) => ({
  month: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i],
  instagram: Math.floor(180_000 + Math.random() * 120_000 + i * 15_000),
  tiktok:    Math.floor(320_000 + Math.random() * 200_000 + i * 25_000),
  youtube:   Math.floor( 95_000 + Math.random() *  80_000 + i * 10_000),
  facebook:  Math.floor( 75_000 + Math.random() *  50_000 + i *  5_000),
  twitter:   Math.floor( 45_000 + Math.random() *  30_000 + i *  3_000),
}))

export const engagementData: EngagementDataPoint[] = Array.from({ length: 30 }, (_, i) => ({
  day:   i + 1,
  rate:  +( 3.2 + Math.sin(i / 3) * 1.5 + Math.random() * 0.8).toFixed(2),
  posts: Math.floor(2 + Math.random() * 5),
}))

export const platformData: PlatformStats[] = [
  { platform: 'Instagram', views: 2_400_000, likes: 186_000, shares:  42_000, comments:  31_000, engagement:  7.4, color: PLATFORM_COLORS.Instagram },
  { platform: 'TikTok',    views: 8_900_000, likes: 920_000, shares: 310_000, comments: 148_000, engagement: 15.9, color: PLATFORM_COLORS.TikTok    },
  { platform: 'YouTube',   views: 1_200_000, likes:  89_000, shares:  21_000, comments:  18_000, engagement:  5.2, color: PLATFORM_COLORS.YouTube   },
  { platform: 'Facebook',  views:   890_000, likes:  34_000, shares:  12_000, comments:   8_900, engagement:  3.1, color: PLATFORM_COLORS.Facebook  },
  { platform: 'Twitter',   views:   540_000, likes:  28_000, shares:  19_000, comments:   6_200, engagement:  4.8, color: PLATFORM_COLORS.Twitter   },
]

export const radarData: RadarDataPoint[] = [
  { metric: 'Reach',     instagram: 85, tiktok: 95, youtube: 65, facebook: 55, twitter: 40 },
  { metric: 'Engage',    instagram: 78, tiktok: 92, youtube: 60, facebook: 45, twitter: 55 },
  { metric: 'Growth',    instagram: 70, tiktok: 88, youtube: 72, facebook: 35, twitter: 48 },
  { metric: 'Viral',     instagram: 65, tiktok: 95, youtube: 50, facebook: 30, twitter: 60 },
  { metric: 'Retention', instagram: 80, tiktok: 75, youtube: 85, facebook: 60, twitter: 50 },
]

// ─── Videos ───────────────────────────────────────────────────────────────────
const VIDEO_TITLES = [
  'Cat fails at parkour compilation',
  'Office chair racing championship',
  'Dog learns to skateboard',
  'Kid discovers gravity hilarious',
  'Grandma plays VR for first time',
  'Hamster builds tiny house',
  'Duck follows delivery man',
  'Raccoon steals pizza',
  'Parrot roasts owner for 5 mins',
  'Goat escapes farm 47 times',
  'Sloth attempts marathon',
  'Penguin steals fish live on cam',
]
const CREATORS    = ['@funnycat99','@chairracing','@skatepup','@kidmoments','@grandmatech','@hamsterlife','@duckwatch','@raccoonthief','@parrottv','@goatescape','@slowrace','@penguincam']
const CATEGORIES  = ['Animals','Comedy','Animals','Kids','Tech','Animals','Animals','Comedy','Animals','Animals','Sports','Animals']
const STATUSES    = ['pending','pending','pending','reviewing','pending','reviewing','pending','pending','pending','reviewing','pending','pending'] as const

export const videos: Video[] = Array.from({ length: 12 }, (_, i) => ({
  id:          `v${i}`,
  title:       VIDEO_TITLES[i],
  creator:     CREATORS[i],
  score:       Math.floor(72 + Math.random() * 25),
  views:       `${(Math.random() * 9 + 0.5).toFixed(1)}M`,
  duration:    `${(0.5 + Math.random() * 2.5).toFixed(1)}m`,
  status:      STATUSES[i],
  thumbnail:   `hsl(${i * 30},60%,35%)`,
  category:    CATEGORIES[i],
  submittedAt: `${Math.floor(1 + Math.random() * 23)}h ago`,
}))

// ─── Scheduled Posts ──────────────────────────────────────────────────────────
export const scheduledPosts: ScheduledPost[] = [
  { id: 's1', title: 'Cat Parkour Fails',         platform: 'TikTok',    date: 'Mar 11', time: '09:00', status: 'scheduled',  color: PLATFORM_COLORS.TikTok    },
  { id: 's2', title: 'Office Chair Racing',        platform: 'Instagram', date: 'Mar 11', time: '14:30', status: 'scheduled',  color: PLATFORM_COLORS.Instagram },
  { id: 's3', title: 'Grandma VR Experience',      platform: 'YouTube',   date: 'Mar 12', time: '11:00', status: 'scheduled',  color: PLATFORM_COLORS.YouTube   },
  { id: 's4', title: 'Duck Delivery Follow',       platform: 'TikTok',    date: 'Mar 12', time: '17:00', status: 'scheduled',  color: PLATFORM_COLORS.TikTok    },
  { id: 's5', title: 'AI Generated: Funny Sloth',  platform: 'Instagram', date: 'Mar 13', time: '10:00', status: 'draft',      color: PLATFORM_COLORS.Instagram },
  { id: 's6', title: 'Raccoon Pizza Heist',        platform: 'Twitter',   date: 'Mar 14', time: '12:00', status: 'scheduled',  color: PLATFORM_COLORS.Twitter   },
  { id: 's7', title: 'Parrot Roast Compilation',   platform: 'Facebook',  date: 'Mar 15', time: '15:00', status: 'processing', color: PLATFORM_COLORS.Facebook  },
]

// ─── Notifications ────────────────────────────────────────────────────────────
export const notifications: Notification[] = [
  { id: 'n1', type: 'success', title: 'Video Published Successfully', body: 'Cat Parkour Fails reached 2.1M views on TikTok',                   time: '2m ago',  read: false, icon: '🎉' },
  { id: 'n2', type: 'info',    title: 'Analytics Update Available',   body: 'Weekly performance report for your top 5 videos is ready',          time: '1h ago',  read: false, icon: '📊' },
  { id: 'n3', type: 'success', title: 'Video Approved',               body: '"Grandma VR Experience" has been approved for publishing',          time: '3h ago',  read: false, icon: '✅' },
  { id: 'n4', type: 'warning', title: 'Scheduled Post Delayed',       body: '"Office Chair Racing" on Instagram delayed by 15 minutes',         time: '5h ago',  read: true,  icon: '⏰' },
  { id: 'n5', type: 'info',    title: 'New Video Submission',         body: '@hamsterlife submitted "Hamster builds tiny house" for review',     time: '8h ago',  read: true,  icon: '🎬' },
  { id: 'n6', type: 'success', title: 'AI Video Generated',           body: 'Your prompt "Funny cat in space" generated successfully',           time: '1d ago',  read: true,  icon: '🤖' },
  { id: 'n7', type: 'info',    title: 'Engagement Milestone',         body: 'TikTok channel crossed 10M total views this month!',               time: '1d ago',  read: true,  icon: '🚀' },
]

// ─── AI Generation History ────────────────────────────────────────────────────
export const generationHistory: GeneratedVideo[] = [
  { id: 'g1', prompt: 'Funny cat learns quantum physics',        duration: '45s', style: 'comedy',  time: '2h ago', color: 'hsl(220,60%,35%)' },
  { id: 'g2', prompt: 'Dog attempts stand-up comedy in NYC',     duration: '30s', style: 'viral',   time: '5h ago', color: 'hsl(140,55%,30%)' },
  { id: 'g3', prompt: 'Hamster reviews 5-star restaurant',       duration: '60s', style: 'parody',  time: '1d ago', color: 'hsl(30,65%,35%)'  },
]
