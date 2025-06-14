import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[40vh]">
      <span className="loading loading-spinner text-blue-700 loading-lg"></span>
    </div>
  );
};

export default Spinner;
