import React, {useState, useEffect} from "react";
import {Dialog} from "@headlessui/react";
import {RxCross2} from "react-icons/rx";
import {motion, AnimatePresence} from "framer-motion";
import {LuSearch} from "react-icons/lu";

import {GoChevronRight} from "react-icons/go";

import {IoIosArrowBack} from "react-icons/io";
import {linkButton} from "../constants";

import {TfiEmail} from "react-icons/tfi";
import {BsThreads} from "react-icons/bs";
import {FaSquareFacebook} from "react-icons/fa6";
import {FiInstagram} from "react-icons/fi";

import {
  RiYoutubeLine,
  RiTiktokFill,
  RiSnapchatLine,
  RiDiscordLine,
  RiGithubLine,
  RiLinkedinLine,
  RiTelegramLine,
  RiTwitchLine,
  RiTwitterXLine,
} from "react-icons/ri";

export default function LinkModels({isOpen, setIsOpen, addPlatformLink}) {
  const [platform, setPlatform] = useState("");
  const [link, setLink] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [linkError, setLinkError] = useState("");

  const handleCloseModal = () => {
    setIsOpen(false);
    setPlatform("");
    setLinkError("");
  };

  const handleAddLink = () => {
    const platformData = {
      id: platform.id,
      title: platform.title,
      icon: platform.icon,
      link: link,
    };
    const isValid = validateLink(link, platform.validationPattern);
    if (!isValid) {
      setLinkError(`Please enter a valid ${platform.title} link.`);
      return;
    }
    addPlatformLink(platformData);
    setPlatform("");
    setIsOpen(false);
    setLinkError("");
  };
  const handleBack = () => {
    setPlatform("");
    setLinkError("");
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const sortedLinks = linkButton.slice().sort((a, b) => a.title.localeCompare(b.title));

  const filteredLinks = sortedLinks.filter((link) =>
    link.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const validateLink = (link, pattern) => {
    const regex = new RegExp(pattern);
    return regex.test(link);
  };

  const renderSocialIcon = (platform) => {
    switch (platform) {
      case "Instagram":
        return <FiInstagram color="#5A5A5A" size={25} />;
      case "Facebook":
        return <FaSquareFacebook color="#5A5A5A" size={25} />;
      case "Youtube":
        return <RiYoutubeLine color="#5A5A5A" size={25} />;
      case "Tiktok":
        return <RiTiktokFill color="#5A5A5A" size={25} />;
      case "Snapchat":
        return <RiSnapchatLine color="#5A5A5A" size={25} />;
      case "Discord":
        return <RiDiscordLine color="#5A5A5A" size={25} />;
      case "Github":
        return <RiGithubLine color="#5A5A5A" size={25} />;
      case "Linkedin":
        return <RiLinkedinLine color="#5A5A5A" size={25} />;
      case "Telegram":
        return <RiTelegramLine color="#5A5A5A" size={25} />;
      case "Twitch":
        return <RiTwitchLine color="#5A5A5A" size={25} />;
      case "X":
        return <RiTwitterXLine color="#5A5A5A" size={25} />;
      case "Email":
        return <TfiEmail color="#5A5A5A" size={25} />;
      case "Threads":
        return <BsThreads color="#5A5A5A" size={25} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={setIsOpen}
          as="div"
          className="fixed inset-0 z-10 flex items-center justify-center overflow-hidden bg-black/25">
          <div className="flex flex-col h-full overflow-hidden text-center mb-20 ">
            <Dialog.Overlay />

            <button
              onClick={handleCloseModal}
              className="fixed inset-0 transition-opacity cursor-default"
              aria-hidden="true">
              <div className="absolute inset-0 bg-black/40"></div>
            </button>

            <motion.div
              className="flex items-center justify-center min-h-screen  md:pb-0 text-center sm:block sm:p-0"
              initial={{
                opacity: 0,
                scale: 0.75,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  ease: "easeOut",
                  duration: 0.15,
                },
              }}
              exit={{
                opacity: 0,
                scale: 0.75,
                transition: {
                  ease: "easeIn",
                  duration: 0.15,
                },
              }}>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true">
                &#8203;
              </span>
              <div
                className="inline-block overflow-hidden align-bottom transition-all transform  shadow-3xl  rounded-[15px]  bg-white sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline">
                <div className="md:w-[400px] h-auto w-full ">
                  <div className="relative flex w-full px-4 pt-5">
                    {platform && (
                      <div className="absolute left-5 top-4">
                        <button
                          type="button"
                          tabIndex={0}
                          className="flex items-center justify-center px-2 py-2 hover:bg-slate-100 rounded-full"
                          onClick={handleBack}>
                          <IoIosArrowBack size={20} />
                        </button>
                      </div>
                    )}

                    <div className="flex items-center justify-center w-full ">
                      <p className="font-sans text-[18px] font-semibold text-black ">
                        {platform ? `Add ${platform.title} Link` : "Add Link Icon"}
                      </p>
                    </div>

                    <div className="absolute right-5 top-4">
                      <button
                        type="button"
                        tabIndex={0}
                        className="flex items-center justify-center px-2 py-2 hover:bg-slate-100 rounded-full"
                        onClick={handleCloseModal}>
                        <RxCross2 size={20} />
                      </button>
                    </div>
                  </div>
                  <div className={`flex flex-col items-center justify-center px-8 py-5 `}>
                    {platform ? (
                      <>
                        <div className="w-full flex flex-row items-center bg-[#F6F7F5] gap-3 px-4 rounded-[10px] border-2 border-[#F6F7F5] hover:border-lightGray duration-500 delay-75 transition-all">
                          <input
                            id={platform}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder={`Enter ${platform.title} Link*`}
                            type="text"
                            pattern={platform.validationPattern}
                            title={platform.validationMessage}
                            className="w-full bg-transparent py-3 outline-none"
                          />
                        </div>
                        {linkError && (
                          <p className="text-red-500 mt-1 text-sm">{linkError}</p>
                        )}
                        <button
                          disabled={!link}
                          onClick={handleAddLink}
                          className="mt-5 font-sans disabled:bg-[#abaaaa] text-white hover:bg-bghover transition-all duration-500 delay-75 font-semibold text-[16px] px-5 py-3 w-full bg-primary rounded-full">
                          Add to Link
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="w-full flex flex-row items-center bg-[#F6F7F5] gap-3 px-4 rounded-[10px] border-2 border-[#F6F7F5] hover:border-lightGray duration-500 delay-75 transition-all">
                          <label htmlFor="search" className="cursor-text">
                            <LuSearch size={25} />
                          </label>
                          <input
                            id="search"
                            placeholder="Search"
                            type="search"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            className="w-full bg-transparent py-3 outline-none"
                          />
                        </div>
                        <div className="w-full flex h-[250px] mt-3 flex-col overflow-y-auto">
                          {filteredLinks.map((link, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setPlatform(link);
                              }}
                              className="w-full flex flex-row justify-between items-center px-4 hover:bg-[#F6F7F5] rounded-[10px] ">
                              <div className="flex items-center gap-3">
                                {renderSocialIcon(link.title)}
                                <p className="py-3 font-sans text-[16px]">{link.title}</p>
                              </div>

                              <GoChevronRight size={25} />
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
