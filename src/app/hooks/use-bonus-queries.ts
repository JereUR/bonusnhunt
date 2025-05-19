'use client'

import { useQuery } from '@tanstack/react-query'
import { getBonusRuns, getActiveBonusRun } from '@/app/actions/bonus-run'
import { getBonusItem } from '@/app/actions/bonus-item'

// Simulamos un usuario logueado para este ejemplo
const mockUserId = 'user-123'

export function useBonusRuns() {
  return useQuery({
    queryKey: ['bonusRuns', mockUserId],
    queryFn: () => getBonusRuns(mockUserId)
  })
}

export function useActiveBonusRun() {
  return useQuery({
    queryKey: ['activeBonusRun', mockUserId],
    queryFn: () => getActiveBonusRun(mockUserId)
  })
}

export function useBonusItem(id: string) {
  return useQuery({
    queryKey: ['bonusItem', id],
    queryFn: () => getBonusItem(id),
    enabled: !!id
  })
}
