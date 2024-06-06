import validator from "validator";

class Validator {
  protected params: any;
  protected tekitou: Validator;

  constructor(params: any, tekitou: any) {
    this.params = params;
    this.tekitou = tekitou;
  }

  validate() {
  }

  isPassword() {}

  isEmail() {}

  isEmpty() {}
}

const h = {
  name: ['required', 'min:5', "password", ]
}
