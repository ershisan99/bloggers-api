import {
  createPost,
  deletePost,
  findPostById,
  findPosts,
  updatePost,
} from './post.service'
import { NextFunction, Request, Response } from 'express'
import { httpStatusCodes } from '../../../utils/http-status-codes'
import { Api404Error } from '../../../error-handling/api-404-error'

export async function getPostsHandler(req: Request, res: Response) {
  const posts = await findPosts()
  res.json(posts)
}
export async function createPostHandler(req: Request, res: Response) {
  const posts = await createPost(req.body)
  res.status(httpStatusCodes.CREATED).json(posts)
}

export async function getPostHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const post = await findPostById(req.params.id)
    if (!post) {
      throw new Api404Error('Post not found')
    }
    res.json(post)
  } catch (err) {
    next(err)
  }
}

export async function updatePostHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    await updatePost(req.body, req.params.id)
    res.sendStatus(httpStatusCodes.NO_CONTENT)
  } catch (err) {
    next(err)
  }
}

export async function deletePostHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    await deletePost(req.params.id)
    res.sendStatus(httpStatusCodes.NO_CONTENT)
  } catch (err) {
    next(err)
  }
}
