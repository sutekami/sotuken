import { Session, SessionData } from "express-session";
import { FindUserUsecase } from "usecase/User/FindUserUsecase";

export class SignInController implements IController {
  private params: UserType;
  private session: Session & Partial<SessionData>

  constructor(params: UserType, session: Session) {
    this.params = params;
    this.session = session;
  }

  async handle() {
    const user = await new FindUserUsecase(this.params).handle()
    if (user) this.session.userId = user.userId;
    return user;
  }
}
