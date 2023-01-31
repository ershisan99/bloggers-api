import { z } from 'zod'

const websiteRegex = new RegExp(
  '^https://([a-zA-Z0-9_-]+.)+[a-zA-Z0-9_-]+(/[a-zA-Z0-9_-]+)*/?$',
)

export const BlogSchema = z.object({
  id: z.string(),
  name: z
    .string({ required_error: 'Name is required' })
    .max(15, 'Name is too long'),
  description: z
    .string({
      required_error: 'Description is required',
    })
    .max(500, 'Description is too long'),
  websiteUrl: z
    .string({ required_error: 'Website url is required' })
    .max(100, 'Website url is too long')
    .regex(websiteRegex, 'Website url is invalid'),
})

export type Blog = z.infer<typeof BlogSchema>

export const CreateBlogInputSchema = BlogSchema.omit({
  id: true,
})
export type CreateBlogInput = z.infer<typeof CreateBlogInputSchema>
