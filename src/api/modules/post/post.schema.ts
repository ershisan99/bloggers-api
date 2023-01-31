import { z } from 'zod'

export const PostSchema = z.object({
  id: z.string({ required_error: 'Id is required' }),
  title: z.string({ required_error: 'Title is required' }),
  shortDescription: z.string({
    required_error: 'Short description is required',
  }),
  content: z.string({ required_error: 'Content is required' }),
  blogId: z.string({ required_error: 'Blog id is required' }),
  blogName: z.string({ required_error: 'Blog name is required' }),
})

export type Post = z.infer<typeof PostSchema>

export const CreatePostInputSchema = PostSchema.omit({
  id: true,
  blogName: true,
})
