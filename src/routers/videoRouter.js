import express from 'express';
import { protectorMiddleware, videoUpload } from '../middlewares';
import { watchVideo, getEditVideo, postEditVideo, getUpload, postUpload, deleteVideo } from '../controllers/videoController';

const videoRouter = express.Router();
videoRouter.get('/:id([0-9a-f]{24})', watchVideo);
videoRouter.route('/:id([0-9a-f]{24})/edit').all(protectorMiddleware).get(getEditVideo).post(postEditVideo);
videoRouter.route('/:id([0-9a-f]{24})/delete').all(protectorMiddleware).get(deleteVideo);
videoRouter
  .route('/upload')
  .all(protectorMiddleware)
  .get(getUpload)
  .post(videoUpload.fields([{ name: 'video' }, { name: 'thumb' }]), postUpload);

export default videoRouter;
