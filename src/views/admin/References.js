import ReferencesList from "../../layouts/References/ReferencesList";
import React from "react";

function References() {
  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
        <ReferencesList />
      </div>
    </div>
  );
}

export default References;
