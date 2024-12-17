import { User } from '@/types/context/AuthContext';
import Cookies from 'js-cookie';

const COOKIE_NAME = 'auth_user';

export const setAuthCookie = (user: User): void => {
  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + 30); 
  Cookies.set(COOKIE_NAME, JSON.stringify(user), { expires: expirationTime });
};

export const getAuthCookie = (): User | null => {
  const user = Cookies.get(COOKIE_NAME);
  
  if (user) {
    try {
      return JSON.parse(user) as User;
    } catch (error) {
      console.error("Error parsing user data from cookie", error);
      return null;
    }
  }
  return null;
};

export const removeAuthCookie = (): void => {
  Cookies.remove(COOKIE_NAME);
};