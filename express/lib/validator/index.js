const ValidationError = require('../error/validationError');

class BaseValidator {
  constructor(data) {
    if (!data || Object.keys(data).length < 1) this.throwError(`Uninitialize validation target, Set validation target you wanna validate`);
    this.data = data;
    for (let [key, value] of Object.entries(data)) this[key] = value;
  }

  validate() {
  }

  presence(...keys) {
    for (let i of keys) if (!this.data.hasOwnProperty(i)) this.throwError(`${i} is not defined`);
    for (let [key, value] of Object.entries(this.data)) {
      if (!value) this.throwError(`${key} is falsy value ("${value}"), expected truthy value`);
    }
  }

  inclusion(key, regexp) {
    this.presence(key);
    if (!regexp.test(this.data[key])) this.throwError(`${key} is invalid value: ${this.data[key]}`);
  }

  eq(key, len) {
    this.presence(key);
    if (this.data[key].length !== len) this.throwError(`${key}(${this.data[key]}) is not equal to ${len}`)
  }

  ne(key) {}
  lt(key) {}
  le(key) {}
  gt(key, len) {
    this.presence(key);
    if (!(this.data[key].length >= len)) this.throwError(`${key} is not greater than or equal to ${len}`);
  }
  ge(key) {}

  type() {
  }

  validateEmail(key) {
    this.presence(key);
    const regexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.inclusion(key, regexp);
  }

  validatePassword(key) {
    this.presence(key);
    this.gt(key, 8);
    const regexp = /[A-Z]{1,}[a-z]{1,}[.!@#$%&*-+_]{1,}[0-9]/g;
    this.inclusion(key, regexp);
  }

  throwError(message) {
    throw new ValidationError(message);
  }
}

module.exports = BaseValidator;
