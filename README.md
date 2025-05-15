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

---

## 💻 Tecnologías utilizadas

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" height="40" alt="nextjs logo"  />
  <img width="12" />
  <img src="data:image/png;base64,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" height="40" alt="prisma logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" alt="typescript logo"  />
  <img width="12" />
  
  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///9EqLM9prEvoq46pbA0o6/v9/j1+vv6/f2Kxczl8vRYsLpJqrXW6uyOx87q9PaAwMiz2N2Cwcmm0tfF4eWx19xzu8NhtL2Yy9Hf7/G73ODB3+PO5ul3vMRTrrhqt8AJm6hL++MPAAAGeUlEQVR4nO2da5eqOgyGh6blLjKiUBXh/P9feSjqeEVKL1LOyfNx1l7uvqZt0jSpPz8IgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiDIjIRhEM49BivE9S/fVE3qeYQQz0ub6sR3dTz3sMwQ1LxlwCgV0v4ghLLurxXf+nMPUI+4qBij99IeETqrYj/3MFUJdgl8UHdTCU0RzD1YBdYZsFF1VxjkSzOkvwEqra+3JJSruQc9gZDD+Ox81dguxo5bb5r9bhr53EOXItyAkj4B9bZzD3+cOFUz4AXYuB7zbBVW4KMZU7dX46/6DL2Z8TC3ig8UBgR2ErO5dQxiRmA3U9u5lQxwMCSwk5g4ud+sjAnsXGPq4JnDlw9DZSSS9dyCXkg03cQz1LUDMtdy9G8lumVFk4vwiuJEtbRJpeYFqq7FwrS2Hm50m9GSyK2EROuXOUqIyD1pbz7TJR7/sZIROT3k0RiwJI84zzYVhU+JKAmF3kS/uIfKhsD9zYQEvOw+QxisipJpbLOETHIaMVAry7C9molA/ibbEhwSjWU6xS/GxAMbbvRqQgLR0JyqNTQy6RRV3E2WxJCoBzZnE8Lp07ZwUF+PIJnaqLtvke2MSHrE701IyMg4glbZjCC1tnZiHGAjYi/ERsLa8U1a/fjI8vFhROLTycmAoBdEOCOXB6yVrUibkezN6pzBBBtp5br77uBX7t/Gnvpi5B/izSC6TI/GjKZHom6HrmX/sZ8qS6RkaBMJ+NXjMisRG0wQ2AX+lbr7p5S/cXar7HZFkpqTdaNmUwR2aEj0KCR8e+eT4iNP7xK0dkwYTU5vVlrxOGVA2zzKsihvKdCHr8vKKvxRiAO18x3kwtOfJ04mSfYKqc3QdErnors0L6/joJIzsCOR2UlAqiVFbEgEGxGpOmFjWiJx7SbAuBWJe+UcOn7xFXDx1lH9NPVGoFuL8EpuTCJztcQhM5QoZ9HcSgbZGZHosEBxcNXfUh2vwgkq3cUoe/qeD641UwmxEm6bZdVo5FIlEmAusKNq3p9SN93gG4JMqZgxWoYBz6yj6QWpLgZqn/CzCRdxDDauFTLIEB5amcJwkY8qHCy3kSP4bSmwz8X9ybuc4pIIV7uT965Bg/4nGjSu+KtDEbVJ06tLmyYpo+JQf6/ARvz/Wd5Wiejz8ZqkPWVFbWVnCwU2PngYvy5KCvBYaEFEkw9AutktbQN/ZrTJh4GXb50snJRBtsmnc1ULCIZfiSP5mhECabE0Q8aniXEjo4vSGEQKcTFly9F4UDzbsCU0wHQEpfoZHNoFBCB7rVQRsXMraxLtdB9IVMLMiV6WqIcmLs/UyETanchX3n0dIwI9hzOa5mq35Srvvo6JRrsrTt4s7I02UMgUF36ZwHSPj3MSW9OVBNROtYsyZi72HmBOSTTbaXeVqFS/G9qJ+0orZVlURaKd3H39PEffV8p9Q2JBLej7+Wke1FGgVZlHUd42AIpnRVWJR7DiSQ+3VUiYlx3vkujxkTc6TT4TJdbArGS1/kxI3qbNYq6hcZLEFXjMmKo7juxqv6Emn7BQb4CZ4DS67YBYmaQXE0L+4WAX5MoOkzaSB0bR3m+l7Pe8kdJ05FRXK6c3JA+MfcGUleL7vltSIvkQlOp9TONe/PzpVpoJ+z4tuTOreh8T5CO51OP5ltRKn9ZOtLhJzv6tskRCPplxfTp/MNkYkfREt89Q6UBppVHrUw19jf5fit1KWWzc7dATrsn36hIJVO8K/ev8z9vaaS8oKJtUB6AhsdtUWbnb36n0a+7dlSnYqWxOpnbwxVqBquhs99qIFwWP2k7x/YcRK2kB/5/Jtymx9llS1Fk8lV4IwEphwq9CNaqeFQexVLut5GF11uIwVsIZ1SYfGxKtdPSqY16icznk2HSPj5WnEbRYGyi6v8NSp50WGl3ar9jpBtUlTIx5DWdfTlQ/MD4JdPMyThCZeRjSXYGGHvd0u8NA8wVaEYo7X2ak8YqwJxJxbj209xbVl6AFrlffXAhVGmB6A449U+QO+1apySdbUpNPXU3USD6/o+Uiq3LCLwdQ2CyxBt4XheFS8pJF/vpDT1wknx9OJAzS5f6Cx5lgy1sCoonhQWjfoUGr7Li01TdA/0s6bXLOqnVS06qMiu3CG7QGCINvd/kgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgyP+LfwFZMU1iqvnnkQAAAABJRU5ErkJggg==" height="40" alt="tailwind logo"  />
  <img width="12" />
  <img src="data:image/png;base64,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" height="40" alt="lucia logo"  />
  <img width="12" />
</div>

###
