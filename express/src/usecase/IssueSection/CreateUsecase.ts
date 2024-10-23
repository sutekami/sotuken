import { IssueSection, IssueSectionalOption } from '@prisma/client';
import { IssueSectionRepository } from 'interfaces/repository/IssueSectionRepository';

export class CreateUsecase implements IUsecase {
  private params: IssueSection & { issueSectionalOptions: Array<IssueSectionalOption> };
  private issueId: number;

  constructor(params: IssueSection & { issueSectionalOptions: Array<IssueSectionalOption> }, issueId: number) {
    this.params = params;
    this.issueId = issueId;
  }

  async handle(): Promise<any> {
    const issueSection = IssueSectionRepository.create(this.params, this.issueId);
    return issueSection;
  }
}
