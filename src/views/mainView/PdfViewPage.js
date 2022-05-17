import PdfViewer from "../../components/PdfViewer/PdfViewer";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

function PdfViewPage() {
  const [file, setFile] = useState();
  const location = useLocation();
  useEffect(() => {
    if (location.state.doc) {
      setFile(location.state.doc);
    }
  }, []);
  return (
    <div className="w-full max-h-860-px pt-10 min-w-full items-center  bg-blueGray-600">
      <PdfViewer file={file} />
    </div>
  );
}

export default PdfViewPage;
