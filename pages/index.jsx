"use client";
import {useState, useEffect} from "react";
import React from "react";
import Layout from "../components/Layout";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {FaLink} from "react-icons/fa";
import Image from "next/image";
import {IoListSharp} from "react-icons/io5";
import {LuCopy, LuCopyCheck} from "react-icons/lu";
import {Puff} from "react-loader-spinner";
import {MdOutlineQrCode} from "react-icons/md";
import {IoAnalyticsOutline} from "react-icons/io5";
import {IoMdShare} from "react-icons/io";
import Popover from "react-popover";
import {MdCurrencyRupee} from "react-icons/md";
import {FaArrowUpLong} from "react-icons/fa6";

import {QrModal} from "../components/QrModal";
import {motion} from "framer-motion";

const Home = () => {
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
  const [copyIsOpen, setCopyIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [baseUrl, setBaseUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!urlRegex.test(originalUrl)) {
      toast.error("Invalid URL");
      setLoading(false);
      return;
    }
    try {
      const ipAddressResponse = await fetch("https://api.ipify.org?format=json");

      const {ip} = await ipAddressResponse.json();

      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalUrl,
          userIp: ip,
          isCustom,
          customUrl,
          isOneTime,
          isIpAddress,
          ipAddress,
        }),
      });
      const data = await response.json();
      if (data.message === "Custom short ID already exists") {
        toast.error("Custom short ID already exists");
      } else if (data.message === "Invalid URL") {
        toast.error("Invalid URL");
      } else {
        setShortUrl(data.url.shortUrl);
        toast.success(data.message);
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

  useEffect(() => {
    const fetchUrl = window?.location.href;
    const modifiedUrl = fetchUrl.replace(/www\./, "");
    setBaseUrl(modifiedUrl);
  }, []);

  const handleQrModal = () => {
    setQrIsOpen(false);
    setIsOpen(!isOpen);
  };

  //
  return (
    <Layout>
      <section
        id="home"
        className="relative flex items-center justify-center w-full min-h-full pt-16 md:pt-20 bg-bghero">
        <div className="2xl:px-[146px] xl:px-36 lg:px-32 md:px-22 sm:px-16 px-6 flex-col-reverse xl:flex-row w-full flex items-center max-w-screen-2xl">
          <div className="flex flex-col w-full h-full py-10 md:py-14">
            <div className="flex">
              <h1 className="font-sans font-bold text-[12px] text-pink bg-pink bg-opacity-15 rounded-3xl py-2 px-5 text-left">
                Easy link Shortening
              </h1>
            </div>
            <h1 className="font-sans font-bold text-[32px] md:text-[48px] text-black pt-5 leading-[42px] md:leading-[54px]">
              <span className="">Trimz</span> short URL & QR <br /> code generator
            </h1>
            <h1 className="font-sans font-medium text-[16px] lg:text-[18px] text-gray pt-5">
              A short link allows you to collect so much data about your customers & their
              behaviors.
            </h1>
            <div className="w-full py-5">
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="bg-white border-2 border-primary border-opacity-50 rounded-[100px] relative flex flex-row justify-center items-center p-2 ">
                    <FaLink size={30} color="#637887" className="mx-5" />
                    <input
                      type="text"
                      value={originalUrl}
                      onChange={(e) => setOriginalUrl(e.target.value)}
                      className=" text-black text-[16px] placeholder-gray-[#637887] bg-transparent w-full pr-2 py-3 font-sans font-medium  relative focus:outline-none "
                      placeholder="Paste a link to shorten it"
                      required
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-primary hidden md:flex w-44 justify-center items-center text-white font-sans font-semibold text-[16px] py-3 rounded-[100px] hover:bg-bghover transition-all duration-500">
                      {loading ? (
                        <Puff
                          visible={true}
                          height="24"
                          width="24"
                          color="#fff"
                          ariaLabel="puff-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      ) : (
                        "Shorten"
                      )}
                    </button>
                  </div>

                  <div className="flex items-start w-full mt-5 ">
                    <div className="checkbox path">
                      <input
                        type="checkbox"
                        checked={isCustom}
                        onChange={(e) => setIsCustom(e.target.checked)}
                      />
                      <svg viewBox="0 0 21 21">
                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                      </svg>
                    </div>
                    <label
                      htmlFor="customUrl"
                      className="ml-2 font-sans text-[16px] font-medium text-black ">
                      Customize your short link
                    </label>
                  </div>
                  {isCustom && (
                    <input
                      type="text"
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      className="bg-white drop-shadow-sm mt-3 font-medium text-black text-[16px] placeholder-gray-[#637887] w-full  px-8 py-3 rounded-[100px] focus:outline-none"
                      placeholder="example"
                      required
                    />
                  )}
                  <div className="flex items-start w-full mt-5">
                    <div className="checkbox path">
                      <input
                        type="checkbox"
                        checked={isOneTime}
                        onChange={(e) => setIsOneTime(e.target.checked)}
                      />
                      <svg viewBox="0 0 21 21">
                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                      </svg>
                    </div>
                    <label className="ml-2  font-sans text-[16px] font-medium text-black ">
                      Make this a one-time link that expires after one visit
                    </label>
                  </div>

                  <div className="flex items-start w-full mt-5">
                    <div className="checkbox path">
                      <input
                        type="checkbox"
                        checked={isIpAddress}
                        onChange={(e) => setIsIpAddress(e.target.checked)}
                      />
                      <svg viewBox="0 0 21 21">
                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                      </svg>
                    </div>
                    <label className="ml-2 font-sans text-[16px] font-medium text-black">
                      Restrict this link to only work for specific IP addresses
                    </label>
                  </div>

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
                      <Puff
                        visible={true}
                        height="24"
                        width="24"
                        color="#fff"
                        ariaLabel="puff-loading"
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
                      <div className="text-black text-[16px] w-full flex items-center justify-between bg-white drop-shadow-lg rounded-xl py-5 border-2 border-dotted border-opacity-50 border-primary mt-3 px-5">
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
                      </div>
                      <div className="flex flex-row items-center justify-between w-full mt-5 overflow-hidden ">
                        <div
                          onMouseEnter={handleQrMouseEnter}
                          onMouseLeave={handleQrMouseLeave}>
                          <Popover
                            isOpen={qrIsOpen}
                            // preferPlace="below"
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
                        </div>

                        {/* <button className="flex flex-row justify-center items-center gap-3 bg-pink  px-5 py-3 rounded-[15px] hover:bg-bghover transition-all duration-500">
                        <IoAnalyticsOutline size={25} color="white" />
                        <h1 className="font-sans font-medium text-[18px] text-white hidden md:flex">
                          Analytics
                        </h1>
                      </button> */}
                        {/* <div
                        onMouseEnter={handleShareMouseEnter}
                        onMouseLeave={handleShareMouseLeave}>
                        <Popover
                          isOpen={shareIsOpen}
                          preferPlace="below"
                          body={
                            <div className="px-4 py-2 text-white rounded-md shadow-xl popover-content bg-bghover">
                              Share your short URL
                            </div>
                          }>
                          <button className="flex flex-row justify-center items-center gap-3 bg-pink px-5 py-3 rounded-[15px] hover:bg-bghover transition-all duration-500">
                            <IoMdShare size={25} color="white" />
                            <h1 className="font-sans font-medium text-[18px] text-white hidden md:flex">
                              Share
                            </h1>
                          </button>
                        </Popover>
                      </div> */}
                        {/* <button className="flex flex-row justify-center items-center gap-3 bg-pink  px-5 py-3 rounded-[15px] hover:bg-bghover transition-all duration-500">
                        <IoListSharp size={25} color="white" />
                        <h1 className="font-sans font-medium text-[18px] text-white hidden md:flex">
                          My URLs
                        </h1>
                      </button> */}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full h-full">
            <Image src="/url.svg" width={600} height={600} alt="Picture of the author" />
          </div>
        </div>
      </section>
      <section className="relative flex items-center justify-center w-full min-h-full bg-[#fbfaff] py-10">
        <div className="2xl:px-[146px] xl:px-36 lg:px-32 md:px-22 sm:px-16 px-6  flex-col-reverse xl:flex-row w-full flex items-center max-w-screen-2xl">
          <div className="flex flex-col items-center justify-center w-full h-full gap-8 pb-10 lg:flex-row">
            <div className="relative flex items-center justify-center w-full py-20 rounded-[15px]  bg-[#e2deff] lg:w-1/2">
              <Image
                src="/analytics.jpg"
                width={600}
                height={600}
                className="md:w-[300px] w-full h-auto rounded-[10px]"
              />
              <motion.div
                initial={{y: -15}}
                animate={{y: 15}}
                transition={{
                  type: "smooth",
                  repeatType: "mirror",
                  duration: 2,
                  delay: 0.9,
                  repeat: Infinity,
                }}
                className="absolute px-4 top-10 right-0 md:right-10 shadow-2xl rounded-[10px] py-2 bg-white
                ">
                <p className="font-sans text-secondary">Sales</p>
                <div className="flex flex-col w-full">
                  <div className="flex flex-row w-full gap-2">
                    <p className="flex items-center font-sans font-semibold">
                      <MdCurrencyRupee />
                      27549
                    </p>
                    <span className="flex items-center font-sans text-sm text-green-400">
                      +2.5
                      <FaArrowUpLong size={12} />
                    </span>
                  </div>
                  <p className="text-[10px] font-sans text-gray ">
                    {" "}
                    Compared to last year
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{y: -15}}
                animate={{y: 15}}
                transition={{
                  type: "smooth",
                  repeatType: "mirror",
                  duration: 3,
                  delay: 0.8,
                  repeat: Infinity,
                }}
                className="absolute px-4  bottom-8 right-0  md:right-20 shadow-2xl rounded-[10px] py-2 bg-white">
                <p className="font-sans text-secondary">Daily Clicks</p>
                <div className="flex flex-row w-full gap-2">
                  <Image src="/Like.svg" width={0} height={0} className="w-6 h-6" />
                  <p className="flex items-center text-lg font-semibold">750 +</p>
                </div>
              </motion.div>
              <motion.div
                initial={{y: -15}}
                animate={{y: 15}}
                transition={{
                  type: "smooth",
                  repeatType: "mirror",
                  duration: 2,
                  delay: 0.8,
                  repeat: Infinity,
                }}
                className="absolute  hidden bottom-14 left-8 md:flex items-center gap-2 px-4 py-2 bg-white shadow-2xl rounded-[10px] ">
                <Image src="profile.svg" width={0} height={0} className="w-10" />
                <p>Mithun Gorai</p>
              </motion.div>
            </div>
            <div className="flex flex-col justify-start w-full h-full gap-4 lg:w-1/2 ">
              <div className="flex">
                <h1 className="font-sans font-bold text-[12px] text-pink bg-pink bg-opacity-15 rounded-3xl py-2 px-5 text-left">
                  Sales & Marketing
                </h1>
              </div>
              <div className="flex flex-col gap-5">
                <span className="font-sans font-bold text-[32px] md:text-[38px] text-black">
                  Perfect for sales & marketing
                </span>
                <p>
                  Understanding your users and customers will help you increase your
                  conversion. Our system allows you to track everything. Whether it is the
                  amount of clicks, the country or the referrer, the data is there for you
                  to analyze it.
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3" items-center>
                    <Image
                      src="/thunderbolt.svg"
                      width={0}
                      height={0}
                      className="w-5 h-5"
                    />
                    <p>Redirection Tools</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Image
                      src="/analytics.svg"
                      width={0}
                      height={0}
                      className="w-5 h-5"
                    />
                    <p>Powerful Statistics</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Image src="/profile.svg" width={0} height={0} className="w-5 h-5" />
                    <p>Beautiful Profiles</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
