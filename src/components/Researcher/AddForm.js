import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import fileService from "../../services/fileService";
import DownloadingIcon from "@mui/icons-material/Downloading";
import loadTemplateByParamService from "../../services/loadTemplateByParamService";
function AddForm() {
  const location = useLocation();
  const history = useHistory();
  const [id, setId] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [title, setTitle] = useState("");
  const [period, setPeriod] = useState(0);
  const [graphicsPeriod, setGraphicsPeriod] = useState(10);
  const [paramCode, setParamCode] = useState("ta");
  const [paramName, setParamName] = useState("Temperature");
  const handleGraphicsPeriod = (e) => {
    setGraphicsPeriod(e.target.value);
  };
  const handleParam = (e) => {
    setParamCode(e.target.value);
    switch (e.target.value) {
      case "ta":
        setParamName("Temperature");
        break;
      case "ua":
        setParamName("Zonal Wind");
        break;
      case "va":
        setParamName("Meridional Wind");
        break;
      case "wa":
        setParamName("Vertical Wind");
        break;
      case "ps":
        setParamName("Surface Pressure");
        break;
      default:
        setParamName("");
        break;
    }
  };
  const handleSave = (e) => {
    let dataObj = {
      title: title,
      period: period,
      graphicsPeriod: graphicsPeriod,
      paramCode: paramCode,
      paramName: paramName,
      fileId: fileId,
    };
  };
  const handleTemplate = (e) => {
    e.preventDefault();
    let fileName = `${title}_${new Date().toISOString[0]}.txt`;
    loadTemplateByParamService.getTemplateByParam(paramCode).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  };

  useEffect(() => {}, [paramCode, graphicsPeriod]);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Add order for training model
            </h6>
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
                    type="number"
                    step={1}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={period}
                    onChange={(e) => {
                      setPeriod(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Data display period
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={graphicsPeriod}
                    name="radio-buttons-group"
                    value={graphicsPeriod}
                  >
                    <FormControlLabel
                      value={7}
                      control={
                        <Radio value={7} onChange={handleGraphicsPeriod} />
                      }
                      label="Every 7 days"
                    />
                    <FormControlLabel
                      value={10}
                      control={
                        <Radio value={10} onChange={handleGraphicsPeriod} />
                      }
                      label="Every 10 days"
                    />
                    <FormControlLabel
                      value={15}
                      control={
                        <Radio value={15} onChange={handleGraphicsPeriod} />
                      }
                      label="Every 15 days"
                    />
                    <FormControlLabel
                      value={30}
                      control={
                        <Radio value={30} onChange={handleGraphicsPeriod} />
                      }
                      label="Every 30 days"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </form>
          <hr className="mt-6 border-b-1 border-blueGray-300" />
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Data file for training on model
          </h6>
          <div className="flex flex-wrap">
            <div className="relative w-full mb-3">
              <div className="mx-5 flex">
                <div className="lg:w-9/12">
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Params
                    </FormLabel>
                    <RadioGroup
                      className="mx-5 mt-2"
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={paramCode}
                      defaultValue={"ta"}
                    >
                      <FormControlLabel
                        value="ta"
                        control={<Radio value={"ta"} onChange={handleParam} />}
                        label="Temperature"
                      />
                      <FormControlLabel
                        value="ua"
                        control={<Radio value={"ua"} onChange={handleParam} />}
                        label="Zonal Wind"
                      />
                      <FormControlLabel
                        value="va"
                        control={<Radio value={"va"} onChange={handleParam} />}
                        label="Meridional wind"
                      />
                      <FormControlLabel
                        value="wa"
                        control={<Radio value={"wa"} onChange={handleParam} />}
                        label="Vertical wind"
                      />
                      <FormControlLabel
                        value="ps"
                        control={<Radio value={"ps"} onChange={handleParam} />}
                        label="Surface Pressure"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="lg:w-3/12">
                  <h4 className="lg:ml-16">Template by param</h4>
                  <div
                    className="mt-3 lg:ml-48 text-blue-500 cursor-pointer
                  "
                    onClick={handleTemplate}
                  >
                    <DownloadingIcon fontSize="large" />
                  </div>
                </div>
              </div>
              <div className="max-w-full  rounded-lg shadow-xl bg-gray-50 mr-5">
                <div className="m-4">
                  <label className="inline-block mb-2 text-gray-500">
                    Upload your data
                  </label>
                  <div className="flex items-start justify-start w-full">
                    <label className="flex flex-col w-full h-56 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                      <div className="flex flex-col items-center justify-center pt-20 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                          Attach a file
                        </p>
                      </div>
                      <input
                        type="file"
                        className="opacity-0"
                        onChange={(e) => {
                          e.preventDefault();
                          let formData = new FormData();
                          formData.append("file", e.target.files[0]);
                          formData.append("filename", title);
                          fileService.addFile(formData).then((res) => {
                            setFileId(res.data.body);
                            console.log(res.data.body);
                          });
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddForm;
