import express from 'express'
// import ctrl from './building.ctrl'
import ctrl from './controller/kakao.ctrl'


const router = express.Router();

// 주소를 좌표로 반환 ex) /api/address?query=전북 삼성동 100
router.get('/address', ctrl.getCoordinatesFromAddress)

// 좌표를 주소로 변환하기 ex) /api/geo?x=126.99597495347&y=35.9766482774572
router.get('/geo', ctrl.getAddressFromCoordinates)

// 좌표를 행정구역으로 변환 ex) /api/region?x=126.99597495347&y=35.9766482774572
router.get('/region', ctrl.getRegionCode)

// 카테고리로 장소 검색 ex) /api/category?category_group_code=CS2&x=126.99597495347&y=35.9766482774572&region=200&page=1
// category_group_code : 카테고리(필수), {x, y} : 중심좌표, region: 범위(meter), page: 페이지
router.get('/category', ctrl.getLocationsByCategory) // 카테고리로 장소 검색

// 키워드 장소 검색 ex) /api/keyword?query=CU&x=126.99597495347&y=35.9766482774572&region=200
// query : 키워드(필수), {x, y} : 중심좌표, region: 범위(meter)
router.get('/keyword', ctrl.getLocationsByKeyword) // 키워드로 장소 검색


// router.get('/pathfinder', ctrl.getPathfinder);
// router.get('/bldg_nm',ctrl.getBuildingLikesBldgNmLimit50)
// //http://localhost:8080/buildings/bldg_nm?bldg_nm=빌딩
// router.get('/bldg_id/:bldg_id',ctrl.getBuildingByBldgid);
// //http://localhost:8080/buildings/bldg_id/해당하는 bldg_id를 넣으면 됩니다.
// router.get('/:sig_cd',ctrl.getBuildingBySigCdLimit20);
// //http://localhost:8080/buildings/sig_cd/해당하는 sig_cd를 넣으면 됩니다.

export default router;