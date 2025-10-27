// axiosConfig.js
import axios from "axios";

// 👇 use the environment variable
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export default API;
