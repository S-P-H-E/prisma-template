# Next.js + Prisma 7 + Neon DB

A modern full-stack setup using Next.js 16, Prisma 7 with the Neon adapter for serverless PostgreSQL.

## Prerequisites

- Node.js 20+ installed
- A [Neon](https://neon.tech) account (free tier available)
- npm, pnpm, or bun package manager 

(for this example I'm using `bun`)

## Installation

### 1. Install Dependencies

```bash
npm install dotenv prisma@latest @prisma/client@latest @prisma/adapter-neon@latest
```

### 2. Set Up Prisma Configuration

Create `prisma.config.ts` in the root directory:

```typescript
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma"
});
```

### 3. Create Prisma Schema

Create `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client"
}

datasource db {
  provider = "postgresql"
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
}
```

### 4. Create Prisma Client with Neon Adapter

Create `prisma/index.ts`:

```typescript
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
export const prisma = new PrismaClient({ adapter })
```

### 5. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
```

**To get your Neon database URL:**

1. Go to [neon.tech](https://neon.tech) and sign up/login
2. Create a new project
3. Copy the connection string from the dashboard
4. Paste it into your `.env` file as `DATABASE_URL`

### 6. Generate Prisma Client

```bash
npx prisma generate
```

### 7. Push Schema to Database

```bash
npx prisma db push
```

## Usage Example

Here's how to use Prisma in your Next.js pages (see `app/page.tsx`):

```typescript
import { prisma } from "@/prisma";

export default async function Home() {
  const data = await prisma.user.findMany();

  return (
    <div>
      <h1>{data[0].name}</h1>
    </div>
  );
}
```

## Key Features

- **Prisma 7**: Latest version with improved TypeScript support
- **Neon Adapter**: Optimized for serverless PostgreSQL on Neon
- **Next.js 16**: Latest Next.js with App Router
- **Type Safety**: Full end-to-end type safety from database to UI

## Common Commands

```bash
# Generate Prisma Client after schema changes
npx prisma generate

# Push schema changes to database
npx prisma db push

# Open Prisma Studio (database GUI)
npx prisma studio

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Development

1. Make changes to `prisma/schema.prisma`
2. Run `npx prisma generate` to update the client
3. Run `npx prisma db push` to apply changes to the database
4. Import and use `prisma` from `@/prisma` in your components

## Notes

- The Neon adapter is specifically designed for serverless environments and edge functions
- Environment variables are automatically loaded via `dotenv/config` in `prisma.config.ts`
- The `.env` file is gitignored for security
- Prisma Client is instantiated once and exported for reuse across your application