import { hashPassword } from "../lib/auth"
import { PrismaClient } from "@prisma/client"
import { env } from "process"
const prisma = new PrismaClient()

const main = async () => {
  await prisma.admin.create({
    data: {
      pass1: await hashPassword(env.pass1 as string),
      pass2: await hashPassword(env.pass2 as string),
      pass3: await hashPassword(env.pass3 as string),
      pass4: await hashPassword(env.pass4 as string),
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
