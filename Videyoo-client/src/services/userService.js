import http from "./httpService";
import JWTDecode from "jwt-decode";
const apiUrl = process.env.REACT_APP_API_URL;

export const signup = user => http.post(`${apiUrl}/users/register`, user);

export const login = async user => {
  const {
    data: { token },
  } = await http.post(`${apiUrl}/users/login`, user);
  localStorage.setItem("token", token);
};

export const getCurrentUser = () => {
  try {
    const token = localStorage.getItem("token");
    return JWTDecode(token);
  } catch {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  return (window.location = "/");
};

export const getJWT = () => localStorage.getItem("token");

