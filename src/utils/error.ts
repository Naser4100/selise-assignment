export class GeneralError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }

  getCode() {
    return 500;
  }
}

export class BadRequest extends GeneralError {
  constructor(message: string) {
    super(message);
    this.name = 'Bad Request';
  }

  getCode() {
    return 400;
  }
}

export class NotFound extends GeneralError {
  constructor(message: string) {
    super(message);
    this.name = 'Not found';
  }

  getCode() {
    return 404;
  }
}
