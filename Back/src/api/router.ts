import { Express } from "express";
import  kakao from './kakao/index';
import seoul from './seoul/index'
import user from './user/index'
import post from './post/index'

const mountRouters = (app:Express) => {
    app.use('/api', kakao)
    app.use('/data', seoul)
    app.use('/user', user)
    app.use('/post', post)
}

export default mountRouters;