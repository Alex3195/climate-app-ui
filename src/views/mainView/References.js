import React, { useEffect, useState } from "react";
import IndexNavbar from "../../components/Navbars/IndexNavbar.js";
import Footer from "../../components/Footers/Footer.js";
import { useTranslation } from "react-i18next";
import { selectLang } from "../../features/lang/langSlice.js";
import { useSelector } from "react-redux/es/exports";
import Card from "../../components/Cards/Card.js";
import referenceService from "../../services/referenceService.js";
import fileImgService from "../../services/fileImgService.js";

export default function References() {
  const language = useSelector(selectLang);
  const { t } = useTranslation();
  const [books, setBooks] = useState([]);
  const fetchBooks = () => {
    referenceService.getReferences().then((res) => {
      let array = [];
      let reformatedData = [];
      res.data.body.forEach((item, index) => {
        if ((index + 1) % 3 === 0) {
          array.push(item);
          reformatedData.push(array);
          array = [];
        } else {
          array.push(item);
        }
      });
      if (array.length > 0) {
        reformatedData.push(array);
      }
      console.log(reformatedData);
      setBooks(reformatedData);
    });
  };

  useEffect(() => {
    fetchBooks();
  }, [language]);
  return (
    <>
      <IndexNavbar fixed />
      <div className="pt-32 container items-center">
        <h1 className="font-bold text-4xl pl-32">References</h1>
      </div>
      {books.map((element, indexElement) => {
        if (indexElement === 0) {
          return (
            <section
              key={indexElement}
              className="header relative items-center flex max-h-500-px h-500-px pt-36 pb-20"
            >
              <div className="container mx-auto items-center flex flex-wrap">
                <div className="w-full px-4">
                  <div className="pt-0 sm:pt-0 ">
                    <div className="flex justify-between w-full">
                      {element.map((item, indexItem) => {
                        return (
                          <Card
                            key={indexItem}
                            title={item.title}
                            subtitle={item.subtitle}
                            author={item.author}
                            publishedAt={item.publishedAt}
                            publishedIn={item.publishedIn}
                            image={item.imgId}
                            fileId={item.bookFileId}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        }
        return (
          <section
            key={indexElement}
            className="header relative items-center flex h-500-px pt-36 "
          >
            <div className="container mx-auto items-center flex flex-wrap">
              <div className="w-full px-4">
                <div className="pt-0 sm:pt-0 ">
                  <div className="flex justify-between w-full">
                    {element.map((item, indexItem) => {
                      return (
                        <Card
                          key={indexItem}
                          title={item.title}
                          subtitle={item.subtitle}
                          author={item.author}
                          publishedAt={item.publishedAt}
                          publishedIn={item.publishedIn}
                          image={item.imgId}
                          fileId={item.bookFileId}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
      <section className="pt-60"></section>
      <section className="pb-16 bg-blueGray-200 relative pt-32">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center bg-white shadow-xl rounded-lg -mt-64 py-16 px-12 relative z-10">
            <div className="w-full text-center lg:w-8/12">
              <p className="text-4xl text-center">
                <span role="img" aria-label="love">
                  😍
                </span>
              </p>
              <h3 className="font-semibold text-3xl">
                Do you love this Starter Kit?
              </h3>
              <p className="text-blueGray-500 text-lg leading-relaxed mt-4 mb-4">
                Cause if you do, it can be yours now. Hit the buttons below to
                navigate to get the Free version for your next project. Build a
                new web app or give an old project a new look!
              </p>
              <div className="sm:block flex flex-col mt-10">
                <a
                  href="https://www.creative-tim.com/learning-lab/tailwind/react/overview/notus?ref=nr-index"
                  target="_blank"
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-2 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                  Get started
                </a>
                <a
                  href="https://github.com/creativetimofficial/notus-react?ref=nr-index"
                  target="_blank"
                  className="github-star sm:ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
                >
                  <i className="fab fa-github text-lg mr-1"></i>
                  <span>Help With a Star</span>
                </a>
              </div>
              <div className="text-center mt-16"></div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
