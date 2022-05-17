import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import ReactAutoComplete from "../../components/ReactAutoComplete/ReactAutoComplete";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import categoryService from "../../services/categoryService";
import TextEditor from "../TextEditorComponent/TextEditor";
import topicService from "../../services/topicService";
import { useHistory } from "react-router";

function FormTopic() {
  const location = useLocation();
  const history = useHistory();
  const [id, setId] = useState(0);
  const [defaultTitle, setDefaultTitle] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [lang, setLang] = useState("ru");
  const [parent, setParent] = useState([]);
  const [parentId, setParentId] = useState(null);
  const [content, setContent] = useState("");
  const handleLanguage = (e) => {
    setLang(e.target.value);
    topicService.getTopicByIdAndLang(id, e.target.value).then((res) => {
      console.log(res.data);
      let data = res.data.body;
      setTitle(data.title ? data.title : "");
      setSubTitle(data.subTitle ? data.subTitle : "");
    });
  };
  const handleSave = (e) => {
    const dataObj = {
      id: id,
      defaultTitle: defaultTitle,
      title: title,
      subTitle: subTitle,
      content: content,
      categoryId: parentId ? parentId.id : null,
    };
    if (id > 0) {
      topicService.updateCategory(dataObj).then((res) => {
        let dataTemp = res.data.body;
        if (dataTemp.id > 0) {
          topicService
            .translationTopic(
              {
                id: dataTemp.id,
                defaultTitle: defaultTitle,
                title: title,
                subTitle: subTitle,
                content: content,
                categoryId: parentId ? parentId.id : null,
              },
              lang
            )
            .then((res) => {
              history.push(`/settings/topic`);
              console.log(res.data.body);
            });
        }
      });
    } else {
      topicService.addTopic(dataObj).then((res) => {
        let dataTemp = res.data.body;
        if (dataTemp.id > 0) {
          topicService
            .translationTopic(
              {
                id: dataTemp.id,
                defaultTitle: defaultTitle,
                title: title,
                content: content,
                subTitle: subTitle,
                categoryId: parentId ? parentId.id : null,
              },
              lang
            )
            .then((res) => {
              history.push(`/settings/topic`);
              console.log(res.data.body);
            });
        }
      });
    }
  };
  const handleParent = (value) => {
    setParentId(value);
  };
  useEffect(() => {
    let data = location.state ? location.state.data : null;
    console.log(data);
    if (data) {
      setId(data.id ? data.id : null);
      setDefaultTitle(data.defaultTitle ? data.defaultTitle : "");
      setTitle(data.title ? data.title : "");
      setSubTitle(data.subTitle ? data.subTitle : "");
      setParentId(data.categoryId ? data.categoryId : "");
    }
    categoryService.getCategories().then((res) => {
      let dataTemp = res.data.body.map((item) => {
        return {
          id: item.id,
          name: item.title ? item.title : item.defaultTitle,
        };
      });
      setParent(dataTemp);
    });
  }, [parentId]);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Add topic</h6>
            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleSave}
            >
              save
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Default
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-612/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={defaultTitle}
                    onChange={(e) => {
                      setDefaultTitle(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Translation
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-8/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Sub title
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={subTitle}
                    onChange={(e) => {
                      setSubTitle(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Language
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={lang}
                    name="radio-buttons-group"
                    value={lang ? lang : ""}
                  >
                    <FormControlLabel
                      value="ru"
                      control={<Radio value={"ru"} onChange={handleLanguage} />}
                      label="Ru"
                    />
                    <FormControlLabel
                      value="en"
                      control={<Radio value={"en"} onChange={handleLanguage} />}
                      label="En"
                    />
                    <FormControlLabel
                      value="uz"
                      control={<Radio value={"uz"} onChange={handleLanguage} />}
                      label="Uz"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </form>
          <hr className="mt-6 border-b-1 border-blueGray-300" />
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Content
          </h6>
          <div className="flex flex-wrap">
            <div className="relative w-full mb-3">
              <TextEditor setContent={setContent} content={content} />
            </div>
          </div>
          <hr className="mt-6 border-b-1 border-blueGray-300" />

          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Category
          </h6>
          <div className="flex flex-wrap">
            <div className="relative w-full mb-3">
              <ReactAutoComplete
                optionData={parent}
                defValue={parentId}
                placeHolder={"Categories"}
                optionValue={parentId}
                onChange={handleParent}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormTopic;
