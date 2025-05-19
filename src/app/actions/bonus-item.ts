'use server'

import { revalidatePath } from 'next/cache'

import { BonusItemFormData, BonusItemWinData } from '@/types/bonus'
import { prisma } from '@/lib/prisma'

export async function createBonusItem(data: BonusItemFormData) {
  try {
    // Crear el nuevo bonus item
    const bonusItem = await prisma.bonusItem.create({
      data: {
        bonusRunId: data.bonusRunId,
        slotName: data.slotName,
        bet: data.bet
      }
    })

    // Actualizar el balance actual del bonus run (restar la apuesta)
    await prisma.bonusRun.update({
      where: { id: data.bonusRunId },
      data: {
        currentBalance: {
          decrement: data.bet
        }
      }
    })

    revalidatePath('/dashboard')
    return { success: true, data: bonusItem }
  } catch (error) {
    console.error('Error creating bonus item:', error)
    return { success: false, error: 'Error al crear el bonus' }
  }
}

export async function updateBonusItemWithWin(data: BonusItemWinData) {
  try {
    // Obtener el bonus item actual
    const bonusItem = await prisma.bonusItem.findUnique({
      where: { id: data.id },
      include: { bonusRun: true }
    })

    if (!bonusItem) {
      return { success: false, error: 'Bonus no encontrado' }
    }

    // Calcular el multiplicador
    const multiplier = data.win / bonusItem.bet

    // Actualizar el bonus item con la ganancia
    const updatedBonusItem = await prisma.bonusItem.update({
      where: { id: data.id },
      data: {
        win: data.win,
        multiplier,
        isOpened: true,
        openedAt: new Date()
      }
    })

    // Actualizar el balance actual del bonus run (sumar la ganancia)
    await prisma.bonusRun.update({
      where: { id: bonusItem.bonusRunId },
      data: {
        currentBalance: {
          increment: data.win
        }
      }
    })

    revalidatePath('/dashboard')
    return { success: true, data: updatedBonusItem }
  } catch (error) {
    console.error('Error updating bonus item:', error)
    return { success: false, error: 'Error al actualizar el bonus' }
  }
}

export async function getBonusItem(id: string) {
  try {
    const bonusItem = await prisma.bonusItem.findUnique({
      where: { id },
      include: { bonusRun: true }
    })

    if (!bonusItem) {
      return { success: false, error: 'Bonus no encontrado' }
    }

    return { success: true, data: bonusItem }
  } catch (error) {
    console.error('Error fetching bonus item:', error)
    return { success: false, error: 'Error al obtener el bonus' }
  }
}
