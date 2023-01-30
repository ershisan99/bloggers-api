import { Router } from 'express'
import { CreateVideoInputSchema } from './video.schema'
import {
  createVideoHandler,
  deleteVideoHandler,
  getVideoByIdHandler,
  getVideosHandler,
  updateVideoHandler,
} from './video.controller'
import { validateRequest } from '../../../middlewares'
import { ParamsWithId } from '../../../interfaces/ParamsWithId'

export const videoRouter = Router()

videoRouter.get('/', getVideosHandler)
videoRouter.get(
  '/:id',
  validateRequest({ params: ParamsWithId }),
  getVideoByIdHandler,
)
videoRouter.post(
  '/',
  validateRequest({ body: CreateVideoInputSchema }),
  createVideoHandler,
)
videoRouter.put(
  '/:id',
  validateRequest({ body: CreateVideoInputSchema, params: ParamsWithId }),
  updateVideoHandler,
)
videoRouter.delete(
  '/:id',
  validateRequest({ params: ParamsWithId }),
  deleteVideoHandler,
)
