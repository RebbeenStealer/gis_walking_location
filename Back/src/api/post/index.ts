import express from 'express'
import ctrl from './controller/post.ctrl'

const router = express.Router();

router.post('/write_post', ctrl.createPost)

export default router;