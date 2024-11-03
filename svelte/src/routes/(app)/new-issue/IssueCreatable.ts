import { IssueSectionClass } from './IssueSectionClass';

export class IssueCreatable {
  private _title: string = '';
  private _issueSections: IssueSectionClass[] = [];

  get title(): string {
    return this._title;
  }

  set title(title: string) {
    this._title = title;
  }

  get issueSections(): IssueSectionClass[] {
    return this._issueSections;
  }

  set issueSections(sections: IssueSectionClass[]) {
    this._issueSections = sections;
  }

  createIssueSection(): IssueSectionClass {
    return new IssueSectionClass();
  }
}
