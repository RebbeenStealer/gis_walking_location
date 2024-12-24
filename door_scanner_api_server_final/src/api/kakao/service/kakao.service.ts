import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
dotenv.config();

class KakaoService {
  private readonly API_KEY: string;
  private readonly BASE_URL: string = 'https://dapi.kakao.com/v2/local';

  constructor() {
    this.API_KEY = process.env.REST_API_KEY || '';
  }

  private async request<T>(endpoint: string, params: object): Promise<AxiosResponse<T>> {
    return axios.get(`${this.BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `KakaoAK ${this.API_KEY}`
      },
      params
    });
  }

  async getRegionCode(x: string, y: string) {
    return this.request('/geo/coord2regioncode.json', { x, y });
  }

  async getAddressFromCoordinates(x: string, y: string) {
    return this.request('/geo/coord2address.json', { x, y, input_coord: 'WGS84' });
  }

  async getCoordinatesFromAddress(query: string) {
    return this.request('/search/address.json', { query });
  }

  async getLocationsByCategory(category_group_code: string, y: string, x: string, radius?: number, page?: number) {
    return this.request('/search/category.json', { category_group_code, y, x, radius, page });
}
  
  async getLocationsByKeyword(query: string, category_group_code?: string, y?: string, x?: string,  radius?: number, page?: number) {
    return this.request('/search/keyword.json', { query, category_group_code, y, x, radius, page });
  }
}

export default new KakaoService();
