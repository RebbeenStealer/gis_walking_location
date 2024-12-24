import express from "express";
import axios from "axios";
// import weatherConfig from "../../config/apiConfig";

const getWeatherApi = async () => {
    // const url = weatherConfig();

    try {
        const response = axios.get(url)
    } catch (error){};
}

export {
    getWeatherApi,
}