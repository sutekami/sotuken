import { Issue } from "@prisma/client";
import { prisma } from "infra/prisma_client";

export class IssueRepository implements IRepository<Issue> {
  static async where(params: {userId?: number, issueId?: number}) {
    const issues = await prisma.issue.findMany({
      where: {...params},
      include: {
        issueSections: {
          include: {
            issueSectionalOptions: true,
          }
        }
      }
    });

    return issues;
  }

  static async create(params: Issue) {
    const issue = await prisma.issue.create({
      data: {
        title: params.title,
        userId: params.userId,
      },
    });
    await prisma.$disconnect();
    return issue;
  }
}
