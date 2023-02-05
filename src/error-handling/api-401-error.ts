import { BaseError } from './base-error'
import { httpStatusCodes } from '../utils/http-status-codes'

export class Api401Error extends BaseError {
  constructor(
    name: string,
    statusCode = httpStatusCodes.UNAUTHORIZED,
    description = 'Unauthorized',
  ) {
    super(name, statusCode, description)
  }
}
