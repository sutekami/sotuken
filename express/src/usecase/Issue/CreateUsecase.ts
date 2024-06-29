import { Issue } from "@prisma/client"
import { IssueRepository } from "interfaces/repository/IssueRepository"

export class CreateUsecase implements IUsecase {
  private params: Issue;

  constructor(params: Issue) {
    this.params = params;
  }

  async handle() {
    const issue = IssueRepository.create(this.params)
    return issue;
  }
}
