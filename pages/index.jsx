"use client";
import { useState, useEffect } from "react";
import React from "react";
import Layout from "../components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../constants";
import { FaLink } from "react-icons/fa";
import Image from "next/image";
import dbConnect from "../utils/dbConnect";

import { PiCopySimpleLight, PiCopySimpleFill } from "react-icons/pi";
import { MdOutlineQrCode, MdOutlineContentCopy } from "react-icons/md";
import { IoAnalyticsOutline } from "react-icons/io5";
import { IoMdShare } from "react-icons/io";

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
      const ipAddressResponse = await fetch(
        "https://api.ipify.org?format=json"
      );

      const { ip } = await ipAddressResponse.json();

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
      .writeText(`${BASE_URL}${shortUrl}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
  };

  // const connectionDB = async () => {
  //   await dbConnect();
  // };

  // useEffect(() => {
  //   connectionDB();
  // }, []);

  return (
    <Layout>
      <section
        id="home"
        className="relative min-h-screen items-center flex justify-center w-full  bg-bghero"
      >
        <ToastContainer position="bottom-right" />

        <div className="2xl:px-[146px] xl:px-36 lg:px-32 md:px-22 sm:px-16 px-6 flex-col-reverse md:flex-row w-full flex items-center max-w-screen-2xl">
          <div className="w-full h-full flex flex-col mt-10">
            <div className="flex">
              <h1 className="font-sans font-bold text-[12px] text-pink bg-pink bg-opacity-15 rounded-3xl py-2 px-5 text-left">
                Easy link Shortening
              </h1>
            </div>
            <h1 className="font-sans font-bold text-[32px] md:text-[48px] text-black pt-5 leading-[42px] md:leading-[54px]">
              Trimz short URL & QR <br /> code generator
            </h1>
            <h1 className="font-sans font-medium text-[18px] text-gray pt-5">
              A short link allows you to collect so much data about your
              customers & their behaviors.
            </h1>
            <div className="w-full py-5">
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="bg-white border-2 border-primary border-opacity-50 rounded-[100px] relative flex flex-row justify-center items-center ">
                    <FaLink size={30} color="#637887" className="ml-8" />
                    <input
                      type="text"
                      value={originalUrl}
                      onChange={(e) => setOriginalUrl(e.target.value)}
                      className=" text-black text-[16px] placeholder-gray-[#637887] w-full py-5 font-sans font-medium px-5  relative focus:outline-none "
                      placeholder="Paste a link to shorten it"
                      required
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-primary text-white font-sans font-semibold text-[14px] py-3 p-10 m-2 rounded-[100px] hover:bg-bghover transition-all duration-500"
                    >
                      {loading ? "Generating..." : "Generate"}
                    </button>
                  </div>

                  <div className="w-full flex items-center pt-5 ">
                    <input
                      type="checkbox"
                      checked={isCustom}
                      onChange={(e) => setIsCustom(e.target.checked)}
                      className="w-5 h-5 bg-black ease-soft"
                    />
                    <label
                      htmlFor="customUrl"
                      className="ml-2 font-sans text-[16px] font-medium text-black "
                    >
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
                  <div className="w-full flex items-center pt-5">
                    <input
                      type="checkbox"
                      checked={isOneTime}
                      onChange={(e) => setIsOneTime(e.target.checked)}
                      className="w-5 h-5 bg-black ease-soft"
                    />
                    <label className="ml-2  font-sans text-[16px] font-medium text-black ">
                      Make this a one-time link that expires after one visit
                    </label>
                  </div>

                  <div className="w-full flex items-center pt-5">
                    <input
                      type="checkbox"
                      checked={isIpAddress}
                      onChange={(e) => setIsIpAddress(e.target.checked)}
                      className="w-5 h-5 bg-black ease-soft"
                    />
                    <label className="ml-2  font-sans text-[16px] font-medium  text-black">
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

                  {/* <button
                    type="submit"
                    className="w-full bg-primary mt-5 text-white px-5 py-3 rounded-xl text-[16px] font-semibold hover:bg-bghover transition-all duration-500"
                    disabled={loading}
                  >
                    {loading ? "Generating..." : "Generate"}
                  </button>
                  <h1 className="text-[#637887] text-[14px] text-center font-sans mt-2">
                    Short links are easier to share and remember
                  </h1> */}
                </form>
                {shortUrl && (
                  <>
                    <div className="text-black text-[16px] w-full flex justify-between bg-white drop-shadow-lg rounded-xl py-5 border-2 border-dotted border-opacity-50 border-primary mt-3 px-5">
                      <h1 className="font-semibold">
                        {BASE_URL}
                        {shortUrl}
                      </h1>
                      <button
                        onClick={copyToClipboard}
                        className="text-primary hover:text-blue-700 ml-1 focus:outline-none font-bold"
                      >
                        {copied ? (
                          <PiCopySimpleFill size={25} />
                        ) : (
                          <PiCopySimpleLight size={25} />
                        )}
                      </button>
                    </div>
                    <div className="flex flex-row items-center justify-between overflow-hidden w-full my-5 ">
                      <button className="flex flex-row justify-center items-center gap-3 bg-pink  px-5 py-3 rounded-[15px] hover:bg-bghover transition-all duration-500 ">
                        <MdOutlineQrCode size={25} color="white" />
                        <h1 className="font-sans font-medium text-[18px] text-white hidden md:flex">
                          QR
                        </h1>
                      </button>
                      <button className="flex flex-row justify-center items-center gap-3 bg-pink  px-5 py-3 rounded-[15px] hover:bg-bghover transition-all duration-500">
                        <IoAnalyticsOutline size={25} color="white" />
                        <h1 className="font-sans font-medium text-[18px] text-white hidden md:flex">
                          Analytics
                        </h1>
                      </button>
                      <button className="flex flex-row justify-center items-center gap-3 bg-pink  px-5 py-3 rounded-[15px] hover:bg-bghover transition-all duration-500">
                        <IoMdShare size={25} color="white" />
                        <h1 className="font-sans font-medium text-[18px] text-white hidden md:flex">
                          Share
                        </h1>
                      </button>
                      <button className="flex flex-row justify-center items-center gap-3 bg-pink  px-5 py-3 rounded-[15px] hover:bg-bghover transition-all duration-500">
                        <MdOutlineContentCopy size={25} color="white" />
                        <h1 className="font-sans font-medium text-[18px] text-white hidden md:flex">
                          Copy
                        </h1>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="w-full h-full flex justify-end items-center">
            <Image
              src="/url.svg"
              width={600}
              height={600}
              alt="Picture of the author"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
