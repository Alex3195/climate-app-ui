import AXIOS from "./authHeader";

const getFileById = (id) => {
  return AXIOS({
    url: `file/${id}`, //your url
    method: "GET",
    // timeout: 1000 * 60 * 30,
    responseType: "blob", // important
  });
};
const addFile = (data) => {
  return AXIOS.post("file", data);
};
export default {
  getFileById,
  addFile,
};
