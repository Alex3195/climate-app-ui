import DataTable from "../../components/DataTable/DataTable";
import { useEffect, useState } from "react";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import researcherQueriesService from "../../services/researcherQueriesService";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
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
    id: "paramName",
    label: "Parameter",
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
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 7
    )
      .toISOString()
      .substring(0, 10)
  );
  const [toDate, setToDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [filter, setFilter] = useState({
    draw: 1,
    start: 0,
    length: 10,
    columns: [],
    order: [],
    search: { value: "", regex: true },
    filter: {
      fromDate: fromDate,
      toDate: toDate,
    },
  });
  const deleteQuery = (id) => {
    setLoading(true);
    researcherQueriesService.deleteQuery(id).then((res) => {
      setLoading(false);
    });
    console.log("called detele");
  };
  const fetchQueries = (filter) => {
    researcherQueriesService.getQueriesList(filter).then((res) => {
      console.log(res.data.body.data);
      let readyData = res.data.body.data.map((item) => {
        return {
          id: item.id,
          title: item.title,
          date: item.dateTime.substring(0, 10),
          paramName: item.paramName,
          status:
            item.processStatus === "RECEIVED" ? (
              <div className="text-blue-400">{item.processStatus}</div>
            ) : item.processStatus === "ERROR" ? (
              <div className="text-red-400">{item.processStatus}</div>
            ) : item.processStatus === "WRONG_DATA" ? (
              <div className="text-yellow-400">{item.processStatus}</div>
            ) : item.processStatus === "ON_PROGRESS" ? (
              <div className="text-indigo-400">{item.processStatus}</div>
            ) : item.processStatus === "READY" ? (
              <div className="text-green-400">{item.processStatus}</div>
            ) : (
              <>{item.processStatus}</>
            ),
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
      setLoading(false);
    });
  };
  const handleFilter = (e) => {
    e.preventDefault();
    setLoading(true);
  };
  useEffect(() => {
    if (loading) {
      fetchQueries(filter);
    }
  }, [loading]);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
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
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-blueGray-700">
              Queries
            </h3>
          </div>
          <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
                setFilter({
                  ...filter,
                  filter: {
                    ...filter.filter,
                    fromDate: e.target.value,
                    toDate: toDate,
                  },
                });
              }}
              className="border-2 mx-3 px-3 rounded-md"
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => {
                setToDate(e.target.value);
                setFilter({
                  ...filter,
                  filter: {
                    ...filter.filter,
                    fromDate: fromDate,
                    toDate: e.target.value,
                  },
                });
              }}
              className="border-2 mx-3 px-3 rounded-md"
            />

            <button
              className="border-2 mx-3 px-3 py-1 rounded-md bg-indigo-500 text-white uppercase font-bold text-sm"
              onClick={handleFilter}
            >
              <FilterAltOutlinedIcon fontSize="small" />
              Filter
            </button>
          </div>
          {/* Projects table */}
          <DataTable
            rowsData={queriesList}
            columnsData={columns}
            filter={filter}
            setFilter={setFilter}
            setLoading={setLoading}
          />
        </div>
      </div>
    </>
  );
}
