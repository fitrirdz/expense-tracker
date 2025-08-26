import Cookies from 'js-cookie';

export function logout(): void {
  Cookies.remove('auth_token');
  Cookies.remove('user_data');
}
