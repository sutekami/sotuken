class ValidationError extends Error {
  name = "ValidationError";
  constructor(message='', fileName='', lineNumber='') {
    message = message || 'Data of validation must be assigned Object or Array'
    super(message, fileName, lineNumber);
  }
}

module.exports = ValidationError;
