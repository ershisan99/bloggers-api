import { BaseError } from './base-error'
import { httpStatusCodes } from '../utils/http-status-codes'

export class Api404Error extends BaseError {
  constructor(
    name: string,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = 'Not found',
  ) {
    super(name, statusCode, description)
  }
}
