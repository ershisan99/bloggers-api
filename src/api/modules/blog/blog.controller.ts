import { NextFunction, Request, Response } from 'express'
import { Blog } from './blog.schema'
import {
  createBlog,
  findBlogById,
  findBlogs,
  updateBlogById,
} from './blog.service'

export async function getBlogsHandler(
  req: Request,
  res: Response<Blog[]>,
  next: NextFunction,
) {
  try {
    const blogs = await findBlogs()
    res.json(blogs)
  } catch (error) {
    next(error)
  }
}
export async function createBlogHandler(
  req: Request<{}, Blog>,
  res: Response,
  next: NextFunction,
) {
  try {
    const newBlog = await createBlog(req.body)
    res.status(201).json(newBlog)
  } catch (error) {
    next(error)
  }
}

export async function getBlogHandler(
  req: Request<{ id: string }>,
  res: Response<Blog | undefined>,
  next: NextFunction,
) {
  try {
    const blog = await findBlogById(req.params.id)
    if (!blog) {
      res.status(404)
      throw new Error('Blog not found')
    }
    res.json(blog)
  } catch (error) {
    next(error)
  }
}

export async function updateBlogHandler(
  req: Request<{ id: string }, Blog>,
  res: Response<Blog>,
  next: NextFunction,
) {
  try {
    const blog = await updateBlogById(req.params.id, req.body)
    if (!blog) {
      res.status(404)
      throw new Error('Blog not found')
    }
    res.json(blog)
  } catch (error) {
    next(error)
  }
}
