import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export class UserRepository implements IRepository {
  constructor() {}

  async find(id: number)  {
    const user = await prisma.user.findUnique({where: {
      userId: id
    }});
    await prisma.$disconnect();
    return user;
  };

  find_by() {};

  async create(params: UserType) {
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

  where () {}
}
