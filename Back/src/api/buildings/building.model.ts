export interface IBldg {
    bldg_id : number;
    bldg_sn : string;
    rds_sn : string;
    sig_cd : string;
    emd_cd : string;
    lotno_addr : string;
    road_nm_addr : string;
    bldg_nm : string;
    wkt : string;
    gro_flo_co : number;
    und_flo_co : number;
    bdtyp_cd : string;
    crt_dt : Date;
    mdfcn_dt: Date;
    poi_dtl_crt_dt : Date;
    distance : number;
}