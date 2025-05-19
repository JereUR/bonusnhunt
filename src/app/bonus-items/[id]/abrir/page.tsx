"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useBonusItem } from "@/app/hooks/use-bonus-queries"
import { useBonusMutations } from "@/app/hooks/use-bonus-mutations"
import { Skeleton } from "@/components/ui/skeleton"

export default function OpenBonusItem() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const { data, isLoading, error } = useBonusItem(id)
  const { updateBonusItemWithWinMutation } = useBonusMutations()

  const [win, setWin] = useState("")
  const [formError, setFormError] = useState("")

  const bonusItem = data?.success ? data.data : null
  const isSubmitting = updateBonusItemWithWinMutation.isPending

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError("")

    if (!win || Number.parseFloat(win) < 0) {
      setFormError("Por favor ingresa una ganancia válida")
      return
    }

    updateBonusItemWithWinMutation.mutate({
      id,
      win: Number.parseFloat(win),
    })
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 max-w-md">
        <h1 className="text-2xl font-bold mb-6">Abrir Bonus</h1>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (error || !bonusItem) {
    return (
      <div className="container mx-auto p-4 max-w-md">
        <Card>
          <CardContent className="p-6">
            <p className="text-center">Bonus no encontrado o error al cargar los datos</p>
            <div className="mt-4 text-center">
              <Button onClick={() => router.push("/dashboard")}>Volver al Dashboard</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Abrir Bonus</h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Registrar ganancia</CardTitle>
            <CardDescription>
              Slot: {bonusItem.slotName} - Apuesta: ${bonusItem.bet.toFixed(2)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="win">Ganancia total ($)</Label>
              <Input
                id="win"
                type="number"
                step="0.01"
                min="0"
                placeholder="Ej: 100"
                value={win}
                onChange={(e) => setWin(e.target.value)}
                required
              />
            </div>

            {win && Number.parseFloat(win) > 0 && (
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm">
                  Multiplicador (X): <strong>x{(Number.parseFloat(win) / bonusItem.bet).toFixed(2)}</strong>
                </p>
              </div>
            )}

            {formError && <p className="text-sm text-red-500">{formError}</p>}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard")} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar ganancia"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
