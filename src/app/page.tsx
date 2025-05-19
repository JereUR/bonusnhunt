import Link from "next/link"
import { ArrowRight, BarChart3, Wallet, TrendingUp, ListChecks } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="py-12 md:py-24 lg:py-32 flex flex-col items-center text-center">
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
            Controla tus <span className="text-primary">Bonus de Slots</span> como nunca antes
          </h1>
          <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
            Registra tus bonus, haz seguimiento de tus ganancias y analiza tu rendimiento con estadísticas detalladas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Comenzar ahora <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline">
                Ver características
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section id="features" className="py-12 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">Todo lo que necesitas para tus sesiones de juego</h2>
          <p className="text-muted-foreground max-w-[700px] mx-auto">
            BonusTracker te ofrece todas las herramientas para gestionar tus bonus y maximizar tus ganancias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <ListChecks className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Registro de Bonus</CardTitle>
              <CardDescription>Registra todos tus bonus con nombre del slot y apuesta.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Mantén un registro organizado de todos los bonus que has conseguido durante tu sesión de juego.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Wallet className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Control de Presupuesto</CardTitle>
              <CardDescription>Establece un presupuesto inicial y haz seguimiento de tu balance.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Visualiza en tiempo real tu balance actual y las ganancias o pérdidas respecto a tu presupuesto inicial.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Multiplicadores X</CardTitle>
              <CardDescription>Calcula automáticamente los multiplicadores de cada bonus.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Conoce el multiplicador X actual y el necesario para alcanzar tu objetivo de ganancias.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Estadísticas Detalladas</CardTitle>
              <CardDescription>Analiza tu rendimiento con estadísticas completas.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Visualiza datos sobre tus mejores slots, multiplicadores promedio y evolución de tu balance.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="bg-primary/5 rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">¿Listo para mejorar tu experiencia de juego?</h2>
          <p className="text-muted-foreground max-w-[700px] mx-auto mb-6">
            Comienza a registrar tus bonus ahora y toma el control de tus sesiones de juego.
          </p>
          <Link href="/bonus-runs/new">
            <Button size="lg" className="gap-2">
              Crear nueva sesión <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
