import { Request , Response } from "express";
import buildingDao from './building.dao';
import axios from 'axios'

const getBuildingByBldgid = async (req:Request , res: Response): Promise<void> => {
    const bldg_id = Number(req.params.bldg_id);

    if(!bldg_id){
        res.status(400).json({success:false , message: "Building ID is required"});
        return
    }

    try{
        const building = await buildingDao.getBuildingByBldgid(bldg_id);
        res.json({success:true , message: "Building fetched successfully", data: building.length === 0 ? [] : building});
    }catch(error) {
        console.error("Error in ctrl getBuildingByBldgid:" , error);
        const errorMessage = (error as Error).message;
        res.status(500).json({success:false , message:errorMessage});
    }
}


const getBuildingBySigCdLimit20 = async (req:Request , res: Response): Promise<void> => {
    const sig_cd = Number(req.params.sig_cd);

    if(!sig_cd){
        res.status(400).json({success:false , message: "sig_cd is required"});
        return
    }

    try{
        const building = await buildingDao.getBuildingBySigCdLimit20(sig_cd);
        res.json({success:true , message: "Building fetched successfully", data: building.length === 0 ? [] : building});
    }catch(error) {
        console.error("Error in ctrl getBuildingBySigCdLimit20:" , error);
        const errorMessage = (error as Error).message;
        res.status(500).json({success:false , message:errorMessage});
    }
}

const getBuildingLikesBldgNmLimit50 = async (req:Request , res: Response): Promise<void> => {
    const bldg_nm = req.query.bldg_nm as string
    
    if(!bldg_nm){
        res.status(400).json({success:false , message: "bldg_nm is required"});
        return
    }

    try{
        const building = await buildingDao.getBuildingLikesBldgNmLimit50(bldg_nm);
        res.json({success:true , message: "Building fetched successfully", data: building.length === 0 ? [] : building});
    }catch(error) {
        console.error("Error in ctrl getBuildingLikesBldgNm:" , error);
        const errorMessage = (error as Error).message;
        res.status(500).json({success:false , message:errorMessage});
    }
}

const getPathfinder = async (req: Request, res: Response): Promise<void> => {
    const { startY, startX, endY, endX, option, service, srid } = req.query;

    if (!startY || !startX || !endY || !endX) {
        res.status(400).json({ success: false, message: "Start and end coordinates are required" });
        return;
    }

    try {
        const response = await axios.get(
            'https://gis-v2-dot-lbstech-korea-service.an.r.appspot.com/v2/gcd/pathfinder', {
            params: {
                startY,
                startX,
                endY,
                endX,
                option,
                service,
                srid: srid || 4326 // SRID의 기본값을 4326으로 설정
            }
        });

        res.json({ success: true, message: "Pathfinder data fetched successfully", data: response.data });
    } catch (error) {
        console.error("Error in ctrl getPathfinder:", error);
        const errorMessage = (error as Error).message;
        res.status(500).json({ success: false, message: errorMessage });
    }
};

export default {
    getBuildingByBldgid,
    getBuildingBySigCdLimit20,
    getBuildingLikesBldgNmLimit50,
    getPathfinder
}
