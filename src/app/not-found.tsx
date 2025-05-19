import Link from "next/link"
import { Search, Home } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-2">Página no encontrada</h2>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <Button className="gap-2">
            <Home className="h-4 w-4" /> Volver al inicio
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline" className="gap-2">
            <Search className="h-4 w-4" /> Ir al dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
