import AXIOS from "./authHeader";

const getTopics = () => {
  return AXIOS.get("topic/");
};
const getTopicByIdAndLang = (id, lang) => {
  return AXIOS.get(`topic/categories/${id}/${lang}`);
};
const addTopic = (data) => {
  return AXIOS.post("topic/", data);
};
const updateTopic = (data) => {
  return AXIOS.put(`topic/`, data);
};
const translationTopic = (data, lang) => {
  return AXIOS.post(`topic/translation/${lang}`, data);
};

const deleteTopicById = (id) => {
  return AXIOS.delete(`topic/${id}`);
};

export default {
  getTopicByIdAndLang,
  getTopics,
  addTopic,
  translationTopic,
  updateTopic,
  deleteTopicById,
};
