const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const BaseValidator = require('../../lib/validator/index')

class Validator extends BaseValidator {
  validate() {
    super.validate();
    this.presence('name', 'email', 'password');
    this.validateEmail('email');
    this.validatePassword('password');
  }
}

const create = async (data) => {
  new Validator(data).validate();
  const user = await prisma.user.create({
    data: data
  });
  return user;
}

module.exports = create;
