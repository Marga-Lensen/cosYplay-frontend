// WebDev_Jahreskurs/_final-project-MDM/_cosYplay-MaLe/cosYspace-auth/cosYspace-fullstack-SPA/auth-frontend/src/axiosInstance.js

import axios from "axios";
import { API_BASE_URL } from "./config";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // wichtig für Cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
