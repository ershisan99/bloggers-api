import { Request, Response } from 'express'
import { BlogModel } from '../blog/blog.model'
import { PostModel } from '../post/post.model'

export async function deleteAllDataHandler(req: Request, res: Response) {
  BlogModel.deleteMany()
  PostModel.deleteMany()

  res.sendStatus(204)
}
