import { Issue, IssueSection, IssueSectionalOption } from "@prisma/client";
import { CreateUsecase as CreateIssueUsecase } from "usecase/Issue/CreateUsecase";
import { CreateUsecase as CreateIssueSectionUsecase } from "usecase/IssueSection/CreateUsecase";
import { CreateUsecase as CreateIssueSectionalOptionUsecase } from "usecase/IssueSectionalOption/CreateUsecase";

export class IssueController implements IController {
  private params: Issue & { issueSections: Array<IssueSection & { issueSectionalOptions: Array<IssueSectionalOption> }> };

  constructor(params: Issue & { issueSections: Array<IssueSection & { issueSectionalOptions: Array<IssueSectionalOption> }> }) {
    this.params = params;
  }

  async create() {
    const issue = await new CreateIssueUsecase(this.params).handle();
    for (let section of this.params.issueSections) {
      await new CreateIssueSectionUsecase(section, issue.issueId).handle();
    }
    return issue;
  }
}
