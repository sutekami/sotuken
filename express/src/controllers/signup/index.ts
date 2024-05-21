import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function index(req: Request, res: Response, next: NextFunction) {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
  res.send('this is signup Response');
}

function update() {

}

function destroy() {

}

export default {
  index: index,
  update: () => {},
  destroy: () => {},
};
