import { Video } from './modules/video/video.schema'
import { Blog } from './modules/blog/blog.schema'
import { Post } from './modules/post/post.schema'

export const db = {
  videos: [] as Video[],
  blogs: [
    {
      id: '1',
      name: 'string',
      websiteUrl: 'https://something.org',
      description: 'string',
    },
  ] as Blog[],
  posts: [] as Post[],
}
