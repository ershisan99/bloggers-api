import { HttpStatusCodes } from '../utils/http-status-codes'

export class BaseError extends Error {
  public readonly message: string

  public readonly statusCode: HttpStatusCodes

  constructor(
    message: string,
    statusCode: HttpStatusCodes,
    description: string,
  ) {
    super(description)

    Object.setPrototypeOf(this, new.target.prototype)
    this.message = message
    this.statusCode = statusCode
    // Error.captureStackTrace(this)
  }
}
