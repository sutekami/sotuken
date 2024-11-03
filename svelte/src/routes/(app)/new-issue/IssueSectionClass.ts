import { IssueSectionalOptionClass } from './IssueSectionalOptionClass';

export class IssueSectionClass {
  private _title: string = '';
  private _hash: string;
  private _issueSectionalOptions: IssueSectionalOptionClass[] = [];

  constructor() {
    this._hash = crypto.randomUUID();
  }

  get title(): string {
    return this._title;
  }

  set title(title: string) {
    this._title = title;
  }

  get hash(): string {
    return this._hash;
  }

  get issueSectionalOptions(): IssueSectionalOptionClass[] {
    return this._issueSectionalOptions;
  }

  set issueSectionalOptions(options: IssueSectionalOptionClass[]) {
    this._issueSectionalOptions = options;
  }

  createIssueSectionalOption(): IssueSectionalOptionClass {
    return new IssueSectionalOptionClass(this._hash);
  }
}
