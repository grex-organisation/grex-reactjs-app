import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = 'jwtToken';
const TOKEN_EXPIRY = 57600;

export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
  
  const token = getToken();
    
  if (!token) {
      return false;
  }
  try {
      const { exp } = jwtDecode(token);
      if (exp < Date.now() / 1000) {
          removeToken();
          return false;
      }
  } catch (e) {
      return false;
  }
  return true;
};