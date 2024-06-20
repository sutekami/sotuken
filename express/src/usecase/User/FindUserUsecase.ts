import { UserRepository } from "interfaces/repository/UserRepository";

export class FindUserUsecase {
  private params: UserType;

  constructor(params: UserType) {
    this.params = params;
  }

  async handle() {
    const user = await UserRepository.find_by(this.params);
    if (user?.password === this.params.password) return user;
    else throw new Error('パスワードが一致していません');
  }
}
