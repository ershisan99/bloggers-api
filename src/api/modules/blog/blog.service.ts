import { Blog, CreateBlogInput } from './blog.schema'
import { db } from '../../db'
import { nanoid } from 'nanoid'
const blogs = db.blogs

export async function findBlogs(): Promise<Blog[]> {
  return blogs
}

export async function createBlog(blog: CreateBlogInput): Promise<Blog> {
  const newBlog = {
    id: nanoid(),
    ...blog,
  }
  blogs.push(newBlog)
  return newBlog
}

export async function findBlogById(id: string): Promise<Blog | undefined> {
  return blogs.find((blog) => blog.id === id)
}

export async function updateBlogById(
  id: string,
  newBlog: CreateBlogInput,
): Promise<Blog | undefined> {
  let blogToUpdate = blogs.findIndex((blog) => blog.id === id)

  if (blogToUpdate !== -1) {
    blogs.splice(blogToUpdate, 1, {
      ...blogs[blogToUpdate],
      ...newBlog,
    })
    return blogs[blogToUpdate]
  }

  return undefined
}
