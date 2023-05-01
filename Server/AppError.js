class AppError extends Error {
  constructor(errorCode, errorMessage, errorStatus) {
    super(errorMessage);
    this.errorCode = errorCode;
    this.errorStatus = errorStatus;
  }
}

module.exports = AppError;
