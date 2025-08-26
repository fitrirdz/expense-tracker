import { AxiosResponse } from 'axios';
import api from './api';

export interface AuthPayload {
  password: string;
  username: string;
}

export function signup(
  payload: AuthPayload
): Promise<AxiosResponse<AuthPayload>> {
  return api.post<AuthPayload>('register', payload);
}

export function login(
  payload: AuthPayload
): Promise<AxiosResponse<AuthPayload>> {
  return api.post<AuthPayload>('login', payload);
}
