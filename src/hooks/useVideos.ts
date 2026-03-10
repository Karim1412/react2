import { useState, useEffect } from 'react'
import { videosAPI } from '@/services/api'
import type { Video, VideoStatus } from '@/types'

export function useVideos() {
  const [videos,  setVideos]  = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [statuses, setStatuses] = useState<Record<string, VideoStatus>>({})

  useEffect(() => {
    videosAPI.list()
      .then(data => { setVideos(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const acceptVideo = async (id: string) => {
    await videosAPI.accept(id)
    setStatuses(s => ({ ...s, [id]: 'accepted' }))
  }

  const rejectVideo = async (id: string) => {
    await videosAPI.reject(id)
    setStatuses(s => ({ ...s, [id]: 'rejected' }))
  }

  return { videos, loading, statuses, acceptVideo, rejectVideo }
}
