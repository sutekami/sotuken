import { UserRepository } from "interfaces/repository/UserRepository";
import { FindUserUsecase } from "usecase/User/FindUserUsecase";

export class SignInController {
  private params: UserType;

  constructor(params: UserType) {
    this.params = params;
  }

  async handle() {
    const user = await new FindUserUsecase(this.params, new UserRepository()).handle();
    return user;
  }
}
