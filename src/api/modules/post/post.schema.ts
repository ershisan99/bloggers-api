import { z } from 'zod'
import { findBlogById } from '../blog/blog.service'

export const PostSchema = z.object({
  id: z.string({ required_error: 'Id is required' }),

  title: z
    .string({ required_error: 'Title is required' })
    .trim()
    .min(1, { message: 'Title is too short.' })
    .max(30, { message: 'Title is too long.' }),

  shortDescription: z
    .string({
      required_error: 'Short description is required',
    })
    .trim()
    .min(1, { message: 'Short description is too short.' })
    .max(100, { message: 'Short description is too long.' }),

  content: z
    .string({ required_error: 'Content is required' })
    .trim()
    .min(1, { message: 'Content is too short.' })
    .max(1000, {
      message: 'Content is too long.',
    }),

  blogId: z.string({ required_error: 'Blog id is required' }).refine(
    async (id) => {
      const blog = await findBlogById(id)
      return !!blog
    },
    { message: 'Blog not found' },
  ),

  blogName: z.string({ required_error: 'Blog name is required' }),
})

export type Post = z.infer<typeof PostSchema>

export const CreatePostInputSchema = PostSchema.omit({
  id: true,
  blogName: true,
})

export type CreatePostInput = z.infer<typeof CreatePostInputSchema>
