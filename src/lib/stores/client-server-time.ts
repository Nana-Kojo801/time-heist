import { create } from 'zustand'

type ClientServerTimeStore = {
  latency: number
  timeOffset: number
  isSynced: boolean
  lastSyncTime: number
  actions: {
    setLatency: (latency: number) => void
    setTimeOffset: (timeOffset: number) => void
    setIsSynced: (isSynced: boolean) => void
    setLastSyncTime: (lastSyncTime: number) => void
    getServerTime: () => number
    getLocalTime: () => number
  }
}

const clientServerTimeStore = create<ClientServerTimeStore>((set, get) => ({
  latency: 0,
  timeOffset: 0,
  isSynced: false,
  lastSyncTime: 0,
  actions: {
    setLatency: (latency: number) => set({ latency }),
    setTimeOffset: (timeOffset: number) => set({ timeOffset }),
    setIsSynced: (isSynced: boolean) => set({ isSynced }),
    setLastSyncTime: (lastSyncTime: number) => set({ lastSyncTime }),

    getServerTime: () => {
      return Date.now() + get().timeOffset
    },
    getLocalTime: () => {
      return Date.now() - get().timeOffset
    },
  },
}))

export const useLatency = () => clientServerTimeStore((state) => state.latency)
export const useTimeOffset = () =>
  clientServerTimeStore((state) => state.timeOffset)
export const useIsSynced = () =>
  clientServerTimeStore((state) => state.isSynced)
export const useLastSyncTime = () =>
  clientServerTimeStore((state) => state.lastSyncTime)
export const useClientServerTimeActions = () =>
  clientServerTimeStore((state) => state.actions)
