import { db } from '../../db'
import { CreatePostInput } from './post.schema'
import { Api404Error } from '../../../error-handling/api-404-error'
import { PostModel } from './post.model'
import { BlogModel } from '../blog/blog.model'

export async function findPosts() {
  return PostModel.find()
}

export async function findPostById(id: string) {
  return PostModel.findById(id)
}

export async function createPost(post: CreatePostInput) {
  const blog = await BlogModel.findById(post.blogId).select('name')
  const blogName = blog?.name
  if (!blogName) {
    throw new Api404Error('Blog not found')
  }

  return PostModel.create({
    ...post,
    blogName,
  })
}

export async function updatePost(post: CreatePostInput, postId: string) {
  const blog = await BlogModel.findById(post.blogId).select('name')
  const blogName = blog?.name
  if (!blogName) {
    throw new Api404Error('Blog not found')
  }
  try {
    return await PostModel.findByIdAndUpdate(
      postId,
      {
        ...post,
        blogName,
      },
      { new: true },
    )
  } catch (err) {
    throw new Api404Error('Post not found')
  }
}

export async function deletePost(postId: string) {
  try {
    await PostModel.findByIdAndDelete(postId)
  } catch (err) {
    throw new Api404Error('Post not found')
  }
}
