import { User } from "@prisma/client";
import { Session, SessionData } from "express-session";
import { FindUsecase } from "usecase/User/FindUsecase";

export class SignInController implements IController {
  private params: User;
  private session: Session & Partial<SessionData>

  constructor(params: User, session: Session) {
    this.params = params;
    this.session = session;
  }

  async handle() {
    const user = await new FindUsecase(this.params).handle()
    if (user) this.session.userId = user.userId;
    return user;
  }
}
