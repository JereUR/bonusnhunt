export interface BonusItem {
  id: string
  slotName: string
  bet: number
  win: number | null
  multiplier: number | null
  isOpened: boolean
}

export interface BonusRun {
  id: string
  name: string
  initialBudget: number
  currentBalance: number
  isActive: boolean
  createdAt: string
  bonusItems: BonusItem[]
}

export type BonusItemFormData = {
  bonusRunId: string
  slotName: string
  bet: number
}

export type BonusItemWinData = {
  id: string
  win: number
}

export type BonusRunFormData = {
  userId: string
  name: string
  initialBudget: number
}
