import axios from "axios";

const $host = axios.create({
  baseURL: "/api",
});
const $authHost = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || "http://localhost:3000/",
});

export { $host, $authHost };
