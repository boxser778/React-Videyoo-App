import http from "./httpService";

const apiUrl = process.env.REACT_APP_API_URL;

export const deleteUser = async (userId) =>
  await http.delete(`${apiUrl}/users/${userId}`);

export const deleteUserVideos = async (userId) =>
  await http.delete(`${apiUrl}/videos/delete-user-videos/${userId}`);

export const setAdmin = (user) => http.put(`${apiUrl}/users/set-admin`, user);

export const updateUser = (user) => http.put(`${apiUrl}/users/`, user);

export const getUser = (userId) =>
  http.get(`${apiUrl}/users/userInfo/`, userId);
