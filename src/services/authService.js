import axios, { Axios } from "axios";
const API_URL = process.env.REACT_APP_HOST;

const logIn = (data) => {
  return axios.post(API_URL + "login", data).then((response) => {
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
    }
    return response.data;
  });
};
const logOut = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
const register = (data) => {
  return axios.post(API_URL + "register", data);
};
export default {
  logIn,
  logOut,
  register,
};
