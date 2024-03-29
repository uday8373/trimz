// Sidebar.js
import React from "react";
import {PiDotsThreeBold} from "react-icons/pi";
import Image from "next/image";

const Sidebar = ({
  uploadedImage,
  heading,
  subHeading,
  platformLinks,
  renderSocialIcon,
  background,
}) => {
  return (
    <div className="w-full xl:flex hidden xl:w-[30%] h-screen bg-transparent items-center justify-end">
      <div
        className={`mobile shadow-2xl  fixed w-[262px] h-[512px] bg-[${background}] rounded-[30px] border-[10px] border-black overflow-y-auto`}>
        <div className="w-full flex flex-col justify-center mt-10">
          {uploadedImage ? (
            <div className="flex items-center justify-center">
              <Image
                draggable="false"
                src={uploadedImage}
                width={75}
                height={75}
                alt="Link shortener"
                className="rounded-full"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Image
                draggable="false"
                src="/short_logo.png"
                width={75}
                height={75}
                alt="Link shortener"
                className="rounded-full"
              />
            </div>
          )}
          <div className="flex w-full justify-center px-5 pt-5 flex-col items-center">
            <h1 className="text-black font-sans font-semibold text-[16px] flex text-center">
              {heading}
            </h1>
            <h1 className="text-black font-sans font-medium text-[14px] flex text-center pt-2">
              {subHeading}
            </h1>
            <div className="w-full flex flex-col justify-center items-center my-5 gap-2">
              {platformLinks.map((selectedLink, index) => (
                <div
                  key={index}
                  className="w-full flex flex-row items-center bg-transparent justify-between px-3 rounded-[10px] shadow-3xl">
                  <div>{renderSocialIcon(selectedLink.title)}</div>
                  <p className=" text-black font-sans font-medium text-[14px] bg-transparent py-2 outline-none ">
                    {selectedLink.title}
                  </p>
                  <div>{<PiDotsThreeBold color="#5A5A5A" size={25} />}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
