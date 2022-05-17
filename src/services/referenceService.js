import AXIOS from "./authHeader";

const getReferences = () => {
  return AXIOS.get("references/list");
};
const getReferenceByIdAndLang = (id, lang) => {
  return AXIOS.get(`references/${id}/${lang}`);
};
const addReference = (data) => {
  return AXIOS.post("references/", data);
};
const updateReference = (data) => {
  return AXIOS.put(`references/`, data);
};
const translationReference = (data, lang) => {
  return AXIOS.post(`references/translation/${lang}`, data);
};

const unbindFileReference = (id) => {
  return AXIOS.delete(`references/unbind/${id}`);
};

const deleteRefernce = (id) => {
  return AXIOS.delete(`references/${id}`);
};

export default {
  getReferences,
  getReferenceByIdAndLang,
  addReference,
  updateReference,
  unbindFileReference,
  deleteRefernce,
  translationReference,
};
