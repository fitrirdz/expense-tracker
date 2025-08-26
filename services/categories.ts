import { AxiosResponse } from 'axios';
import api from './api';

export interface CategoriesResponse {
  id: number;
  code: string;
  name: string;
}

export function getCategories(): Promise<AxiosResponse<CategoriesResponse[]>> {
  return api.get<CategoriesResponse[]>('categories');
}

export function addCategory(payload: {
  code: string;
  name: string;
}): Promise<AxiosResponse<CategoriesResponse[]>> {
  return api.post<CategoriesResponse[]>('categories', payload);
}
