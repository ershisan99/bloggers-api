import { db } from '../../db'
import { CreatePostInput, Post } from './post.schema'
import { nanoid } from 'nanoid'
import { Api404Error } from '../../../error-handling/api-404-error'

export async function findPosts() {
  return db.posts
}

export async function findPostById(id: string) {
  return db.posts.find((post) => post.id === id)
}

export async function createPost(post: CreatePostInput) {
  const blogName = db.blogs.find((blog) => blog.id === post.blogId)?.name

  if (!blogName) {
    throw new Api404Error('Blog not found')
  }

  const newPost: Post = {
    ...post,
    id: nanoid(),
    blogName,
  }
  db.posts.push(newPost)
  return newPost
}

export async function updatePost(post: CreatePostInput, postId: string) {
  const blogName = db.blogs.find((blog) => blog.id === post.blogId)?.name

  if (!blogName) {
    throw new Api404Error('Blog not found')
  }
  const postIndex = db.posts.findIndex((p) => p.id === postId)
  if (postIndex === -1) {
    throw new Api404Error('Post not found')
  }

  const updatedPost: Post = {
    ...post,
    blogName,
    id: postId,
  }

  db.posts[postIndex] = updatedPost

  return updatedPost
}

export async function deletePost(postId: string) {
  const postIndex = db.posts.findIndex((p) => p.id === postId)

  if (postIndex === -1) {
    throw new Api404Error('Post not found')
  }

  db.posts.splice(postIndex, 1)
}
