import axios from "axios";
const baseUrl = process.env.REACT_APP_HOST;
export let AXIOS = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
});

// Set JSON Web Token in Client to be included in all calls
AXIOS.interceptors.request.use(function (config) {
  console.log("token config");
  const token = localStorage.getItem("token");
  const lang = localStorage.getItem("lang");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  config.headers["Accept-Language"] = lang ? lang : "en";
  return config;
});

export default AXIOS;
