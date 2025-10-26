import axios from "axios";

const API = axios.create({
  baseURL: "https://bharatnaai-production.up.railway.app",
  headers: {
    "ngrok-skip-browser-warning": "true", // ✅ Required for ngrok requests
  },
});

export default API;
