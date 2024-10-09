import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"
import { Pool } from "pg"

import { env } from "./env"

const createPrismaClient = () => {
  const connectionString = `${env.RDS_ENGINE}://${env.RDS_USERNAME}:${env.RDS_PASSWORD}@${env.RDS_HOST}:${env.RDS_PORT}/${env.RDS_DBNAME}`

  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)

  const client = new PrismaClient({
    adapter,
  })

  return client

  //  return withPgAdapter(client)
}

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db

export * as prismaExport from "@prisma/client"
