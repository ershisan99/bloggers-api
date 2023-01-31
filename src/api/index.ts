import express from 'express'
import { videoRouter } from './modules/video/video.route'
import { testingRouter } from './modules/testing/testing.route'
import { blogRouter } from './modules/blog/blog.route'

const router = express.Router()

router.use('/videos', videoRouter)
router.use('/testing', testingRouter)
router.use('/blogs', blogRouter)
export default router
