import TopicTable from "components/Topic/TopicTable";
import React from "react";

function Topic() {
  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
        <TopicTable />
      </div>
    </div>
  );
}

export default Topic;
