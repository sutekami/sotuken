const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const main = async () => {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

const create = async () => {
  await prisma.user.create({
    data: {
      name: "test_user",
      email: "test@example.com",
      password: "test",
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
