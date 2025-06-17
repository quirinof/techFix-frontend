import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJIYWxseSIsImVtYWlsIjoiaGFsbEBnbWFpbC5jb20ifSwiaWF0IjoxNzUwMTk2MjI5LCJleHAiOjE3NTAyODI2Mjl9._EogQedDPEcEK3KLF8eV3yZN2u8FnWkrfMxb6MjMp6c`;
  }
  return config;
});

export default api;
