import AXIOS from "./authHeader";

const getQueriesList = (data) => {
  return AXIOS.post("researcher/order/list", data);
};
const getQueriesById = (id) => {
  return AXIOS.get(`researcher/order/${id}`);
};
const addQuery = (data) => {
  return AXIOS.post("researcher/order/", data);
};

const deleteQuery = (id) => {
  return AXIOS.delete(`researcher/order/${id}`);
};
const getQueriesBetweenDate = (fromDate, toDate) => {
  return AXIOS.get(`researcher/order/${fromDate}/${toDate}`);
};

export default {
  getQueriesList,
  getQueriesById,
  addQuery,
  deleteQuery,
  getQueriesBetweenDate,
};
