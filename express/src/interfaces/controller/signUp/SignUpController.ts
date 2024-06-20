import { CreateUserUsecase } from 'usecase/User/CreateUserUsecase';
import { Session, SessionData } from "express-session";

export class SignUpController {
  private params: UserType;
  private session: Session & Partial<SessionData>

  constructor(params: UserType, session: Session) {
    this.params = params;
    this.session = session;
  };

  async handle() {
    const user = await new CreateUserUsecase(this.params).handle();
    if (user) this.session.userId = user.userId;
    return user;
  }
}
