import { User } from '@prisma/client';
import { prisma } from 'infra/prisma_client';

export class UserRepository implements IRepository<User> {
  constructor() {}

  static async find(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        userId: id,
      },
    });
    await prisma.$disconnect();
    return user;
  }

  static async findBy(params: User) {
    const user = await prisma.user.findUnique({
      where: {
        name: params.name,
      },
    });
    await prisma.$disconnect();
    return user;
  }

  static async create(params: User) {
    const user = await prisma.user.create({
      data: {
        name: params.name,
        password: params.password,
      },
    });
    await prisma.$disconnect();
    return user;
  }
}
