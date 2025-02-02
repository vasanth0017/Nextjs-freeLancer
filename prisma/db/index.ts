import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

let client = globalThis.prisma || new PrismaClient()

if (process.env.NEXT_PUBLIC_ENV === 'development') {
  globalThis.prisma = client
}

export default client
