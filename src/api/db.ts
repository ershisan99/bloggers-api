import { Video } from './modules/video/video.schema'
import { Blog } from './modules/blog/blog.schema'
import { Post } from './modules/post/post.schema'

export const db = {
  videos: [] as Video[],
  blogs: [] as Blog[],
  posts: [] as Post[],
}
