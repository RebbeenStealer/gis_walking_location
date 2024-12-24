import express from 'express'
import ctrl from './controller/seoul.ctrl'


const router = express.Router();

// 도시데이터 ex) /data/citydata?query=가산디지털단지역
router.get('/citydata', ctrl.getCityData)

// 인구데이터 ex) /data/citydata_ppltn?query=가산디지털잔지역
router.get('/citydata_ppltn', ctrl.getCityData_ppltn)


export default router;