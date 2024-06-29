import { CreateUsecase } from 'usecase/User/CreateUsecase';
import { Session, SessionData } from "express-session";
import { User } from '@prisma/client';

export class SignUpController {
  private params: User;
  private session: Session & Partial<SessionData>

  constructor(params: User, session: Session) {
    this.params = params;
    this.session = session;
  };

  async handle() {
    const user = await new CreateUsecase(this.params).handle();
    if (user) this.session.userId = user.userId;
    return user;
  }
}
