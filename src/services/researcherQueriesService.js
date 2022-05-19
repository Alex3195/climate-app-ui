import AXIOS from "./authHeader";

const getQueriesList = () => {
  return AXIOS.get("researcher/order/list");
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
