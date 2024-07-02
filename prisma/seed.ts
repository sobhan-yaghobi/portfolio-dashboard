import { PrismaClient } from "@prisma/client"
import { env } from "process"
const prisma = new PrismaClient()

const main = async () => {
  await prisma.admin.create({
    data: {
      pass1: env.pass1 as string,
      pass2: env.pass2 as string,
      pass3: env.pass3 as string,
      pass4: env.pass4 as string,
      pass5: env.pass5 as string,
      pass6: env.pass6 as string,
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
