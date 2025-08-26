import { AxiosResponse } from 'axios';
import api from './api';
import Cookies from 'js-cookie';

export interface AuthPayload {
  password: string;
  username: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    created_at: string;
  };
}

export interface RegisterResponse {
  message: string;
  user_id: number;
}

export function signup(
  payload: AuthPayload
): Promise<AxiosResponse<RegisterResponse>> {
  return api.post<RegisterResponse>('register', payload).then((response) => {
    return response;
  });
}

export function login(
  payload: AuthPayload
): Promise<AxiosResponse<LoginResponse>> {
  return api.post<LoginResponse>('login', payload).then((response) => {
    Cookies.set('auth_token', response.data.token, { expires: 7 });
    Cookies.set('user_data', JSON.stringify(response.data.user), { expires: 7 });
    return response;
  });
}
