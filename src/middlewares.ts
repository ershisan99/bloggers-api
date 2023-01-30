import { NextFunction, Request, Response } from 'express';

import ErrorResponse from './interfaces/ErrorResponse';
import { ZodError } from 'zod';
import RequestValidators from './interfaces/RequestValidators';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>) {
  if (err instanceof ZodError) {
    const statusCode = 400;
    res.status(statusCode);
    res.json({
      errorMessages: err.issues.map((issue) => ({ message: issue.message, field: issue.path[0].toString() })),
    });
    return;
  }
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    errorMessages: [{ message: err.message }],
  });
}


export function validateRequest(validators: RequestValidators) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body, query, params } = req;
      if (validators.body) {
        req.body = await validators.body.parseAsync(body);
      }
      if (validators.query) {
        req.query = await validators.query.parseAsync(query);
      }
      if (validators.params) {
        req.params = await validators.params.parseAsync(params);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
