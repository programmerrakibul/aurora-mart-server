export class ApiError extends Error {
  statusCode: number;
  details?: unknown;
  constructor(
    message: string,
    name: string,
    statusCode: number,
    details?: unknown,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
    this.details = details;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string = "Bad Request!", details?: unknown) {
    super(message, "BadRequestError", 400, details);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "Resource Not Found!", details?: unknown) {
    super(message, "NotFoundError", 404, details);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string = "Internal Server Error!", details?: unknown) {
    super(message, "InternalServerError", 500, details);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = "Unauthorized Access!", details?: unknown) {
    super(message, "UnauthorizedError", 401, details);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = "Forbidden Access!", details?: unknown) {
    super(message, "ForbiddenError", 403, details);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export class ConflictError extends ApiError {
  constructor(message: string = "Conflict Occurred!", details?: unknown) {
    super(message, "ConflictError", 409, details);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export class ValidationError extends ApiError {
  constructor(message: string = "Validation Failed!", details?: unknown) {
    super(message, "ValidationError", 422, details);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
