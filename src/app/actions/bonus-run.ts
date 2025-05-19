'use server'

import { revalidatePath } from 'next/cache'

import { BonusRunFormData } from '@/types/bonus'
import { prisma } from '@/lib/prisma'

export async function createBonusRun(data: BonusRunFormData) {
  try {
    const bonusRun = await prisma.bonusRun.create({
      data: {
        userId: data.userId,
        name: data.name || 'Nueva sesión',
        initialBudget: data.initialBudget,
        currentBalance: data.initialBudget,
        isActive: true
      }
    })

    revalidatePath('/dashboard')
    return { success: true, data: bonusRun }
  } catch (error) {
    console.error('Error creating bonus run:', error)
    return { success: false, error: 'Error al crear la sesión de bonus' }
  }
}

export async function getBonusRuns(userId: string) {
  try {
    const bonusRuns = await prisma.bonusRun.findMany({
      where: { userId },
      include: {
        bonusItems: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return { success: true, data: bonusRuns }
  } catch (error) {
    console.error('Error fetching bonus runs:', error)
    return { success: false, error: 'Error al obtener las sesiones de bonus' }
  }
}

export async function getActiveBonusRun(userId: string) {
  try {
    const bonusRuns = await prisma.bonusRun.findMany({
      where: {
        userId,
        isActive: true
      },
      include: {
        bonusItems: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 1
    })

    return {
      success: true,
      data: bonusRuns.length > 0 ? bonusRuns[0] : null
    }
  } catch (error) {
    console.error('Error fetching active bonus run:', error)
    return {
      success: false,
      error: 'Error al obtener la sesión de bonus activa'
    }
  }
}

export async function completeBonusRun(id: string) {
  try {
    const bonusRun = await prisma.bonusRun.update({
      where: { id },
      data: {
        isActive: false,
        completedAt: new Date()
      }
    })

    revalidatePath('/dashboard')
    return { success: true, data: bonusRun }
  } catch (error) {
    console.error('Error completing bonus run:', error)
    return { success: false, error: 'Error al completar la sesión de bonus' }
  }
}
