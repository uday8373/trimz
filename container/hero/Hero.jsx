"use client";
import {useState, useEffect} from "react";
import React from "react";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {FaLink} from "react-icons/fa";
import Image from "next/image";
import {IoListSharp} from "react-icons/io5";
import {LuCopy, LuCopyCheck} from "react-icons/lu";
import {ThreeDots} from "react-loader-spinner";
import {MdOutlineQrCode} from "react-icons/md";
import {GrPowerReset} from "react-icons/gr";
import {IoMdShare} from "react-icons/io";
import Popover from "react-popover";
import {QrModal} from "../../components/QrModal";
import {Link as ScrollLink} from "react-scroll";
import {Modal} from "../../components/LoginModels";
import {motion} from "framer-motion";

export const Hero = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [isOneTime, setIsOneTime] = useState(false);
  const [isIpAddress, setIsIpAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [qrIsOpen, setQrIsOpen] = useState(false);
  const [shareIsOpen, setShareIsOpen] = useState(false);
  const [clearIsOpen, setClearIsOpen] = useState(false);
  const [copyIsOpen, setCopyIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isToken, setIsToken] = useState(false);
  const [popoverUrl, setPopoverUrl] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);

  const [baseUrl, setBaseUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!urlRegex.test(originalUrl)) {
      toast.error("Invalid URL");
      setLoading(false);
      return;
    }

    try {
      let headers = {
        "Content-Type": "application/json",
      };

      const token = await localStorage.getItem("token");

      if (token) {
        headers.token = token;
      }

      const ipAddressResponse = await fetch("https://api.ipify.org?format=json");
      const {ip} = await ipAddressResponse.json();

      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          originalUrl,
          userIp: ip,
          isCustom,
          customUrl,
          isOneTime,
          isIpAddress,
          ipAddress,
          isSignIn: isToken,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setShortUrl(data.url.shortUrl);
        localStorage.setItem("shortUrl", data.url.shortUrl);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error generating short URL:", error);
      toast.error("Error generating short URL");
    } finally {
      setLoading(false);
      setCustomUrl("");
      setIsCustom(false);
      setOriginalUrl("");
      setIsOneTime(false);
      setIpAddress("");
      setIsIpAddress(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(`${baseUrl}${shortUrl}`)
      .then(() => {
        setCopied(true);
        toast.success("Copy Successfully");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
  };

  const handleQrMouseEnter = () => {
    setQrIsOpen(true);
  };

  const handleQrMouseLeave = () => {
    setQrIsOpen(false);
  };

  const handleShareMouseEnter = () => {
    setShareIsOpen(true);
  };

  const handleShareMouseLeave = () => {
    setShareIsOpen(false);
  };
  const handleCopyMouseEnter = () => {
    setCopyIsOpen(true);
  };

  const handleCopyMouseLeave = () => {
    setCopyIsOpen(false);
  };
  const handleClearMouseEnter = () => {
    setClearIsOpen(true);
  };

  const handleClearMouseLeave = () => {
    setClearIsOpen(false);
  };

  useEffect(() => {
    const fetchUrl = window?.location.href;
    const modifiedUrl = fetchUrl.replace(/www\./, "");
    setBaseUrl(modifiedUrl);
    const token = localStorage.getItem("token");
    if (token) {
      setIsToken(true);
    } else {
      setIsToken(false);
    }

    const storedShortUrl = localStorage.getItem("shortUrl");
    if (storedShortUrl) {
      setShortUrl(storedShortUrl);
    }
  }, []);

  const handleQrModal = () => {
    setQrIsOpen(false);
    setIsOpen(!isOpen);
  };

  const handleShare = async () => {
    try {
      await navigator.share({url: `${baseUrl}${shortUrl}`});
    } catch (error) {
      console.error("Error sharing URL:", error);
      toast.error("Error sharing URL");
    }
  };

  const handleClear = () => {
    setLoading(false);
    setCustomUrl("");
    setIsCustom(false);
    setOriginalUrl("");
    setIsOneTime(false);
    setIpAddress("");
    setIsIpAddress(false);
    setShortUrl("");
    localStorage.removeItem("shortUrl");
  };

  return (
    <section
      id="home"
      className="relative flex items-center justify-center w-full min-h-full pt-16 md:pt-20 bg-bghero select-none">
      <div className="2xl:px-[146px] xl:px-36 lg:px-32 md:px-22 sm:px-16 px-6 flex-col-reverse xl:flex-row w-full flex items-center max-w-screen-2xl">
        <div className="flex flex-col w-full h-full py-10 md:py-14">
          <div className="flex">
            <motion.div
              initial={{y: 50, opacity: 0}}
              whileInView={{
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.8,
                  ease: [0.65, 0, 0.35, 1],
                  delay: 0.1,
                },
              }}
              viewport={{once: true}}
              className="font-sans font-bold text-[12px] text-pink bg-pink bg-opacity-15 rounded-3xl py-2 px-5 text-left">
              Free link Shortening
            </motion.div>
          </div>
          <motion.div
            initial={{y: 50, opacity: 0}}
            whileInView={{
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.8,
                ease: [0.65, 0, 0.35, 1],
                delay: 0.2,
              },
            }}
            viewport={{once: true}}
            className="font-sans font-bold text-[32px] md:text-[48px] text-black pt-5 leading-[42px] md:leading-[54px]">
            <span className="">Trimz</span> short URL & QR <br /> code generator
          </motion.div>
          <motion.div
            initial={{y: 50, opacity: 0}}
            whileInView={{
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.8,
                ease: [0.65, 0, 0.35, 1],
                delay: 0.3,
              },
            }}
            viewport={{once: true}}
            className="font-sans font-medium text-[16px] lg:text-[18px] text-gray pt-5">
            Advanced free short link generator for individuals & businesses, enhancing URL
            management and online presence.
          </motion.div>
          <div className="w-full py-5">
            <div>
              <form onSubmit={handleSubmit}>
                <motion.div
                  initial={{y: -50, opacity: 0}}
                  whileInView={{
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.8,
                      ease: [0.65, 0, 0.35, 1],
                      delay: 0.3,
                    },
                  }}
                  viewport={{once: true}}
                  className="bg-white border-2 border-primary border-opacity-50 rounded-[100px] relative flex flex-row justify-center items-center p-2 ">
                  <FaLink size={28} color="#637887" className="mx-5" />
                  <input
                    type="text"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    className=" text-black  text-[16px] placeholder-gray-[#637887] bg-transparent w-full pr-2 py-3 font-sans font-medium  relative focus:outline-none "
                    placeholder="Paste a link to shorten it"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary hidden md:flex w-44 justify-center items-center text-white font-sans font-semibold text-[16px] py-3 rounded-[100px] hover:bg-bghover transition-all duration-500">
                    {loading ? (
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
                      "Shorten"
                    )}
                  </button>
                </motion.div>

                <motion.div
                  initial={{x: -50, opacity: 0}}
                  whileInView={{
                    x: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.8,
                      ease: [0.65, 0, 0.35, 1],
                      delay: 0.3,
                    },
                  }}
                  viewport={{once: true}}
                  className="flex items-start w-full mt-5">
                  <div className="checkbox path">
                    <input
                      id="customUrl"
                      type="checkbox"
                      checked={isCustom}
                      onChange={(e) => {
                        if (isToken) {
                          setIsCustom(e.target.checked);
                        } else {
                          setIsOpenLogin(true);
                        }
                      }}
                    />
                    <svg viewBox="0 0 21 21">
                      <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                    </svg>
                  </div>
                  <label
                    htmlFor="customUrl"
                    className="ml-2 font-sans text-[16px] font-medium text-black cursor-pointer"
                    onChange={(e) => {
                      if (isToken) {
                        setIsCustom(e.target.checked);
                      } else {
                        setIsOpenLogin(true);
                      }
                    }}>
                    Customize your short link
                  </label>
                </motion.div>

                {isCustom && (
                  <input
                    type="text"
                    value={customUrl}
                    maxlength="10"
                    onChange={(e) => setCustomUrl(e.target.value)}
                    className="bg-white drop-shadow-sm mt-3 font-medium text-black text-[16px] placeholder-gray-[#637887] w-full  px-8 py-3 rounded-[100px] focus:outline-none"
                    placeholder="/example"
                    required
                  />
                )}
                <motion.div
                  initial={{x: -50, opacity: 0}}
                  whileInView={{
                    x: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.8,
                      ease: [0.65, 0, 0.35, 1],
                      delay: 0.4,
                    },
                  }}
                  viewport={{once: true}}
                  className="flex items-start w-full mt-5">
                  <div className="checkbox path">
                    <input
                      id="oneTime"
                      type="checkbox"
                      checked={isOneTime}
                      onChange={(e) => {
                        if (isToken) {
                          setIsOneTime(e.target.checked);
                        } else {
                          setIsOpenLogin(true);
                        }
                      }}
                    />
                    <svg viewBox="0 0 21 21">
                      <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                    </svg>
                  </div>
                  <label
                    htmlFor="oneTime"
                    onChange={(e) => {
                      if (isToken) {
                        setIsOneTime(e.target.checked);
                      } else {
                        setIsOpenLogin(true);
                      }
                    }}
                    className="ml-2  font-sans text-[16px] font-medium text-black cursor-pointer ">
                    Make this a one-time link that expires after one visit
                  </label>
                </motion.div>

                <motion.div
                  initial={{x: -50, opacity: 0}}
                  whileInView={{
                    x: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.8,
                      ease: [0.65, 0, 0.35, 1],
                      delay: 0.5,
                    },
                  }}
                  viewport={{once: true}}
                  className="flex items-start w-full mt-5">
                  <div className="checkbox path">
                    <input
                      id="restrict"
                      type="checkbox"
                      checked={isIpAddress}
                      onChange={(e) => {
                        if (isToken) {
                          setIsIpAddress(e.target.checked);
                        } else {
                          setIsOpenLogin(true);
                        }
                      }}
                    />
                    <svg viewBox="0 0 21 21">
                      <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                    </svg>
                  </div>
                  <label
                    htmlFor="restrict"
                    onChange={(e) => {
                      if (isToken) {
                        setIsIpAddress(e.target.checked);
                      } else {
                        setIsOpenLogin(true);
                      }
                    }}
                    className="ml-2 font-sans text-[16px] font-medium text-black cursor-pointer">
                    Restrict this link to only work for specific IP addresses
                  </label>
                </motion.div>

                {isIpAddress && (
                  <input
                    type="text"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                    className="bg-white mt-3 drop-shadow-sm text-black font-medium text-[16px] rounded-[100px] placeholder-gray-[#637887] w-full  px-8 py-3 focus:outline-none"
                    placeholder="xx.xx.xx.xx"
                    required
                  />
                )}

                <button
                  type="submit"
                  className="w-full md:hidden flex bg-primary justify-center items-center mt-5 text-white h-16 rounded-[100px] text-[18px] font-semibold hover:bg-bghover transition-all duration-500"
                  disabled={loading}>
                  {loading ? (
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
                    "Shorten"
                  )}
                </button>
              </form>
              {shortUrl && (
                <>
                  <div className="mb-5">
                    <motion.div
                      initial={{y: 50, opacity: 0}}
                      whileInView={{
                        y: 0,
                        opacity: 1,
                        transition: {
                          duration: 0.8,
                          ease: [0.65, 0, 0.35, 1],
                          delay: 0.1,
                        },
                      }}
                      viewport={{once: true}}
                      className="text-black text-[16px] w-full flex items-center justify-between bg-white drop-shadow-lg rounded-xl py-5 border-2 border-dotted border-opacity-50 border-primary mt-3 px-5">
                      <h1 className="font-semibold">
                        {baseUrl}
                        {shortUrl}
                      </h1>
                      <div
                        onMouseEnter={handleCopyMouseEnter}
                        onMouseLeave={handleCopyMouseLeave}>
                        <Popover
                          isOpen={copyIsOpen}
                          body={
                            <div className="px-4 py-2 text-white rounded-md shadow-xl popover-content bg-bghover">
                              Copy to clipboard
                            </div>
                          }>
                          <button
                            onClick={copyToClipboard}
                            className="flex items-center ml-1 font-bold text-primary hover:text-blue-700 focus:outline-none">
                            {copied ? <LuCopyCheck size={25} /> : <LuCopy size={25} />}
                          </button>
                        </Popover>
                      </div>
                    </motion.div>
                    <div className="flex flex-row items-center justify-between w-full mt-5 overflow-hidden ">
                      <motion.div
                        initial={{x: -50, opacity: 0}}
                        whileInView={{
                          x: 0,
                          opacity: 1,
                          transition: {
                            duration: 0.8,
                            ease: [0.65, 0, 0.35, 1],
                            delay: 0.2,
                          },
                        }}
                        viewport={{once: true}}
                        onMouseEnter={handleQrMouseEnter}
                        onMouseLeave={handleQrMouseLeave}>
                        <Popover
                          isOpen={qrIsOpen}
                          body={
                            <div className="px-4 py-2 text-white rounded-md shadow-xl popover-content bg-bghover">
                              Generate QR code
                            </div>
                          }>
                          <button
                            onClick={handleQrModal}
                            className="flex flex-row justify-center items-center gap-3 bg-pink px-5 py-3 rounded-[15px] hover:bg-bghover transition-all duration-500">
                            <MdOutlineQrCode size={25} color="white" />
                            <h1 className="font-sans font-medium text-[18px] text-white hidden md:flex">
                              QR
                            </h1>
                          </button>
                        </Popover>
                        <QrModal
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          BaseUrl={baseUrl}
                          shortUrl={shortUrl}
                        />
                      </motion.div>

                      <motion.div
                        initial={{x: -50, opacity: 0}}
                        whileInView={{
                          x: 0,
                          opacity: 1,
                          transition: {
                            duration: 0.8,
                            ease: [0.65, 0, 0.35, 1],
                            delay: 0.3,
                          },
                        }}
                        viewport={{once: true}}
                        onMouseEnter={handleShareMouseEnter}
                        onMouseLeave={handleShareMouseLeave}>
                        <Popover
                          isOpen={shareIsOpen}
                          body={
                            <div className="px-4 py-2 text-white rounded-md shadow-xl popover-content bg-bghover">
                              Share It
                            </div>
                          }>
                          <button
                            onClick={handleShare}
                            className="flex flex-row justify-center items-center gap-3 bg-pink px-5 py-3 rounded-[15px] hover:bg-bghover transition-all duration-500">
                            <IoMdShare size={25} color="white" />
                            <h1 className="font-sans font-medium text-[18px] text-white hidden md:flex">
                              Share
                            </h1>
                          </button>
                        </Popover>
                      </motion.div>

                      <motion.div
                        initial={{x: -50, opacity: 0}}
                        whileInView={{
                          x: 0,
                          opacity: 1,
                          transition: {
                            duration: 0.8,
                            ease: [0.65, 0, 0.35, 1],
                            delay: 0.4,
                          },
                        }}
                        viewport={{once: true}}>
                        <Popover
                          isOpen={popoverUrl}
                          body={
                            <div className="px-4 py-2 text-white rounded-md shadow-xl popover-content bg-bghover">
                              Go to shorten URL history
                            </div>
                          }>
                          <ScrollLink
                            onMouseEnter={() => setPopoverUrl(true)}
                            onMouseLeave={() => setPopoverUrl(false)}
                            to="myurls"
                            spy={true}
                            smooth={true}
                            offset={-90}
                            duration={300}
                            className="flex flex-row justify-center items-center gap-3 bg-pink  px-5 py-3 rounded-[15px] hover:bg-bghover transition-all duration-500 cursor-pointer">
                            <IoListSharp size={25} color="white" />
                            <h1 className="font-sans font-medium text-[18px] text-white hidden md:flex">
                              My URLs
                            </h1>
                          </ScrollLink>
                        </Popover>
                      </motion.div>
                      <motion.div
                        initial={{x: -50, opacity: 0}}
                        whileInView={{
                          x: 0,
                          opacity: 1,
                          transition: {
                            duration: 0.8,
                            ease: [0.65, 0, 0.35, 1],
                            delay: 0.5,
                          },
                        }}
                        viewport={{once: true}}
                        onMouseEnter={handleClearMouseEnter}
                        onMouseLeave={handleClearMouseLeave}>
                        <Popover
                          isOpen={clearIsOpen}
                          body={
                            <div className="px-4 py-2 text-white rounded-md shadow-xl popover-content bg-bghover">
                              Clear it
                            </div>
                          }>
                          <button
                            onClick={handleClear}
                            className="flex flex-row justify-center items-center gap-3 bg-pink  px-5 py-3 rounded-[15px] hover:bg-bghover transition-all duration-500">
                            <GrPowerReset size={25} color="white" />
                            <h1 className="font-sans font-medium text-[18px] text-white hidden md:flex">
                              Clear
                            </h1>
                          </button>
                        </Popover>
                      </motion.div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <motion.div
          initial={{x: 50, opacity: 0}}
          whileInView={{
            x: 0,
            opacity: 1,
            transition: {
              duration: 0.8,
              ease: [0.65, 0, 0.35, 1],
              delay: 0.1,
            },
          }}
          viewport={{once: true}}
          className="flex items-center justify-center w-full h-full">
          <Image src="/url.svg" width={600} height={600} alt="Picture of the author" />
        </motion.div>
        <Modal isOpen={isOpenLogin} setIsOpen={setIsOpenLogin} />
      </div>
    </section>
  );
};
