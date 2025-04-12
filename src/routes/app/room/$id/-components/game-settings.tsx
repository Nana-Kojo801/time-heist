import { Settings, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { itemVariants } from './animations'
import { useEffect, useState } from 'react'
import { useRoom } from '../../-utils'
import { useMutation } from '@tanstack/react-query'
import { useConvexMutation } from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'
import { toast } from 'sonner'

export function GameSettings({ isLeader }: { isLeader: boolean }) {
  const room = useRoom()
  const [settingsData, setSettingsData] = useState(room.gameSettings)
  const {
    mutateAsync: updateGameSettings,
    isPending: updatingSettings,
    isError,
  } = useMutation({
    mutationFn: useConvexMutation(api.rooms.updateGameSettings),
    onSuccess: () => {
      toast.success('Game settings updated successfully', { duration: 2000 })
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSettingsData((prev) => ({
      ...prev,
      [name]: parseInt(value),
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateGameSettings({ ...settingsData, roomId: room._id })
  }

  useEffect(() => {
    if (isError) toast.error('Error updating game settings', { duration: 2000 })
  }, [isError])

  useEffect(() => {
    setSettingsData(room.gameSettings)
  }, [room.gameSettings])

  return (
    <motion.div
      variants={itemVariants}
      className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/20 relative overflow-hidden"
    >
      {/* Decorative top/bottom borders */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50" />

      <div className="flex items-center gap-2 mb-6">
        <Settings className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold text-primary">Game Settings</h2>
      </div>
      <div className="space-y-6">
        <motion.div className="space-y-2" whileHover={{ x: 5 }}>
          <label className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Round Duration
          </label>
          <form
            onBlur={() => setSettingsData(room.gameSettings)}
            onSubmit={handleSubmit}
            className="flex flex-col gap-2"
          >
            <div className="flex-1 space-y-1">
              <Input
                type="number"
                placeholder="Min"
                className="bg-card/50 border-primary/20 focus:ring-2 focus:ring-primary h-12"
                value={settingsData.minutes}
                min="2"
                max="5"
                disabled={!isLeader}
                onChange={handleChange}
                name="minutes"
              />
              <p className="text-xs text-muted-foreground">Minutes</p>
            </div>
            <div className="flex-1 space-y-1">
              <Input
                type="number"
                placeholder="Sec"
                className="bg-card/50 border-primary/20 focus:ring-2 focus:ring-primary h-12"
                value={settingsData.seconds}
                min="0"
                max="59"
                disabled={!isLeader}
                onChange={handleChange}
                name="seconds"
              />
              <p className="text-xs text-muted-foreground">Seconds</p>
            </div>
            <div className="flex-1 space-y-1">
              <Input
                type="number"
                placeholder="Ms"
                className="bg-card/50 border-primary/20 focus:ring-2 focus:ring-primary h-12"
                value={settingsData.milliseconds}
                min="0"
                max="999"
                step="100"
                disabled={!isLeader}
                onChange={handleChange}
                name="milliseconds"
              />
              <p className="text-xs text-muted-foreground">Milliseconds</p>
            </div>
            {isLeader && (
              <motion.div
                className="space-y-2 pt-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  disabled={updatingSettings}
                  className="w-full hover:bg-primary/20 bg-primary/10 border border-primary/20 text-primary py-5"
                >
                  {updatingSettings ? 'Saving...' : 'Save Settings'}
                </Button>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </motion.div>
  )
}
