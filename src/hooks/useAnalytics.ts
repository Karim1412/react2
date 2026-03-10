import { useState, useEffect } from 'react'
import { analyticsAPI } from '@/services/api'
import type { PlatformStats, ReachDataPoint, EngagementDataPoint, RadarDataPoint } from '@/types'

interface AnalyticsState {
  platformData:    PlatformStats[]
  reachData:       ReachDataPoint[]
  engagementData:  EngagementDataPoint[]
  radarData:       RadarDataPoint[]
  loading:         boolean
  error:           string | null
}

export function useAnalytics() {
  const [state, setState] = useState<AnalyticsState>({
    platformData:   [],
    reachData:      [],
    engagementData: [],
    radarData:      [],
    loading:        true,
    error:          null,
  })

  useEffect(() => {
    analyticsAPI.overview()
      .then(data => setState({ ...data, loading: false, error: null }))
      .catch(err  => setState(s => ({ ...s, loading: false, error: String(err) })))
  }, [])

  return state
}
