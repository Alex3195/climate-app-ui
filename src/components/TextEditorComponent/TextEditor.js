import React, { useEffect, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
const buttons = [
  [
    "undo",
    "redo",
    "font",
    "fontSize",
    "formatBlock",
    "paragraphStyle",
    "blockquote",
    "bold",
    "underline",
    "italic",
    "strike",
    "subscript",
    "superscript",
    "fontColor",
    "hiliteColor",
    "textStyle",
    "removeFormat",
    "outdent",
    "indent",
    "align",
    "horizontalRule",
    "list",
    "lineHeight",
    "table",
    "link",
    "image",
    "video",
    "audio" /** 'math', */, // You must add the 'katex' library at options to use the 'math' plugin.
    /** 'imageGallery', */ // You must add the "imageGalleryUrl".
    "fullScreen",
    "showBlocks",
    "codeView",
    "preview",
    "print",
    "save",
    "template",
    /** 'dir', 'dir_ltr', 'dir_rtl' */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
  ],
];
const TextEditor = ({ content, setContent }) => {
  const [contentData, setContentData] = useState("");
  useEffect(() => {}, []);
  const handleLoad = (reload) => {
    console.log("handleLoad");
    console.log(reload); //Boolean
  };
  const handleChange = (text) => {
    console.log("handleCHange");
    console.log(text);
    setContentData(text);
    setContent(text);
  };
  const handleImageUploadBefore = (files, info, uploadHandler) => {
    // uploadHandler is a function
    console.log("handleImageUploadBefore");
    console.log(files, info);
  };
  const handleImageUpload = (
    targetImgElement,
    index,
    state,
    imageInfo,
    remainingFilesCount
  ) => {
    console.log("handleImageUpload");
    console.log(targetImgElement, index, state, imageInfo, remainingFilesCount);
  };
  const handleImageUploadError = (errorMessage, result) => {
    console.log("handleImageUploadError");
    console.log(errorMessage, result);
  };
  const handleVideoUploadBefore = (files, info, uploadHandler) => {
    console.log("handleVideoUploadBefore");
    // uploadHandler is a function
    console.log(files, info);
  };
  const handleVideoUpload = (
    targetElement,
    index,
    state,
    info,
    remainingFilesCount
  ) => {
    console.log("handleVideoUpload");
    console.log(targetElement, index, state, info, remainingFilesCount);
  };
  const handleVideoUploadError = (errorMessage, result) => {
    console.log("handleVideoUploadError");
    console.log(errorMessage, result);
  };
  const handleAudioUploadBefore = (files, info, uploadHandler) => {
    console.log("handleAudioUploadBefore");
    // uploadHandler is a function
    console.log(files, info);
  };
  const handleAudioUpload = (
    targetElement,
    index,
    state,
    info,
    remainingFilesCount
  ) => {
    console.log("handleAudioUpload");
    console.log(targetElement, index, state, info, remainingFilesCount);
  };
  const handleAudioUploadError = (errorMessage, result) => {
    console.log("handleAudioUploadError");
    console.log(errorMessage, result);
  };
  const imageUploadHandler = (xmlHttpRequest, info, core) => {
    console.log("imageUploadHandler");
    console.log(xmlHttpRequest, info, core);
  };
  return (
    <div className="w-full mt-3">
      <SunEditor
        setOptions={{
          height: 200,
          buttonList: buttons, // Or Array of button list, eg. [['font', 'align'], ['image']]
        }}
        onChange={handleChange}
        onLoad={handleLoad}
        // onImageUploadBefore={handleImageUploadBefore}
        onImageUpload={handleImageUpload}
        onImageUploadError={handleImageUploadError}
        onVideoUploadBefore={handleVideoUploadBefore}
        onVideoUpload={handleVideoUpload}
        onVideoUploadError={handleVideoUploadError}
        onAudioUploadBefore={handleAudioUploadBefore}
        onAudioUpload={handleAudioUpload}
        onAudioUploadError={handleAudioUploadError}
        imageUploadHandler={imageUploadHandler}
      />
    </div>
  );
};
export default TextEditor;
