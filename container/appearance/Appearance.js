import React from "react";
import Image from "next/image";
import {GrFormAdd} from "react-icons/gr";
export default function Appearance() {
  return (
    <section
      id="home"
      className="relative flex items-center  justify-center w-full min-h-screen  bg-bghero select-none">
      <div className="2xl:px-[146px] xl:px-36 lg:px-32 md:px-22 sm:px-16 px-6 h-full flex-col-reverse xl:flex-row w-full flex items-center max-w-screen-2xl">
        <div className="flex w-full justify-between h-full">
          <div className="w-full flex xl:w-[70%] bg-transparent xl:border-r-2 border-lightGray border-dotted">
            <div className="flex xl:py-20 py-5 flex-col w-full xl:pr-28">
              <h1 className="text-black font-sans text-[24px] font-semibold">Profile</h1>
              <div className="bg-white w-full flex flex-col mt-5 rounded-[20px] xl:px-10 xl:py-10 px-5 py-5">
                <div className="w-full flex gap-5 xl:flex-row flex-col">
                  <div className="flex items-center justify-center">
                    <Image
                      draggable="false"
                      src="/defaultUser.jpg"
                      width={150}
                      height={150}
                      alt="Picture of the author"
                      className="rounded-full"
                    />
                  </div>

                  <div className="flex w-full flex-col gap-3">
                    <button className="w-full bg-primary font-sans text-[16px] font-semibold xl:py-4 py-3 rounded-full text-white">
                      Pick an image
                    </button>
                    <button className="w-full bg-transparent border-2 border-[#E0E2D9] font-sans text-[16px] font-semibold xl:py-4 py-3 rounded-full text-[#637887]">
                      Remove
                    </button>
                  </div>
                </div>
                <h1 className="mt-10 text-black font-sans text-[16px] font-medium">
                  Profile name
                </h1>
                <div className="w-full flex mt-2">
                  <input
                    type="text"
                    placeholder="Enter your profile name"
                    className="px-6 xl:py-5 py-4 bg-[#F6F7F5] w-full rounded-[15px] "
                  />
                </div>
                <h1 className="mt-5 text-black font-sans text-[16px] font-medium">Bio</h1>
                <div className="w-full flex mt-2 pb-8 border-b-2 border-lightGray border-dotted">
                  <textarea
                    id="story"
                    name="story"
                    rows="3"
                    cols="33"
                    placeholder="Enter your bio"
                    className="px-6 xl:py-5 py-4 bg-[#F6F7F5] w-full rounded-[15px] "
                  />
                </div>
                <button className="flex xl:mt-8 mt-4 w-full justify-center items-center flex-row hover:bg-[#F6F7F5] py-3 rounded-full">
                  <GrFormAdd size={35} color="#2161DF" />
                  <h1 className="text-primary font-sans text-[18px] font-semibold ">
                    Add Social Links
                  </h1>
                </button>
              </div>
              <h1 className="text-black font-sans text-[24px] font-semibold mt-5">
                Background
              </h1>
              <div className="bg-white w-full flex flex-col mt-5 rounded-[20px] xl:px-10 xl:py-10 px-5 py-5">
                <div className="w-full flex gap-5 md:flex-row flex-col justify-between">
                  <div className="flex justify-center flex-col items-center">
                    <button className="w-44 h-72 bg-bghero rounded-xl"></button>
                    <h1 className="text-black font-sans text-[16px] font-medium mt-2">
                      Alice Blue
                    </h1>
                  </div>
                  <div className="flex justify-center flex-col items-center">
                    <button className="w-44 h-72 bg-[#e2deff] rounded-xl"></button>
                    <h1 className="text-black font-sans text-[16px] font-medium mt-2">
                      Lavender
                    </h1>
                  </div>
                  <div className="flex justify-center flex-col items-center">
                    <button className="w-44 h-72 bg-[#FFE4E3] rounded-xl"></button>
                    <h1 className="text-black font-sans text-[16px] font-medium mt-2">
                      Misty Rose
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full xl:flex hidden xl:w-[30%] h-screen bg-transparent items-center justify-end">
            <div className="fixed w-[262px] h-[512px] bg-slate-200 rounded-[30px] border-[10px] border-black"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
