import axios from "axios";
import refresh from "./axiosRefresh";



const BASE_URL = process.env.REACT_APP_API;

const api = axios.create({
  baseURL: BASE_URL,
});

let isRefreshing = false;
let refreshSubscribers = [];

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function guardarTokenDeAcceso(nuevoTokenDeAcceso) {
  localStorage.setItem("accessToken", nuevoTokenDeAcceso);
}

api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log("Axios request error:", error);
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return refresh
        .post("/auth/refresh")
        .then((response) => {
          const newAccessToken = response.data.accesToken;
          guardarTokenDeAcceso(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          replayFailedRequests();
          return api(originalRequest);
        })
        .catch((refreshError) => {
         alert("Por seguridad debe volver a ingresar")
         localStorage.removeItem("accessToken");
         localStorage.removeItem("refreshToken");
          window.location.href = '/login';

          return Promise.reject(refreshError);
        })
        .finally(() => {
          isRefreshing = false;
          refreshSubscribers = [];
        });
    }else {
      return Promise.reject(error);
    }
  }
);

function replayFailedRequests() {
  refreshSubscribers.forEach((callback) => callback(getAccessToken()));
  refreshSubscribers = [];
}

export default api;
