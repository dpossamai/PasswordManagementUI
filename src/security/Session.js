import Cookies from 'js-cookie';
import jwt from 'jwt-decode'

export const getSession = () => {
    return Cookies.get('Authorization');
}

export const getJwtData = () =>{
  return jwt(Cookies.get('Authorization'));
}

export const setSession = (cookie) => {
  Cookies.set('Authorization', cookie);
}

export const logout = () => {
  Cookies.remove('Authorization');
}