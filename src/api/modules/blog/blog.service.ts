import { Blog, CreateBlogInput } from './blog.schema'
import { BlogModel } from './blog.model'

export async function findBlogs(): Promise<Blog[]> {
  return BlogModel.find()
}

export async function createBlog(blog: CreateBlogInput): Promise<Blog> {
  return BlogModel.create(blog)
}

export async function findBlogById(id: string): Promise<Blog | null> {
  return BlogModel.findById(id)
}

export async function updateBlogById(
  id: string,
  newBlog: CreateBlogInput,
): Promise<Blog | null> {
  return BlogModel.findByIdAndUpdate(id, newBlog, { new: true })
}

export async function deleteBlogById(id: string): Promise<Blog | null> {
  return BlogModel.findByIdAndDelete(id)
}
