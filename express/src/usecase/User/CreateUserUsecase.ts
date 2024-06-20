import { UserRepository } from "interfaces/repository/UserRepository";

export class CreateUserUsecase {
  private params: UserType;

  constructor(params: UserType) {
    this.params = params;
  };

  async handle() {
    const user = await UserRepository.create(this.params);
    return user;
  }
}
