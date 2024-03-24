import React from "react";
import {ThreeDots} from "react-loader-spinner";

const UsernameInput = ({value, onChange, isAvailable, isLoading, handleContinue}) => {
  return (
    <div className="flex w-full mt-6 xl:mb-0 mb-2 items-center bg-white pl-8 pr-3 rounded-full justify-between">
      <div className="flex md:py-5 py-4">
        <label
          htmlFor="url"
          className="md:text-[18px] text-[14px] text-[#637887] font-sans font-medium ">
          trimz.me/
        </label>
        <input
          id="url"
          type="text"
          value={value}
          onChange={onChange}
          placeholder="username"
          className="w-full placeholder-[#637887] font-sans font-medium md:text-[18px] text-[14px] relative focus:outline-none"
          required
        />
      </div>
      <button
        disabled={!isAvailable}
        onClick={handleContinue}
        className="bg-primary disabled:bg-[#E0E2D9] disabled:text-lightGray hidden md:flex w-36 justify-center items-center text-white font-sans font-semibold text-[16px] py-3 rounded-[100px] hover:bg-bghover transition-all duration-500">
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
    </div>
  );
};

export default UsernameInput;
