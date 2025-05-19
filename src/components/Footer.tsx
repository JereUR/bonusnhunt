import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="text-lg font-bold">
            BonusTracker
          </Link>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            Seguimiento de bonus de slots y estadísticas
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
            Inicio
          </Link>
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary">
            Dashboard
          </Link>
          <Link href="/bonus-runs/new" className="text-sm text-muted-foreground hover:text-primary">
            Nueva Sesión
          </Link>
        </div>

        <div className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} BonusTracker. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
