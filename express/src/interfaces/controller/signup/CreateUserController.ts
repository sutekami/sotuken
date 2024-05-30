import { UserRepository } from 'interfaces/repository/UserRepository';
import { CreateUserUsecase } from 'usecase/User/CreateUserUsecase';

export class CreateUserController {
  private params: UserType;

  constructor(params: UserType) {
    this.params = params;
  };

  async handle() {
    console.log(this.params);
    const user = await new CreateUserUsecase(this.params, new UserRepository()).handle()
    return user;
  }
}
