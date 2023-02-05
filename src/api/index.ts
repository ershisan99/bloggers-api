import express from 'express'
import { videoRouter } from './modules/video/video.route'
import { testingRouter } from './modules/testing/testing.route'
import { blogRouter } from './modules/blog/blog.route'
import { postRouter } from './modules/post/post.route'

const router = express.Router()

router.use('/videos', videoRouter)
router.use('/testing', testingRouter)
router.use('/blogs', blogRouter)
router.use('/posts', postRouter)
export default router
