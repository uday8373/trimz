// Background.js
import React from "react";

const Background = ({setBackground, background}) => {
  return (
    <div className="bg-white w-full flex flex-col mt-5 rounded-[20px] xl:px-10 xl:py-10 px-5 py-5">
      <div className="w-full flex gap-5 md:flex-row flex-col justify-between">
        <div className="flex justify-center flex-col items-center">
          <button
            onClick={() => {
              setBackground("#E9F6FF");
            }}
            className={`${
              background === "#E9F6FF" ? " shadow-3xl" : ""
            } w-44 h-72 border-[#E9F6FF] border-2 bg-[#E9F6FF] rounded-xl hover:scale-95 duration-500 delay-75 transition-all`}>
            {background === "#E9F6FF" ? "Selected" : ""}
          </button>
          <h1 className="text-black font-sans text-[16px] font-medium mt-2">
            Alice Blue
          </h1>
        </div>
        <div className="flex justify-center flex-col items-center">
          <button
            onClick={() => {
              setBackground("#e2deff");
            }}
            className={`${
              background === "#e2deff" ? "shadow-3xl" : ""
            } w-44 h-72 border-[#e2deff] border-2 bg-[#e2deff] rounded-xl hover:scale-95 duration-500 delay-75 transition-all`}>
            {background === "#e2deff" ? "Selected" : ""}
          </button>
          <h1 className="text-black font-sans text-[16px] font-medium mt-2">Lavender</h1>
        </div>
        <div className="flex justify-center flex-col items-center">
          <button
            onClick={() => {
              setBackground("#FFE4E3");
            }}
            className={`${
              background === "#FFE4E3" ? "shadow-3xl" : ""
            } w-44 h-72 border-[#FFE4E3] border-2 bg-[#FFE4E3] rounded-xl hover:scale-95 duration-500 delay-75 transition-alls`}>
            {" "}
            {background === "#FFE4E3" ? "Selected" : ""}
          </button>
          <h1 className="text-black font-sans text-[16px] font-medium mt-2">
            Misty Rose
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Background;
