import AXIOS from "./authHeader";

const getTemplateByParam = (param) => {
  return AXIOS.get(`data/template/${param}`);
};

export default {
  getTemplateByParam,
};
