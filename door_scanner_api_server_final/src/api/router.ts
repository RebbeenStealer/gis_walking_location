import { Express } from "express";
import  kakao from './kakao/index';
import seoul from './seoul/index'

// const mountRouters = (app:Express) => {
//     app.use('/buildings',building)
// }

const mountRouters = (app:Express) => {
    app.use('/api', kakao)
    app.use('/data', seoul)
}

export default mountRouters;