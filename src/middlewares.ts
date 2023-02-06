import { NextFunction, Request, Response } from 'express'

import ErrorResponse from './interfaces/ErrorResponse'
import { ZodError } from 'zod'
import RequestValidators from './interfaces/RequestValidators'
import { httpStatusCodes } from './utils/http-status-codes'
import { BaseError } from './error-handling/base-error'
import { Api401Error } from './error-handling/api-401-error'

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404)
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`)
  next(error)
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  if (err instanceof ZodError) {
    res.status(httpStatusCodes.BAD_REQUEST)

    res.json({
      errorsMessages: err.issues.map((issue) => ({
        message: issue.message,
        field: issue.path[0].toString(),
      })),
    })
    return
  }

  if (err instanceof BaseError) {
    console.log(err.message)
    res.status(err.statusCode)

    res.json({
      errorsMessages: [{ message: err.message }],
    })

    return
  }

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500

  res.status(statusCode)
  res.json({
    errorsMessages: [{ message: err.message }],
  })
}

export function validateRequest(validators: RequestValidators) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body, query, params } = req
      if (validators.body) {
        req.body = await validators.body.parseAsync(body)
      }
      if (validators.query) {
        req.query = await validators.query.parseAsync(query)
      }
      if (validators.params) {
        req.params = await validators.params.parseAsync(params)
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}

export function validateBasicAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const auth = { login: 'admin', password: 'qwerty' } // change this

  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const authType = (req.headers.authorization || '').split(' ')[0] || ''

  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

  if (
    authType !== 'Basic' ||
    login !== auth.login ||
    password !== auth.password
  ) {
    throw new Api401Error('Unauthorized')
  }

  return next()
}
