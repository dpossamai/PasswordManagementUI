import axios from "axios";
import { getSession } from '../security/Session';


const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {'Content-Type': 'application/json' }
});

api.interceptors.request.use(config => {
  const token = getSession();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default api;