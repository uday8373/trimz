import React from "react";

const ErrorMessage = ({error, isAvailable}) => {
  return (
    <div className="w-full flex xl:mt-2 mt-0 mb-1 xl:pl-8 pl-0">
      <h1
        className={`md:text-[16px] text-[14px] text-center font-sans font-medium ${
          isAvailable ? "text-green-600" : "text-red-500"
        }`}>
        {error}
      </h1>
    </div>
  );
};

export default ErrorMessage;
