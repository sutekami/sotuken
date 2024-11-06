import sha256 from 'crypto-js/sha256';

export class IssueSectionalOptionClass {
  private _body: string = '';
  private _hash: string;
  private _sectionHash: string;

  constructor(sectionHash: string) {
    this._hash = sha256(new Date().toDateString() + Math.random().toString()).toString()
    this._sectionHash = sectionHash;
  }

  get body(): string {
    return this._body;
  }

  set body(body: string) {
    this._body = body;
  }

  get hash(): string {
    return this._hash;
  }

  get sectionHash(): string {
    return this._sectionHash;
  }
}
