import React from "react";
import {ThreeDots} from "react-loader-spinner";

const LoadingButton = ({disabled, isLoading, handleContinue}) => {
  return (
    <button
      disabled={disabled}
      onClick={handleContinue}
      className="w-full md:hidden flex disabled:bg-[#E0E2D9] disabled:text-lightGray bg-primary justify-center items-center mb-6 text-white h-14 rounded-[100px] text-[18px] font-semibold hover:bg-bghover transition-all duration-500">
      {isLoading ? (
        <ThreeDots
          visible={true}
          height="24"
          width="24"
          color="#fff"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        "Continue"
      )}
    </button>
  );
};

export default LoadingButton;
