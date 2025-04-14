import { useSuspenseQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from '@tanstack/react-router'
import { gameQueryOptions, useRoomUser } from '../../../-utils'
import { useEffect, useState } from 'react'
import { useClientServerTimeActions } from '@/lib/stores/client-server-time'

export const useGame = () => {
  const { id } = useParams({ from: '/app/room/$id/game/' })
  const { data: game } = useSuspenseQuery(gameQueryOptions(id))
  const navigate = useNavigate()
  

  if (!game) {
    navigate({ to: '/app/room/$id', params: { id } })
  }
  return game!
}

export const useGameUser = () => {
  const game = useGame()
  const user = useRoomUser()

  return game.players.find(player => player.userId === user.userId)!
}

export const useTimer = () => {
  const game = useGame()
  const [timer, setTimer] = useState(0)
  const { getServerTime } = useClientServerTimeActions()

  useEffect(() => {
    if(game.state === 'waiting') return
    const interval = setInterval(() => {
      const serverTime = getServerTime()
      if(serverTime >= game.startTime) {
        const timePassed = serverTime - game.startTime
        if(timePassed >= 1000 * 60) {
          setTimer(1000 * 60)
          clearInterval(interval)
        } else setTimer(timePassed)
      }
    }, 10)
    return () => clearInterval(interval)
  }, [game.state, game.startTime, getServerTime])

  return timer
}