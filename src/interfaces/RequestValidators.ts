import { AnyZodObject } from 'zod'

interface RequestValidators {
  body?: AnyZodObject
  query?: AnyZodObject
  params?: AnyZodObject
}

export default RequestValidators
