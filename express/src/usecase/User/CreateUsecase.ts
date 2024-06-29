import { User } from "@prisma/client";
import { UserRepository } from "interfaces/repository/UserRepository";

export class CreateUsecase implements IUsecase {
  private params: User;

  constructor(params: User) {
    this.params = params;
  };

  async handle() {
    const user = await UserRepository.create(this.params);
    return user;
  }
}
