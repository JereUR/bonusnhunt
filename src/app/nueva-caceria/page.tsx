"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useBonusMutations } from "@/app/hooks/use-bonus-mutations"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function NuevaCaceriaPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [initialBudget, setInitialBudget] = useState("")
  const [error, setError] = useState("")

  const { createBonusRunMutation } = useBonusMutations()
  const isLoading = createBonusRunMutation.isPending

  // Simulamos un usuario logueado para este ejemplo
  const mockUserId = "user-123"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!initialBudget || Number.parseFloat(initialBudget) <= 0) {
      setError("Por favor ingresa un presupuesto inicial válido")
      return
    }

    createBonusRunMutation.mutate({
      userId: mockUserId,
      name: name || "Nueva sesión",
      initialBudget: Number.parseFloat(initialBudget),
    })
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Nueva Sesión de Bonus</h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Crear sesión</CardTitle>
            <CardDescription>Configura una nueva sesión para registrar tus bonus</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de la sesión</Label>
              <Input
                id="name"
                placeholder="Ej: Sesión del 18/05"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="initialBudget">Presupuesto inicial ($)</Label>
              <Input
                id="initialBudget"
                type="number"
                step="0.01"
                min="0"
                placeholder="Ej: 1000"
                value={initialBudget}
                onChange={(e) => setInitialBudget(e.target.value)}
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
              {isLoading ? "Creando..." : "Crear sesión"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
