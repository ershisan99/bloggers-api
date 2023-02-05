import { Router } from 'express'
import {
  createPostHandler,
  getPostHandler,
  getPostsHandler,
  updatePostHandler,
} from './post.controller'
import { validateBasicAuth, validateRequest } from '../../../middlewares'
import { CreatePostInputSchema } from './post.schema'
import { ParamsWithId } from '../../../interfaces/ParamsWithId'

export const postRouter = Router()

postRouter.get('/', getPostsHandler)

postRouter.get('/:id', getPostHandler)

postRouter.post(
  '/',
  validateBasicAuth,
  validateRequest({ body: CreatePostInputSchema }),
  createPostHandler,
)

postRouter.put(
  '/',
  validateBasicAuth,
  validateRequest({ body: CreatePostInputSchema, params: ParamsWithId }),
  updatePostHandler,
)
