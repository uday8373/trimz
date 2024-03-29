import React from "react";
import {MdDeleteOutline} from "react-icons/md";
import {GrFormAdd} from "react-icons/gr";

import Image from "next/image";

const Profile = ({
  setLinkModal,
  uploadedImage,
  setUploadModal,
  heading,
  setHeading,
  subHeading,
  setSubHeading,
  platformLinks,
  deletePlatformLink,
  renderSocialIcon,
  uploadModal,
  setUploadedImage,
  linkModal,
}) => {
  return (
    <div className="bg-white w-full flex flex-col mt-5 rounded-[20px] xl:px-10 xl:pt-10 pb-5 px-5 pt-5">
      <div className="w-full flex gap-5 xl:flex-row flex-col">
        {uploadedImage ? (
          <button
            onClick={() => {
              setUploadModal(!uploadModal);
            }}
            className="flex items-center justify-center">
            <Image
              draggable="false"
              src={uploadedImage}
              width={150}
              height={150}
              alt="Upload Profile"
              className="rounded-full"
            />
          </button>
        ) : (
          <button
            onClick={() => {
              setUploadModal(!uploadModal);
            }}
            className="flex items-center justify-center">
            <Image
              draggable="false"
              src="/short_logo.png"
              width={150}
              height={150}
              alt="Upload Profile"
              className="rounded-full border-2 border-lightGray"
            />
          </button>
        )}
        <div className="flex w-full flex-col gap-3">
          <button
            onClick={() => {
              setUploadModal(!uploadModal);
            }}
            className="w-full bg-primary font-sans text-[16px] font-semibold xl:py-4 py-3 rounded-full text-white hover:bg-bghover transition-all duration-500 delay-75">
            Pick an image
          </button>
          <button
            disabled={!uploadedImage}
            onClick={() => {
              setUploadedImage(null);
            }}
            className="w-full bg-transparent border-2 disabled:bg-[#E0E2D9] hover:bg-[#E0E2D9] transition-all duration-500 delay-75 border-[#E0E2D9] font-sans text-[16px] font-semibold xl:py-4 py-3 rounded-full text-[#637887]">
            Remove
          </button>
        </div>
      </div>
      <h1 className="mt-10 text-black font-sans text-[16px] font-medium">Profile name</h1>
      <div className="w-full flex mt-2">
        <input
          type="text"
          value={heading}
          onChange={(e) => {
            setHeading(e.target.value);
          }}
          placeholder="Enter your profile name"
          className="px-6 xl:py-5 py-4 bg-[#F6F7F5] w-full rounded-[15px] text-black"
        />
      </div>
      <h1 className="mt-5 text-black font-sans text-[16px] font-medium">Bio</h1>
      <div className="w-full flex mt-2 pb-8 border-b-2 text-black border-lightGray border-dotted flex-col gap-5">
        <textarea
          value={subHeading}
          onChange={(e) => {
            setSubHeading(e.target.value);
          }}
          rows="3"
          placeholder="Enter your bio"
          className="px-6 xl:py-5 py-4 bg-[#F6F7F5] w-full rounded-[15px] text-black"
        />
        {platformLinks.map((selectedLink, index) => (
          <div
            key={index}
            className="w-full flex flex-row items-center bg-[#F6F7F5] md:gap-6 gap-2 md:px-6 px-3 rounded-[10px] border-2 border-[#F6F7F5] duration-500 delay-75 transition-all">
            {renderSocialIcon(selectedLink.title)}
            <p className="w-full text-black font-sans md:text-[18px] text-[14px] bg-transparent py-5 outline-none md:hidden">
              {selectedLink.link.length > 20
                ? `${selectedLink.link.substring(0, 20)}...`
                : selectedLink.link}
            </p>
            <p className="w-full text-black font-sans md:text-[18px] text-[14px] bg-transparent py-5 outline-none hidden md:flex">
              {selectedLink.link.length > 40
                ? `${selectedLink.link.substring(0, 40)}...`
                : selectedLink.link}
            </p>
            <button
              className="hover:scale-125 duration-500 delay-75 transition-all"
              onClick={() => deletePlatformLink(index)}>
              {<MdDeleteOutline color="#E93266" size={25} />}
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          setLinkModal(!linkModal);
        }}
        className="flex xl:mt-4 mt-4 w-full justify-center items-center flex-row hover:bg-[#F6F7F5] py-3 rounded-full">
        <GrFormAdd size={35} color="#2161DF" />
        <h1 className="text-primary font-sans text-[18px] font-semibold ">
          Add Social Links
        </h1>
      </button>
    </div>
  );
};

export default Profile;
