import { api } from '@convex/_generated/api'
import { clsx, type ClassValue } from 'clsx'
import { useConvex } from 'convex/react'
import { twMerge } from 'tailwind-merge'
import { useClientServerTimeActions } from './stores/client-server-time'
import { useCallback, useEffect, useRef } from 'react'
import { toast } from 'sonner'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleServerSyncTime = ({
  autoSync = true,
  syncInterval = 5 * 60 * 1000,
}: {
  autoSync: boolean
  syncInterval: number
}) => {
  const convex = useConvex()
  const { setTimeOffset, setLatency, setIsSynced, setLastSyncTime } =
    useClientServerTimeActions()
  const syncServerTime = useCallback(async () => {
    try {
      console.log('sync start');
      
      const syncStartTime = Date.now()

      const serverTime = await convex.query(api.serverTime.getServerTime)
      const clientReceivedTime = Date.now()
      const roundTripTime = clientReceivedTime - syncStartTime
      const latency = Math.floor(roundTripTime / 2)
      const timeOffset = serverTime - clientReceivedTime + latency

      setTimeOffset(timeOffset)
      setLatency(latency)
      setIsSynced(true)
      setLastSyncTime(Date.now())
      console.log('sync end');
    } catch {
      setIsSynced(false)
      toast.error('Failed to sync server time')
    }
  }, [convex, setTimeOffset, setLatency, setIsSynced, setLastSyncTime])

  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (autoSync) {
      syncServerTime()
    }
    if (syncInterval > 0) {
      intervalId.current = setInterval(() => {
        syncServerTime()
      }, syncInterval)
    }
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current)
      }
    }
  }, [syncServerTime, autoSync, syncInterval])
}
