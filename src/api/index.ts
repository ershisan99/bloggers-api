import express from 'express';
import { videoRouter } from './modules/video/video.route';

const router = express.Router();

router.use('/videos', videoRouter);
export default router;
