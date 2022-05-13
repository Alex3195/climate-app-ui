import FormTopic from "../../components/Topic/FormTopic";
import React from "react";

function AddTopic() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <FormTopic />
        </div>
      </div>
    </>
  );
}

export default AddTopic;
