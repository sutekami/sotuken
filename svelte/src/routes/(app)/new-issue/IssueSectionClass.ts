import { IssueSectionalOptionClass } from './IssueSectionalOptionClass';
import sha256 from 'crypto-js/sha256';

export class IssueSectionClass {
  private _title: string = '';
  private _hash: string;
  private _issueSectionalOptions: IssueSectionalOptionClass[] = [];

  constructor() {
    this._hash = sha256(new Date().toDateString() + Math.random().toString()).toString()
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
