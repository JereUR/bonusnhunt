"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useBonusMutations } from "@/app/hooks/use-bonus-mutations"

export default function NewBonusItem() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const runId = searchParams.get("runId")

  const [slotName, setSlotName] = useState("")
  const [bet, setBet] = useState("")
  const [error, setError] = useState("")

  const { createBonusItemMutation } = useBonusMutations()
  const isLoading = createBonusItemMutation.isPending

  useEffect(() => {
    if (!runId) {
      router.push("/dashboard")
    }
  }, [runId, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!slotName.trim()) {
      setError("Por favor ingresa el nombre del slot")
      return
    }

    if (!bet || Number.parseFloat(bet) <= 0) {
      setError("Por favor ingresa una apuesta válida")
      return
    }

    if (!runId) {
      setError("ID de sesión no válido")
      return
    }

    createBonusItemMutation.mutate({
      bonusRunId: runId,
      slotName: slotName.trim(),
      bet: Number.parseFloat(bet),
    })
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Nuevo Bonus</h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Registrar bonus</CardTitle>
            <CardDescription>Añade un nuevo bonus a tu sesión actual</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="slotName">Nombre del slot</Label>
              <Input
                id="slotName"
                placeholder="Ej: Sweet Bonanza"
                value={slotName}
                onChange={(e) => setSlotName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bet">Apuesta ($)</Label>
              <Input
                id="bet"
                type="number"
                step="0.01"
                min="0"
                placeholder="Ej: 20"
                value={bet}
                onChange={(e) => setBet(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard")} disabled={isLoading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Guardando..." : "Guardar bonus"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
