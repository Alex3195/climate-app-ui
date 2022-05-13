import React, { useEffect, useState } from "react";
import googleTranslateApi from "../../services/googleTranslateApi";

function Translation({ text, language }) {
  const [convertedText, setConvertedText] = useState("");

  useEffect(() => {
    googleTranslateApi
      .translate(text, language)
      .then((res) => {
        setConvertedText(res.data.data.translations[0].translatedText);
      })
      .catch((err) => {
        console.log("rest api error", err);
      });
  }, [text, language]);

  return <>{convertedText}</>;
}

export default Translation;
