import { UserRepository } from "interfaces/repository/UserRepository";

export class FindUserUsecase {
  private params: UserType;
  private userRepository: UserRepository;

  constructor(params: UserType, userRepository: UserRepository) {
    this.params = params;
    this.userRepository = userRepository;
  }

  async handle() {
    const user = await this.userRepository.find_by(this.params);
    if (user?.password === this.params.password) return user;
    else throw new Error('パスワードが一致していません');
  }
}
