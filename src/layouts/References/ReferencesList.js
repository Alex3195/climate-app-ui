import DataTable from "components/DataTable/DataTable";
import { useEffect, useState } from "react";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import referenceService from "../../services/referenceService";
const columns = [
  { id: "title", label: "Title", minWidth: 100 },
  {
    id: "subTitle",
    label: "Subtitle",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "author",
    label: "Author",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "publishedAt",
    label: "Published at",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  }, {
    id: "publishedIn",
    label: "Published in",
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
function ReferencesList() {
  const history = useHistory();
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(false);
  const deleteTopic = (id) => {
    setLoading(true);
    referenceService.deleteRefernce(id).then((res) => {
      setLoading(false);
    });
    console.log("called detele");
  };
  const fetchReferences = () => {
    referenceService.getReferences().then((res) => {
      console.log( res.data.body);
      let data = res.data.body.map((item) => {
        console.log(item);
        return {
          id: item.id,
          defaultTitle: item.defaultTitle,
          title: item.title ? item.title : "empty",
          subTitle: item.subtitle ? item.subtitle : "empty",
          author: item.author ? item.author : "empty",
          publishedAt: item.publishedAt ? item.publishedAt : "empty",
          publishedIn: item.publishedIn ? item.publishedIn : "empty",
          action: (
            <div key={item.id} className="flex relative justify-center">
              <div
                className="text-blue-500 cursor-pointer pr-4"
                onClick={(e) => {
                  e.preventDefault();
                  history.push({
                    pathname: "/settings/references/add",
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
                className="text-pink-600 cursor-pointer pl-4"
                onClick={(e) => {
                  e.preventDefault();
                  deleteTopic(item.id);
                }}
              >
                <DeleteSweepTwoToneIcon className="" />
              </div>
            </div>
          ),
        };
      });
      setReferences(data);
    });
  };
  useEffect(() => {
    fetchReferences();
  }, [loading]);
  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-blueGray-700">
              References
            </h3>
          </div>
          <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
            <a
              href="/settings/references/add"
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
        <DataTable rowsData={references} columnsData={columns} />
      </div>
    </div>
  );
}

export default ReferencesList;
