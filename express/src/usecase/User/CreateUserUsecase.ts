import { UserRepository } from "interfaces/repository/UserRepository";

export class CreateUserUsecase {
  private params: UserType;
  private userRepository: UserRepository;

  constructor(params: UserType, userRepository: UserRepository) {
    this.params = params;
    this.userRepository = userRepository;
  };

  async handle() {
    const user = await this.userRepository.create(this.params);
    return user;
  }
}
