import axios from 'axios';
import Cookies from 'js-cookie';

const AUTH_TOKEN = Cookies.get('auth_token') || '';

const api = axios.create({
  baseURL: 'https://sakuu.akmd.dev/api/v1',
  headers: {
    Authorization: AUTH_TOKEN,
    Accept: 'application/json',
  },
});

export default api;
