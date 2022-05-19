import DataTable from "components/DataTable/DataTable";
import { useEffect, useState } from "react";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import researcherQueriesService from "../../services/researcherQueriesService";
const columns = [
  { id: "title", label: "Title", minWidth: 100 },
  {
    id: "date",
    label: "Date",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Status",
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
export default function ResearcherQueries() {
  const history = useHistory();
  const [queriesList, setQueriesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const deleteQuery = (id) => {
    setLoading(true);
    researcherQueriesService.deleteQuery(id).then((res) => {
      setLoading(false);
    });
    console.log("called detele");
  };
  const fetchQueries = () => {
    researcherQueriesService.getQueriesList().then((res) => {
      let readyData = res.data.body.map((item) => {
        return {
          id: item.id,
          title: item.title,
          date: item.date,
          status: item.progressStatus,
          action: (
            <div key={item.id} className="flex relative justify-center">
              <div
                className="text-blue-500 cursor-pointer pr-4"
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
                className="text-pink-600 cursor-pointer pl-4"
                onClick={(e) => {
                  e.preventDefault();
                  deleteQuery(item.id);
                }}
              >
                <DeleteSweepTwoToneIcon className="" />
              </div>
            </div>
          ),
        };
      });
      setQueriesList(readyData);
    });
  };
  useEffect(() => {
    if (loading) {
      fetchQueries();
    }
  }, [loading]);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Queries
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <a
                href="/researcher/queries/add"
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
          <DataTable rowsData={queriesList} columnsData={columns} />
        </div>
      </div>
    </>
  );
}
