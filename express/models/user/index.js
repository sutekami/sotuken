const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const create = require('./create')

const disconnect = async (data) => {
  await prisma.$disconnect();
  return data;
}

const main = async () => {
  const allUsers = await prisma.user.findMany();
  return allUsers;
}

module.exports = {
  main: () => main().then((data) => disconnect(data)),
  create: (data) => create(data).then((data) => disconnect(data)),
}
