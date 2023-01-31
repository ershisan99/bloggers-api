import { Router } from 'express'
import { validateBasicAuth, validateRequest } from '../../../middlewares'
import { CreateBlogInputSchema } from './blog.schema'
import {
  createBlogHandler,
  getBlogHandler,
  getBlogsHandler,
  updateBlogHandler,
} from './blog.controller'

export const blogRouter = Router()

blogRouter.get('/', getBlogsHandler)
blogRouter.get('/:id', getBlogHandler)

blogRouter.post(
  '/',
  validateBasicAuth,
  validateRequest({ body: CreateBlogInputSchema }),
  createBlogHandler,
)

blogRouter.put(
  '/:id',
  validateBasicAuth,
  validateRequest({ body: CreateBlogInputSchema }),
  updateBlogHandler,
)
