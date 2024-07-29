import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const main = async () => {
  await prisma.admin.deleteMany()
  await prisma.project.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.technicalGrowth.deleteMany()
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error("error : ", e)
    await prisma.$disconnect()
    process.exit(1)
  })
