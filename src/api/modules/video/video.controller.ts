import { NextFunction, Request, Response } from 'express'
import { CreateVideoInput, Video } from './video.schema'
import {
  createVideo,
  deleteVideoById,
  findVideoById,
  findVideos,
  updateVideoById,
} from './video.service'
import { videoNotFoundError } from '../../utils/video-not-found-error'

export async function getVideosHandler(
  req: Request,
  res: Response<Video[]>,
  next: NextFunction,
) {
  try {
    const videos = await findVideos()
    res.json(videos)
  } catch (error) {
    next(error)
  }
}
export async function createVideoHandler(
  req: Request<{}, Video, CreateVideoInput>,
  res: Response<Video>,
  next: NextFunction,
) {
  try {
    const newVideo = await createVideo(req.body)
    res.status(201).json(newVideo)
  } catch (error) {
    next(error)
  }
}

export async function getVideoByIdHandler(
  req: Request<{ id: string }>,
  res: Response<Video>,
  next: NextFunction,
) {
  try {
    const video = await findVideoById(req.params.id)
    if (!video) {
      res.status(404)
      throw videoNotFoundError(req.params.id)
    }
    res.json(video)
  } catch (error) {
    next(error)
  }
}

export async function updateVideoHandler(
  req: Request<{ id: string }, Video, CreateVideoInput>,
  res: Response<Video>,
  next: NextFunction,
) {
  try {
    const updatedVideo = await updateVideoById(req.params.id, req.body)
    if (!updatedVideo) {
      res.status(404)
      throw videoNotFoundError(req.params.id)
    }
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}

export async function deleteVideoHandler(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const video = await deleteVideoById(req.params.id)
    if (!video) {
      res.status(404)
      throw videoNotFoundError(req.params.id)
    }
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}
