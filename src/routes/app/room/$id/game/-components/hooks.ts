import { useSuspenseQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from '@tanstack/react-router'
import { gameQueryOptions } from '../../../-utils'

export const useGame = () => {
  const { id } = useParams({ from: '/app/room/$id/game/' })
  const { data: game } = useSuspenseQuery(gameQueryOptions(id))
  const navigate = useNavigate()
  

  if (!game) {
    navigate({ to: '/app/room/$id', params: { id } })
  }
  return game!
}
