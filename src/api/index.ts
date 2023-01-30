import express from 'express';
import { videoRouter } from './modules/video/video.route';
import { TestingRouter } from './modules/testing/testing.route';

const router = express.Router();

router.use('/videos', videoRouter);
router.use('/testing', TestingRouter);
export default router;
