import DataTable from "components/DataTable/DataTable";
import { useEffect, useState } from "react";
import categoryService from "../../services/categoryService";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const columns = [
  { id: "defaultTitle", label: "Default title", minWidth: 100 },
  { id: "title", label: "Title", minWidth: 100 },
  {
    id: "subTitle",
    label: "Subtitle",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "parentTitle",
    label: "Parent title",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "action",
    label: "Actions",
    minWidth: 100,
    align: "left",
    format: (value) => value.toFixed(2),
  },
];
export default function CategoryTable() {
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const deleteCategory = (id) => {
      setLoading(true);
    categoryService.deleteCategory(id).then((res) => {
      setLoading(false)
    });
    console.log("called detele");
  };
  const fetchCategories = () => {
    categoryService.getCategories().then((res) => {
      let data = res.data.body.map((item) => {
        return {
          id: item.id,
          defaultTitle: item.defaultTitle,
          title: item.title ? item.title : "empty",
          subTitle: item.subTitle ? item.subTitle : "empty",
          parentTitle: item.parentTitle ? item.parentTitle : "empty",
          action: (
            <div key={item.id} className="flex relative justify-center">
              <div
                className="bg-blue-200 cursor-pointer pr-4"
                onClick={(e) => {
                  e.preventDefault();
                  history.push({
                    pathname: "/settings/add/category",
                    // search: '?update=true',  // query string
                    state: {
                      // location state
                      data: item,
                    },
                  });
                }}
              >
                <ModeEditOutlineTwoToneIcon />
              </div>
              <div
                className="bg-pink-600 cursor-pointer pl-4"
                onClick={(e) => {
                  e.preventDefault();
                  deleteCategory(item.id);
                }}
              >
                <DeleteSweepTwoToneIcon className="" />
              </div>
            </div>
          ),
        };
      });
      setCategories(data);
    });
  };
  useEffect(() => {
    fetchCategories();
  }, [loading]);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Categories
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <a
                href="/settings/add/category"
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Add
              </a>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <DataTable rowsData={categories} columnsData={columns} />
        </div>
      </div>
    </>
  );
}
