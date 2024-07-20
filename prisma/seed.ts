import { hashPassword } from "../auth/auth"
import { PrismaClient } from "@prisma/client"
import { env } from "process"
const prisma = new PrismaClient()

const main = async () => {
  await prisma.admin.deleteMany()
  await prisma.admin.create({
    data: {
      pass1: await hashPassword(env.pass1 as string),
      pass2: await hashPassword(env.pass2 as string),
      pass3: await hashPassword(env.pass3 as string),
      pass4: await hashPassword(env.pass4 as string),
      name: "سبحان یعقوبی",
      phone: "989396007232",
      email: "sobhan.yaghobi.work@gmail.com",
      location: "ایران ، مشهد",
      bio: "سلام من سبحان یعقوبی یک برنامه نویس فرانت اند با عشق به دنیا هستمکدنویسی، طراحی و وب من عاشق چیزهای جدید و ایجاد پروژه های جالب هستم.وقتی صحبت از کدنویسی و پروژه های فنی می شود. من همیشه زمانی برای لذت بردن از زندگی پیدا می کنم وسرگرمی هایم مانند ورزش و مطالعه را دنبال کنید (من باید مطالعه خود را افزایش دهمزمان). ترکیب زندگی شخصی با حرفه ای که به آن علاقه دارم بهترین استراه رسیدن به موفقیت و رضایت شغلی من همیشه سعی کردم بین اینها تعادل برقرار کنمدو و از هر دو لذت ببرید",
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
