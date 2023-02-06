import {
  createPost,
  deletePost,
  findPostById,
  findPosts,
  updatePost,
} from './post.service'
import { Request, Response } from 'express'
import { httpStatusCodes } from '../../../utils/http-status-codes'
export async function getPostsHandler(req: Request, res: Response) {
  const posts = await findPosts()
  res.json(posts)
}
export async function createPostHandler(req: Request, res: Response) {
  const posts = await createPost(req.body)
  res.status(httpStatusCodes.CREATED).json(posts)
}

export async function getPostHandler(req: Request, res: Response) {
  const post = await findPostById(req.params.id)
  res.json(post)
}

export async function updatePostHandler(req: Request, res: Response) {
  await updatePost(req.body, req.params.id)
  res.status(httpStatusCodes.NO_CONTENT)
}

export async function deletePostHandler(req: Request, res: Response) {
  await deletePost(req.params.id)
  res.status(httpStatusCodes.NO_CONTENT)
}
