import React from "react";
import FormAdd from "../../components/Categories/FormAdd";

function AddCategory() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <FormAdd />
        </div>
      </div>
    </>
  );
}

export default AddCategory;
