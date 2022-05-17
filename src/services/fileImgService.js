import AXIOS from "./authHeader";

const getImageFileById = (id) => {
  return AXIOS({
    url: `image/file/${id}`, //your url
    method: "GET",
    // timeout: 1000 * 60 * 30,
    responseType: "blob", // important
  });
};
const addImageFile = (data) => {
  return AXIOS.post("image/file/", data);
};
const updateImageFile = (data) => {
  return AXIOS.put("image/file/", data);
};
const deleteImageFile = (id) => {
  return AXIOS.delete(`image/file/${id}`);
};
export default {
  getImageFileById,
  addImageFile,
  updateImageFile,
  deleteImageFile,
};
