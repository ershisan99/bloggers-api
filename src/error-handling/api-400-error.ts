import { BaseError } from './base-error'
import { httpStatusCodes } from '../utils/http-status-codes'

export class Api400Error extends BaseError {
  constructor(
    message: string,
    statusCode = httpStatusCodes.BAD_REQUEST,
    description = 'Bad request',
  ) {
    super(message, statusCode, description)
  }
}
