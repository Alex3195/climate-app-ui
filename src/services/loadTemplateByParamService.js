import AXIOS from "./authHeader";

const getTemplateByParam = (param) => {
  return AXIOS({
    url: `/file/load-param-template/`,
    method: "GET",
    responseType: "blob",
  });
};

export default {
  getTemplateByParam,
};
