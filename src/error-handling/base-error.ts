import { HttpStatusCodes } from '../utils/http-status-codes'

export class BaseError extends Error {
  public readonly message: string

  public readonly statusCode: HttpStatusCodes

  constructor(name: string, statusCode: HttpStatusCodes, description: string) {
    super(description)

    Object.setPrototypeOf(this, new.target.prototype)
    this.message = name
    this.statusCode = statusCode
    Error.captureStackTrace(this)
  }
}
