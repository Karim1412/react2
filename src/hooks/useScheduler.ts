import { useState, useEffect } from 'react'
import { schedulerAPI } from '@/services/api'
import type { ScheduledPost, ScheduleRequest } from '@/types'

export function useScheduler() {
  const [posts,   setPosts]   = useState<ScheduledPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    schedulerAPI.list()
      .then(data => { setPosts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const schedule = async (req: ScheduleRequest) => {
    const newPost = await schedulerAPI.create(req)
    setPosts(p => [...p, newPost])
    return newPost
  }

  const remove = async (id: string) => {
    await schedulerAPI.delete(id)
    setPosts(p => p.filter(x => x.id !== id))
  }

  return { posts, loading, schedule, remove }
}
