import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
dotenv.config();

class SeoulService {
  private readonly API_KEY: string;
  private readonly BASE_URL: string = 'http://openapi.seoul.go.kr:8088';

  constructor() {
    this.API_KEY = process.env.SEOUL_API_KEY || '';
  }

  private async request<T>(endpoint: string, params?: object): Promise<AxiosResponse<T>> {
    return axios.get(`${this.BASE_URL}/${this.API_KEY}/json${endpoint}`, { params });
  }

  async getCityData_ppltn(query: string) {
    const endpoint = `/citydata_ppltn/1/5/${encodeURIComponent(query)}`;
    return this.request(endpoint);
  }

  async getCityData(query: string) {
    const endpoint = `/citydata/1/5/${encodeURIComponent(query)}`;
    return this.request(endpoint);
  }
}

export default new SeoulService();
