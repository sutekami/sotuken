export class IssueSectionalOptionClass {
  private _body: string = '';
  private _hash: string;
  private _sectionHash: string;

  constructor(sectionHash: string) {
    this._hash = crypto.randomUUID();
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
