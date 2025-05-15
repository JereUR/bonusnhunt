### 🎰 BonusNHunt

Aplicación web desarrollada con [Next.js](https://nextjs.org) y [Prisma](https://www.prisma.io), diseñada para mostrar estadísticas en tiempo real sobre el rendimiento en slots online.

## 🧠 ¿Qué hace esta app?

Esta herramienta permite a los usuarios llevar un control detallado de sus sesiones de juego en slots online, especialmente enfocado en la búsqueda de _bonus_. Su funcionamiento es el siguiente:

- El usuario registra cada slot en el que consigue un bonus, incluyendo el nombre del slot y la apuesta realizada.
- A medida que los va abriendo y registrando la ganancia obtenida, la app:

- Calcula cuánto _x_ necesita obtener en promedio para recuperar el pozo inicial.
- Muestra el _x_ promedio actual conseguido.
- Proporciona un resumen visual y en tiempo real del progreso general.

Ideal para quienes practican la estrategia de guardar y abrir múltiples bonuses al mismo tiempo y quieren optimizar su rendimiento.

---

## 🚀 Tecnologías

- [Next.js](https://nextjs.org) – Framework React moderno con renderizado híbrido (SSR/SSG).
- [Prisma](https://www.prisma.io) – ORM para manejo de base de datos SQL.
- [TypeScript](https://www.typescriptlang.org) – Tipado estático para mayor robustez.
- [Tailwind CSS](https://tailwindcss.com) – Utilidades CSS para estilizado rápido.
- [PostgreSQL](https://www.postgresql.org) – Base de datos recomendada (configurable).
- [Vercel](https://vercel.com) – Plataforma de despliegue (opcional).

---

## 🛠️ Cómo empezar

Primero, instala las dependencias:

```shellscript
npm install
# o
yarn
# o
pnpm install
```

Luego, inicia el servidor de desarrollo:

```shellscript
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la app funcionando.

## 🧩 Configuración adicional

Crea un archivo `.env` basado en `.env.example`.

Agrega las siguientes variables de entorno necesarias para conectar tu base de datos y configurar el almacenamiento remoto. Estas no están incluidas por defecto.

### 🔗 Conexión a la base de datos (Neon)

Si usas Neon como base de datos:

```plaintext
# Para conexiones directas sin PgBouncer
DATABASE_URL_UNPOOLED=postgresql://:@/?sslmode=require

# Parámetros de conexión personalizados
PGHOST=
PGHOST_UNPOOLED=
PGUSER=
PGDATABASE=
PGPASSWORD=

# URLs generadas automáticamente por Neon o Vercel
POSTGRES_URL=postgres://:@/?sslmode=require
POSTGRES_URL_NON_POOLING=postgres://:@/?sslmode=require
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
POSTGRES_URL_NO_SSL=postgres://:@/
POSTGRES_PRISMA_URL=postgres://:@/?connect_timeout=15&sslmode=require
```

ℹ️ Puedes obtener estos datos desde tu dashboard de Neon al crear un nuevo proyecto y base de datos.
Asegúrate de habilitar SSL y usar el host pooler donde se requiera.

### ☁️ Almacenamiento remoto (Vercel Blob)

Para manejar almacenamiento de archivos en la nube con Vercel Blob:

```plaintext
BLOB_READ_WRITE_TOKEN=tu_token_de_vercel_blob
```

ℹ️ Puedes generar este token en tu panel de Vercel → Storage → Tokens.

### 📦 Migraciones con Prisma

Una vez configuradas las variables, ejecuta las migraciones de la base de datos:

```shellscript
npx prisma migrate dev
```

## 📚 Aprende más

- [Documentación de Next.js](https://nextjs.org/docs)
- [Prisma ORM](https://www.prisma.io/docs)
- [Neon – Serverless Postgres](https://neon.tech/docs)
- [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)

## 🚀 Deploy

El despliegue recomendado es en la plataforma de Vercel.
Consulta la [guía oficial de despliegue de Next.js](https://nextjs.org/docs/deployment) para más detalles.
