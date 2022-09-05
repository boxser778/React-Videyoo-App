import http from "./httpService";
const apiUrl = process.env.REACT_APP_API_URL;

export const getVideo = (videoId) => http.post(`${apiUrl}/videos/video/${videoId}`);

export const editVideo = video => http.put(`${apiUrl}/videos/${video._id}`,video);

