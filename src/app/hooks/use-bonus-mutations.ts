'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import { createBonusRun, completeBonusRun } from '@/app/actions/bonus-run'
import {
  createBonusItem,
  updateBonusItemWithWin
} from '@/app/actions/bonus-item'
import {
  BonusItemFormData,
  BonusItemWinData,
  BonusRunFormData
} from '@/types/bonus'

export function useBonusMutations() {
  const queryClient = useQueryClient()
  const router = useRouter()

  // Mutation para crear una nueva sesión de bonus
  const createBonusRunMutation = useMutation({
    mutationFn: (data: BonusRunFormData) => createBonusRun(data),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['bonusRuns'] })
        queryClient.invalidateQueries({ queryKey: ['activeBonusRun'] })
        toast.success('Sesión creada', {
          description: 'La sesión de bonus se ha creado correctamente'
        })
        router.push('/dashboard')
      } else {
        toast.error('Error', {
          description: result.error || 'No se pudo crear la sesión'
        })
      }
    },
    onError: (error) => {
      console.error(error)
      toast.error('Error', {
        description: 'Ocurrió un error al crear la sesión'
      })
    }
  })

  // Mutation para completar una sesión de bonus
  const completeBonusRunMutation = useMutation({
    mutationFn: (id: string) => completeBonusRun(id),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['bonusRuns'] })
        queryClient.invalidateQueries({ queryKey: ['activeBonusRun'] })
        toast.success('Sesión completada', {
          description: 'La sesión de bonus se ha completado correctamente'
        })
      } else {
        toast.error('Error', {
          description: result.error || 'No se pudo completar la sesión'
        })
      }
    }
  })

  // Mutation para crear un nuevo bonus
  const createBonusItemMutation = useMutation({
    mutationFn: (data: BonusItemFormData) => createBonusItem(data),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['bonusRuns'] })
        queryClient.invalidateQueries({ queryKey: ['activeBonusRun'] })
        toast.success('Bonus añadido', {
          description: 'El bonus se ha añadido correctamente'
        })
        router.push('/dashboard')
      } else {
        toast.error('Error', {
          description: result.error || 'No se pudo añadir el bonus'
        })
      }
    },
    onError: (error) => {
      console.error(error)
      toast.error('Error', {
        description: 'Ocurrió un error al añadir el bonus'
      })
    }
  })

  // Mutation para actualizar un bonus con la ganancia
  const updateBonusItemWithWinMutation = useMutation({
    mutationFn: (data: BonusItemWinData) => updateBonusItemWithWin(data),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['bonusRuns'] })
        queryClient.invalidateQueries({ queryKey: ['activeBonusRun'] })
        queryClient.invalidateQueries({ queryKey: ['bonusItem'] })
        toast.success('Bonus actualizado', {
          description: 'La ganancia del bonus se ha registrado correctamente'
        })
        router.push('/dashboard')
      } else {
        toast.error('Error', {
          description: result.error || 'No se pudo actualizar el bonus'
        })
      }
    },
    onError: (error) => {
      console.error(error)
      toast.error('Error', {
        description: 'Ocurrió un error al actualizar el bonus'
      })
    }
  })

  return {
    createBonusRunMutation,
    completeBonusRunMutation,
    createBonusItemMutation,
    updateBonusItemWithWinMutation
  }
}
