import { db , schema } from '../../config/dbConfig';
import { QueryResult } from 'pg';
import { IBldg } from './building.model';

const getBuildingByBldgid = async (bldg_id : number) : Promise<IBldg[]> => {
    const query = `
        SELECT
            bldg_id,
            bldg_sn,
            rds_sn,
            sig_cd,
            emd_cd,
            lotno_addr,
            road_nm_addr,
            COALESCE(bldg_nm::text , '') as bldg_nm,
            ST_asText(bldg_geom) as wkt,
            gro_flo_co,
            und_flo_co,
            bdtyp_cd,
            TO_CHAR(crt_dt AT TIME ZONE 'Asia/seoul' , 'YYYY-MM-DD HH24:Mi:SS.USOF') AS crt_dt,
            COALESCE(TO_CHAR(mdfcn_dt AT TIME ZONE 'Asia/seoul' ,'YYYY-MM-DD HH24:Mi:SS.USOF' ), '') as mdfcn_dt,
            COALESCE(TO_CHAR(recent_poi_dtl_crt_dt AT TIME ZONE 'Asia/seoul' ,'YYYY-MM-DD HH24:Mi:SS.USOF' ), '') as recent_poi_dtl_crt_dt
            FROM ${schema}.bldg
        where bldg_id = $1
    `
    try{
        const result: QueryResult = await db.query(query , [bldg_id]);
        return result.rows as IBldg[];
    }catch(error){
        console.error('Error Dao getBuildingByBldgid: ', error);
        const errorMessage = (error as Error).message
        throw new Error(errorMessage)
    }
}

const getBuildingBySigCdLimit20 = async (sig_cd : number) : Promise<IBldg[]> => {
    const query = `
     select * from ${schema}.bldg where sig_cd = $1 limit 20
    `
    try{
        const result: QueryResult = await db.query(query , [sig_cd]);
        return result.rows as IBldg[];
    }catch(error){
        console.error('Error Dao getBuildingBySigCdLimit20: ', error);
        const errorMessage = (error as Error).message
        throw new Error(errorMessage)
    }
}
const getBuildingLikesBldgNmLimit50 = async (bldg_nm: string): Promise<IBldg[]> => {
    const query = `
     select * from ${schema}.bldg where bldg_nm like $1 limit 50
    `
    try {
        const result: QueryResult = await db.query(query, [`%${bldg_nm}%`]);
        return result.rows as IBldg[];
    } catch(error) {
        console.error('Error Dao getBuildingLikesBldgNmLimit50: ', error);
        const errorMessage = (error as Error).message
        throw new Error(errorMessage)
    }
}


export default {
    getBuildingByBldgid,
    getBuildingBySigCdLimit20,
    getBuildingLikesBldgNmLimit50
}