import React, {useEffect, useState} from "react";
import Image from "next/image";
import {GrFormAdd} from "react-icons/gr";
import UploadModal from "../../components/UploadModal";
import {useRouter} from "next/router";
import LinkModels from "../../components/LinkModels";
import {MdDeleteOutline} from "react-icons/md";
import {PiDotsThreeBold} from "react-icons/pi";

export default function Appearance() {
  const router = useRouter();
  const [uploadModal, setUploadModal] = useState(false);
  const [linkModal, setLinkModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [platformLinks, setPlatformLinks] = useState([]);
  const [background, setBackground] = useState("#E9F6FF");

  const addPlatformLink = (platformData) => {
    const index = platformLinks.findIndex((link) => link.id === platformData.id);

    if (index !== -1) {
      const updatedLinks = [...platformLinks];
      updatedLinks[index] = platformData;
      setPlatformLinks(updatedLinks);
    } else {
      setPlatformLinks([...platformLinks, platformData]);
    }
  };

  const handleUploadedImage = (imageData) => {
    setUploadedImage(imageData);
    setUploadModal(false);
  };
  const deletePlatformLink = (index) => {
    setPlatformLinks(platformLinks.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const {heading} = router.query;
    if (heading) {
      setHeading(heading);
    }
  }, [router.query]);

  useEffect(() => {
    console.log("platformLinks", platformLinks);
  }, [platformLinks]);

  return (
    <section
      id="home"
      className="relative flex items-center  justify-center w-full min-h-screen  bg-bghero select-none">
      <div className="2xl:px-[146px] xl:px-36 lg:px-32 md:px-22 sm:px-16 px-6 h-full flex-col-reverse xl:flex-row w-full flex items-center max-w-screen-2xl">
        <div className="flex w-full justify-between h-full">
          <div className="w-full flex xl:w-[70%] bg-transparent xl:border-r-2 border-lightGray border-dotted">
            <div className="flex xl:py-14 py-5 flex-col w-full xl:pr-28">
              <h1 className="text-black font-sans text-[24px] font-semibold">Profile</h1>
              <div className="bg-white w-full flex flex-col mt-5 rounded-[20px] xl:px-10 xl:pt-10 pb-5 px-5 pt-5">
                <div className="w-full flex gap-5 xl:flex-row flex-col">
                  {uploadedImage ? (
                    <button
                      onClick={() => {
                        setUploadModal(!uploadModal);
                      }}
                      className="flex items-center justify-center">
                      <img
                        draggable="false"
                        src={uploadedImage}
                        width={150}
                        height={150}
                        alt="Picture of the author"
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
                        src="/defaultUser.jpg"
                        width={150}
                        height={150}
                        alt="Picture of the author"
                        className="rounded-full"
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
                <h1 className="mt-10 text-black font-sans text-[16px] font-medium">
                  Profile name
                </h1>
                <div className="w-full flex mt-2">
                  <input
                    type="text"
                    value={heading}
                    onChange={(e) => {
                      setHeading(e.target.value);
                    }}
                    placeholder="Enter your profile name"
                    className="px-6 xl:py-5 py-4 bg-[#F6F7F5] w-full rounded-[15px]"
                  />
                </div>
                <h1 className="mt-5 text-black font-sans text-[16px] font-medium">Bio</h1>
                <div className="w-full flex mt-2 pb-8 border-b-2 border-lightGray border-dotted flex-col gap-5">
                  <textarea
                    id="story"
                    value={subHeading}
                    onChange={(e) => {
                      setSubHeading(e.target.value);
                    }}
                    name="story"
                    rows="3"
                    cols="33"
                    placeholder="Enter your bio"
                    className="px-6 xl:py-5 py-4 bg-[#F6F7F5] w-full rounded-[15px] "
                  />
                  {platformLinks.map((selectedLink, index) => (
                    <div
                      key={index}
                      className="w-full flex flex-row items-center bg-[#F6F7F5] md:gap-6 gap-2 md:px-6 px-3 rounded-[10px] border-2 border-[#F6F7F5] duration-500 delay-75 transition-all">
                      {<selectedLink.icon color="#000" size={30} />}

                      <p className="w-full text-black font-sans md:text-[18px] text-[14px] bg-transparent py-5 outline-none">
                        {selectedLink.link}
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
              <h1 className="text-black font-sans text-[24px] font-semibold mt-5">
                Background
              </h1>
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
                    <h1 className="text-black font-sans text-[16px] font-medium mt-2">
                      Lavender
                    </h1>
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
            </div>
          </div>
          <div className="w-full xl:flex hidden xl:w-[30%] h-screen bg-transparent items-center justify-end">
            <div
              className={`mobile fixed w-[262px] h-[512px] bg-[${background}] rounded-[30px] border-[10px] border-black overflow-y-auto`}>
              <div className="w-full flex flex-col justify-center mt-10">
                {uploadedImage ? (
                  <div className="flex items-center justify-center">
                    <img
                      draggable="false"
                      src={uploadedImage}
                      width={75}
                      height={75}
                      alt="Picture of the author"
                      className="rounded-full"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Image
                      draggable="false"
                      src="/defaultUser.jpg"
                      width={75}
                      height={75}
                      alt="Picture of the author"
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
                        className="w-full flex flex-row items-center bg-white justify-between px-3 rounded-[10px] shadow-3xl">
                        <div>
                          <selectedLink.icon color="#5A5A5A" size={25} />
                        </div>

                        <p className=" text-black font-sans font-medium text-[14px] bg-transparent py-2 outline-none ">
                          {selectedLink.title}
                        </p>
                        <div>{<PiDotsThreeBold color="#5A5A5A" size={25} />}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* <div className="w-full  flex h-full my-auto bg-slate-500 m-auto justify-center items-center">
                <Image src="/Trimz_Logo.png" width={70} height={70} />
              </div> */}
            </div>
          </div>
        </div>
        <UploadModal
          isOpen={uploadModal}
          setIsOpen={setUploadModal}
          handleUploadedImage={handleUploadedImage}
        />
        <LinkModels
          isOpen={linkModal}
          setIsOpen={setLinkModal}
          addPlatformLink={addPlatformLink}
        />
      </div>
    </section>
  );
}
