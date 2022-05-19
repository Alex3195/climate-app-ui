import React, { useEffect, useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DownloadingOutlinedIcon from "@mui/icons-material/DownloadingOutlined";
import fileImgService from "../../services/fileImgService";
import fileService from "../../services/fileService";
import { useHistory } from "react-router";
const Card = ({
  title,
  subtitle,
  author,
  publishedAt,
  publishedIn,
  image,
  fileId,
}) => {
  const history = useHistory();
  const [imageById, setImageById] = useState();
  const [fileUrl, setFileUrl] = useState();
  const downloadFile = (id) => {
    let fileName = `${title}_${new Date().toISOString[0]}.pdf`;
    fileService.getFileById(id).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  };
  useEffect(() => {
    fileImgService.getImageFileById(image).then((res) => {
      console.log(res.data);
      setImageById(URL.createObjectURL(res.data));
    });
    fileService.getFileById(fileId).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      setFileUrl(url);
    });
  }, []);
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-96 h-60" src={imageById} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{subtitle}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <p className="truncate hover:text-clip max-w-210-px inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {author}
        </p>
        <p className="truncate hover:text-clip max-w-210-px inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {publishedAt}
        </p>{" "}
        <p className="truncate hover:text-clip max-w-210-px inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {publishedIn}
        </p>
        <div className="flex flex-wrap justify-end">
          <button
            className="border-2 rounded-lg px-2 bg-gray-200 hover:bg-blue-200 mx-2"
            onClick={(e) => {
              e.preventDefault();
              history.push({
                pathname: "/viewDoc",
                state: { doc: fileUrl },
              });
            }}
          >
            <VisibilityOutlinedIcon fontSize="large" />
          </button>
          <button
            className="border-2 rounded-lg px-2 bg-gray-200 hover:bg-blue-200 "
            onClick={(e) => {
              e.preventDefault();
              downloadFile(fileId);
            }}
          >
            <DownloadingOutlinedIcon fontSize="large" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
