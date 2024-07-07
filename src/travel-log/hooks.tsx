import axios from 'axios'
import { useAppDispatch } from '../hooks'
import { setTravelIntro, setTravelMarkers } from './slice/TravelLogSlice'
import { useMemo } from 'react'
import { ITravelLog } from './TravelLogTypes'

export const useLoadTravelLogs = () => {
  const dispatch = useAppDispatch()

  const s3Uri = process.env.REACT_APP_S3_URI

  const loadTravelLogs = () => {
    axios.get(`${s3Uri}/travel.json`).then((response) => {
      const travelLog = response.data as ITravelLog

      dispatch(setTravelIntro(travelLog.intro))
      dispatch(setTravelMarkers(travelLog.travelMarkers))
    })
  }

  return useMemo(() => ({ loadTravelLogs }), [])
}
