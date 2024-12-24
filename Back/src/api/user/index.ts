import express from 'express'
import ctrl from './controller/user.ctrl'


const router = express.Router();

router.post('/signup', ctrl.signup)

export default router;