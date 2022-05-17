import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

export default function PdfViewer({ file }) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  /*To Prevent right click on screen*/
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  /*When document gets loaded successfully*/
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <>
      <div className="flex flex-wrap justify-center">
        <div className="flex justify-between mt-3 mb-3">
          <div>
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
              className="border-2 rounded-2xl px-3 border-blueGray-300 text-blueGray-200 ml-10"
            >
              Previous
            </button>
          </div>
          <div className="text-blueGray-300 px-44">
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </div>
          <div>
            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
              className="border-2 rounded-2xl px-3 border-blueGray-300 text-blueGray-200 mr-10"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center  bg-blueGray-600">
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
    </>
  );
}
