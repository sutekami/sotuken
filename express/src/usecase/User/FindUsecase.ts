import { User } from '@prisma/client';
import { UserRepository } from 'interfaces/repository/UserRepository';

export class FindUsecase implements IUsecase {
  private params: User;

  constructor(params: User) {
    this.params = params;
  }

  async handle() {
    const user = await UserRepository.findBy(this.params);
    if (user?.password === this.params.password) return user;
    else throw new Error('パスワードが一致していません');
  }
}
