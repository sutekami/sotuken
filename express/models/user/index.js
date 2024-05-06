const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const create = require('./create')

const disconnect = async (data) => {
  await prisma.$disconnect();
  return data;
}
const disconnect_with_error = async (e) => {
  await disconnect();
  throw new Error(e, { cause: e })
}

const main = async () => {
  const allUsers = await prisma.user.findMany();
  return allUsers;
}

module.exports = {
  main: () => main().then((data) => disconnect(data)).catch((e) => disconnect_with_error(e)),
  create: (data) => create(data).then((data) => disconnect(data)).catch((e) => disconnect_with_error(e)),
}
