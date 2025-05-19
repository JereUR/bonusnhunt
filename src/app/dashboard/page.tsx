"use client"

import { PlusCircle, TrendingUp, Wallet, CheckCircle2 } from "lucide-react"
import Link from "next/link"


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BonusRun } from "@/types/bonus"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useActiveBonusRun } from "../hooks/use-bonus-queries"
import { useBonusMutations } from "../hooks/use-bonus-mutations"

export default function Dashboard() {
  const { data, isLoading, error } = useActiveBonusRun()
  const { completeBonusRunMutation } = useBonusMutations()
  const activeBonusRun = data?.success ? (data.data as BonusRun) : null

  // Calcular estadísticas
  const calculateStats = () => {
    if (!activeBonusRun) return { profit: 0, openedCount: 0, remainingCount: 0, currentX: 0, requiredX: 0 }

    const profit = activeBonusRun.currentBalance - activeBonusRun.initialBudget
    const openedBonuses = activeBonusRun.bonusItems.filter((item) => item.isOpened)
    const remainingBonuses = activeBonusRun.bonusItems.filter((item) => !item.isOpened)

    const openedCount = openedBonuses.length
    const remainingCount = remainingBonuses.length

    // Calcular X actual (promedio de multiplicadores de bonos abiertos)
    const totalMultiplier = openedBonuses.reduce((sum, item) => sum + (item.multiplier || 0), 0)
    const currentX = openedCount > 0 ? totalMultiplier / openedCount : 0

    // Calcular X requerido para alcanzar el presupuesto inicial
    const totalRemainingBet = remainingBonuses.reduce((sum, item) => sum + item.bet, 0)
    const targetProfit = activeBonusRun.initialBudget - activeBonusRun.currentBalance
    const requiredX = totalRemainingBet > 0 ? targetProfit / totalRemainingBet + 1 : 0

    return { profit, openedCount, remainingCount, currentX, requiredX }
  }

  const stats = calculateStats()

  const handleCompleteBonusRun = () => {
    if (activeBonusRun) {
      completeBonusRunMutation.mutate(activeBonusRun.id)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Dashboard de Bonus</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-20 mb-2" />
                <Skeleton className="h-4 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Skeleton className="h-8 w-64 mb-6" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Card className="p-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Error al cargar los datos</h2>
            <p className="text-muted-foreground mb-4">
              No pudimos cargar la información de tus sesiones de bonus. Por favor, intenta de nuevo.
            </p>
            <Button onClick={() => window.location.reload()}>Reintentar</Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard de Bonus</h1>

      {!activeBonusRun ? (
        <div className="text-center py-10">
          <h2 className="text-xl mb-4">No tienes una sesión de bonus activa</h2>
          <Link href="/nueva-caceria">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Crear nueva sesión
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Balance Actual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Wallet className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="text-2xl font-bold">${activeBonusRun.currentBalance.toFixed(2)}</div>
                </div>
                <p className={`text-xs ${stats.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {stats.profit >= 0 ? "+" : ""}
                  {stats.profit.toFixed(2)} desde inicio
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Bonos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.openedCount} / {stats.openedCount + stats.remainingCount}
                </div>
                <p className="text-xs text-muted-foreground">{stats.remainingCount} bonos por abrir</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">X Actual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="text-2xl font-bold">x{stats.currentX.toFixed(2)}</div>
                </div>
                <p className="text-xs text-muted-foreground">Promedio de bonos abiertos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">X Necesario</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">x{stats.requiredX.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">Para recuperar presupuesto</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-semibold">Sesión: {activeBonusRun.name}</h2>
            <div className="space-x-2">
              <Link href={`/bonus-items/uevo?runId=${activeBonusRun.id}`}>
                <Button variant="outline">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Añadir Bonus
                </Button>
              </Link>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Completar Sesión
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Completar esta sesión?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Al completar la sesión, se marcará como inactiva y no podrás añadir más bonus a ella. Podrás
                      seguir viendo sus estadísticas en el historial.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCompleteBonusRun}>Completar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Lista de Bonus</CardTitle>
              <CardDescription>Presupuesto inicial: ${activeBonusRun.initialBudget.toFixed(2)}</CardDescription>
            </CardHeader>
            <CardContent>
              {activeBonusRun.bonusItems.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">No hay bonus registrados en esta sesión</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Slot</th>
                        <th className="text-right py-2">Bet</th>
                        <th className="text-right py-2">Win</th>
                        <th className="text-right py-2">X</th>
                        <th className="text-center py-2">Estado</th>
                        <th className="text-right py-2">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeBonusRun.bonusItems.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="py-2">{item.slotName}</td>
                          <td className="text-right py-2">${item.bet.toFixed(2)}</td>
                          <td className="text-right py-2">{item.win !== null ? `$${item.win.toFixed(2)}` : "-"}</td>
                          <td className="text-right py-2">
                            {item.multiplier !== null ? `x${item.multiplier.toFixed(2)}` : "-"}
                          </td>
                          <td className="text-center py-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${item.isOpened ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"}`}
                            >
                              {item.isOpened ? "Abierto" : "Pendiente"}
                            </span>
                          </td>
                          <td className="text-right py-2">
                            {!item.isOpened && (
                              <Link href={`/bonus-items/${item.id}/abrir`}>
                                <Button variant="ghost" size="sm">
                                  Abrir
                                </Button>
                              </Link>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
