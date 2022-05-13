import CategoryTable from "../../components/Categories/CategoryTable.js";
import React from "react";

function TopicCategory() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <CategoryTable />
        </div>
      </div>
    </>
  );
}

export default TopicCategory;
