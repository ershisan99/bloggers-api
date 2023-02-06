import { BaseError } from './base-error'
import { httpStatusCodes } from '../utils/http-status-codes'

export class Api404Error extends BaseError {
  constructor(
    message: string,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = 'Not found',
  ) {
    super(message, statusCode, description)
  }
}
