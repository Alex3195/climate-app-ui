import AXIOS from "./authHeader";

const getCategories = () => {
  return AXIOS.get("topic/categories/list");
};
const getCategoryByIdAndLang = (id, lang) => {
  return AXIOS.get(`topic/categories/${id}/${lang}`);
};
const addCategory = (data) => {
  return AXIOS.post("topic/categories/", data);
};
const updateCategory = (data) => {
  return AXIOS.put(`topic/categories/`, data);
};
const translationCategory = (data, lang) => {
  return AXIOS.post(`topic/categories/translation/${lang}`, data);
};

const unbindFileCategory = (id) => {
  return AXIOS.delete(`topic/categories/unbind/${id}`);
};

const deleteCategory = (id) => {
  return AXIOS.delete(`topic/categories/${id}`);
};
const getTopicCategoriesById = (id, lang) => {
  return AXIOS.get(`topic/categories/${lang}?id=${id}`);
};

export default {
  getCategories,
  addCategory,
  getCategoryByIdAndLang,
  updateCategory,
  translationCategory,
  unbindFileCategory,
  deleteCategory,
  getTopicCategoriesById,
};
