"use client"

import { useEffect } from "react"
import { AlertCircle, Home, RefreshCw } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Algo salió mal</h2>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        Ha ocurrido un error inesperado. Por favor, intenta recargar la página o vuelve al inicio.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={() => reset()} className="gap-2">
          <RefreshCw className="h-4 w-4" /> Intentar de nuevo
        </Button>
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <Home className="h-4 w-4" /> Volver al inicio
          </Button>
        </Link>
      </div>
    </div>
  )
}
