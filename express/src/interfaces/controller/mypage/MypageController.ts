import { Issue } from "@prisma/client";
import { Session, SessionData } from "express-session";
import { IssueRepository } from "interfaces/repository/IssueRepository";

export class MypageController implements IController {
  private session: Session & Partial<SessionData>

  constructor(session: Session) {
    this.session = session;
  }

  async index() {
    if (this.session.userId)
      return IssueRepository.where({userId: this.session.userId})
    return null;
  }
}
