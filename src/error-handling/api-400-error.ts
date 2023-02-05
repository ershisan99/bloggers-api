import { BaseError } from './base-error'
import { httpStatusCodes } from '../utils/http-status-codes'

export class Api400Error extends BaseError {
  constructor(
    name: string,
    statusCode = httpStatusCodes.BAD_REQUEST,
    description = 'Bad request',
  ) {
    super(name, statusCode, description)
  }
}
