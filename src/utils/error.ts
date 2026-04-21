export class ApiError extends Error {
  statusCode: number;
  constructor(message: string, name: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string = "Bad Request!") {
    super(message, "BadRequestError", 400);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "Resource Not Found!") {
    super(message, "NotFoundError", 404);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string = "Internal Server Error!") {
    super(message, "InternalServerError", 500);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = "Unauthorized Access!") {
    super(message, "UnauthorizedError", 401);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = "Forbidden Access!") {
    super(message, "ForbiddenError", 403);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export class ConflictError extends ApiError {
  constructor(message: string = "Conflict Occurred!") {
    super(message, "ConflictError", 409);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export class ValidationError extends ApiError {
  details: unknown;
  constructor(message: string = "Validation Failed!", details?: unknown) {
    super(message, "ValidationError", 422);
    this.details = details;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
