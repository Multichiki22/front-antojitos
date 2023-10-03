import axios from "axios";

const BASE_URL = process.env.REACT_APP_API;

const refresh = axios.create({
  baseURL: BASE_URL,
});

function obtenerTokenDeActualizacion() {
  return localStorage.getItem("refreshToken");
}

refresh.interceptors.request.use(
  (config) => {
    const refreshToken = obtenerTokenDeActualizacion()
    if (refreshToken) {
      config.headers.Authorization = `Bearer ${refreshToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default refresh;
