import { withPgAdapter } from "@bemi-db/prisma"
import { PrismaClient } from "@prisma/client"

import { env } from "./env"

const createPrismaClient = () => {
  const connectionString = `${env.RDS_ENGINE}://${env.RDS_USERNAME}:${env.RDS_PASSWORD}@${env.RDS_HOST}:${env.RDS_PORT}/${env.RDS_DBNAME}`

  const client = new PrismaClient({
    datasourceUrl: connectionString,
  })

  return withPgAdapter(client)
}

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db

export * as prismaExport from "@prisma/client"
