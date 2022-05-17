import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import fileService from "../../services/fileService";
import BookImg from "../../assets/img/book.png";
import fileImgService from "../../services/fileImgService";
import referenceService from "../../services/referenceService";
import { useHistory } from "react-router";
function FormAdd() {
  const location = useLocation();
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [imageBookId, setImageBookId] = useState(0);
  const [imageBook, setImageBook] = useState();
  const [bookFileId, setBookFileId] = useState(0);
  const [publishedAt, setPublishedAt] = useState("");
  const [publishedIn, setPublishedIn] = useState("");
  const history = useHistory();
  const handleSave = (e) => {
    const dataObj = {
      id: id,
      title: title,
      subtitle: subTitle,
      author: author,
      publishedAt: publishedAt,
      publishedIn: publishedIn,
      imgId: imageBookId,
      bookFileId: bookFileId,
    };
    if (id > 0) {
      referenceService.updateReference(dataObj).then((res) => {
        console.log(res.data.body);
      });
      history.push(`/settings/references`);
    } else {
      referenceService.addReference(dataObj).then((res) => {
        console.log(res.data.body);
        history.push(`/settings/references`);
      });
    }
  };
  useEffect(() => {
    let data = location.state ? location.state.data : null;
    console.log(data);
    if (data) {
      setId(data.id ? data.id : null);
      setTitle(data.title ? data.title : "");
      setSubTitle(data.subTitle ? data.subTitle : "");
    }
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Add reference
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
                    Subtitle
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
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Author
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={author}
                    placeholder="James Hansen"
                    onChange={(e) => {
                      setAuthor(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 pr-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Published at
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Publisher address"
                        value={publishedAt}
                        onChange={(e) => {
                          e.preventDefault();
                          setPublishedAt(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 pl-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Published in
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="2022"
                        value={publishedIn}
                        onChange={(e) => {
                          e.preventDefault();
                          setPublishedIn(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />
            <div className="flex justify-start mt-8">
              {/* Upload book image */}
              <div className="max-w-full  rounded-lg shadow-xl bg-gray-50 mr-5">
                <div className="m-4">
                  <label className="inline-block mb-2 text-gray-500">
                    Upload book image
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
                          formData.append("image", e.target.files[0]);
                          formData.append("filename", title);
                          fileImgService.addImageFile(formData).then((res) => {
                            setImageBookId(res.data.body);
                            console.log(res.data.body);
                          });
                          setImageBook(URL.createObjectURL(e.target.files[0]));
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
              {/* Book image view */}
              <div className="max-w-full  rounded-lg shadow-xl bg-gray-50 ml-5">
                <div className="m-4">
                  <img
                    src={imageBook ? imageBook : BookImg}
                    className="p-1 bg-white border rounded max-w-sm max-h-56"
                    alt="..."
                  />
                </div>
              </div>
              {/* Upload book file */}
              <div className="max-w-full  rounded-lg shadow-xl bg-gray-50 ml-5">
                <div className="m-4">
                  <label className="inline-block mb-2 text-gray-500">
                    Upload book file
                  </label>
                  <div className="flex items-end justify-end w-full">
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
                          console.log(e.target.files);
                          let formData = new FormData();
                          formData.append("file", e.target.files[0]);
                          formData.append("filename", title);
                          fileService.addFile(formData).then((res) => {
                            console.log(res.data.body);
                            setBookFileId(res.data.body);
                          });
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <hr className="mt-6 border-b-1 border-blueGray-300" />
        </div>
      </div>
    </>
  );
}

export default FormAdd;
