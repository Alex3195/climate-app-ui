import axios from "axios";
const key = process.env.REACT_APP_TRANSLATION_KEY;
const translate = (text, lang) => {
  return axios.post(
    "https://translation.googleapis.com/language/translate/v2",
    {},
    {
      params: {
        q: text,
        target: lang,
        key: key,
      },
    }
  );
};

export default {
  translate,
};
