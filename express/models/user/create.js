const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const Joi = require('joi');

const schema = Joi.object({
  a: Joi.number()
})

const create = async (data) => {
  const user = await prisma.user.create({
    data: data
  });
  return user;
}

module.exports = create;
