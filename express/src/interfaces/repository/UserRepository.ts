import { User } from '@prisma/client';
import { prisma } from 'infra/prisma_client';

export class UserRepository implements IRepository<User> {
  constructor() {}

  static async find(id: number) {
    const user = await prisma.user.findUnique({where: {
      userId: id
    }});
    await prisma.$disconnect();
    return user;
  };

  static async find_by(params: User) {
    const user = await prisma.user.findUnique({
      where: {
        email: params.email
      },
    });
    await prisma.$disconnect();
    return user;
  };

  static async create(params: User) {
    const user = await prisma.user.create({
      data: {
        name: params.name,
        password: params.password,
        email: params.email,
      }
    });
    await prisma.$disconnect();
    return user;
  };
}
