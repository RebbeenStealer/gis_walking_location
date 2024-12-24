import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import path from 'path'
import mountRouters from './api/router'
import cors from 'cors'

const app = express()
app.use(cors()); 
app.use(express.json());

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"], // 기본 출처
      imgSrc: ["'self'", "https://t1.daumcdn.net", "https://mts.daumcdn.net", "https://s1.daumcdn.net", "https://dapi.kakao.com"], // 이미지 출처 추가
      scriptSrc: ["'self'", "https://dapi.kakao.com", "http://dapi.kakao.com", "https://t1.daumcdn.net", "https://s1.daumcdn.net"], // 스크립트 출처 추가
      styleSrc: ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"], // 스타일 출처 추가
      frameSrc: ["'self'", "https://dapi.kakao.com"], // iframe을 사용하는 경우 추가
    },
  },
}));

app.use(compression());

// 클라이언트의 빌드된 정적 파일 제공
app.use(express.static(path.join(__dirname, '../..', 'react_map_box', 'dist')));

mountRouters(app);

// 모든 요청에 대해 React 앱의 index.html 파일을 반환
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'react_map_box', 'dist', 'index.html')); 
});



export default app;