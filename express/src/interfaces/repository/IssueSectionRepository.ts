import { IssueSection, IssueSectionalOption } from "@prisma/client";
import { prisma } from "infra/prisma_client";

export class IssueSeectionRepository implements IRepository<IssueSection> {
  static async find(id: number) {
    const issueSection = await prisma.issueSection.findUnique({where: {
      issueSectionId: id,
    }});
    await prisma.$disconnect();
    return issueSection;
  }

  static async create(params: IssueSection & { issueSectionalOptions: Array<IssueSectionalOption> }, issueId: number): Promise<IssueSection> {
    const issueSection = prisma.issueSection.create({
      data: {
        issueId: issueId,
        title: params.title,
        issueSectionalOptions: {
          createMany: {
            data: params.issueSectionalOptions,
          },
        },
      },
    });
    await prisma.$disconnect();
    return issueSection;
  }
}
