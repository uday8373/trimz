"use client";
import { useState } from "react";
import Layout from "../components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../constants";

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

  return (
    <Layout>
      <section
        id="home"
        className="relative h-screen flex justify-center w-full pt-20 bg-background"
      >
        <ToastContainer position="bottom-right" />
        <div className="2xl:px-[146px] xl:px-36 lg:px-32 md:px-22 sm:px-16 px-6 flex-col  w-full flex items-center max-w-screen-2xl">
          <h1 className="mt-10 font-serif font-semibold text-[32px] text-black">
            Create a short link
          </h1>
          <div className="w-full px-5 py-5 md:w-[40%] ">
            <div>
              <h1 className="text-[16px] font-sans font-medium text-black">
                Paste your long URL here
              </h1>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  className="bg-watermark mt-3 text-black text-[16px] placeholder-gray-[#637887] w-full  px-5 py-3 rounded-xl focus:outline-none"
                  placeholder="https://"
                  required
                />

                <div className="w-full flex items-center pt-5">
                  <input
                    type="checkbox"
                    checked={isCustom}
                    onChange={(e) => setIsCustom(e.target.checked)}
                    className="w-5 h-5 bg-black ease-soft"
                  />
                  <label
                    htmlFor="customUrl"
                    className="ml-2 pb-[2px] font-sans text-[16px] font-medium text-black"
                  >
                    Customize your short link
                  </label>
                </div>
                {isCustom && (
                  <input
                    type="text"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    className="bg-watermark mt-3 text-black text-[16px] placeholder-gray-[#637887] w-full  px-5 py-3 rounded-xl focus:outline-none"
                    placeholder="bit.ly/"
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
                  <label className="ml-2 pb-[2px] font-sans text-[16px] font-medium text-black">
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
                  <label className="ml-2 pb-[2px] font-sans text-[16px] font-medium text-black">
                    Restrict this link to only work for specific IP addresses
                  </label>
                </div>
                {isIpAddress && (
                  <input
                    type="text"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                    className="bg-watermark mt-3 text-black text-[16px] placeholder-gray-[#637887] w-full  px-5 py-3 rounded-xl focus:outline-none"
                    placeholder="xx.xx.xx.xx"
                    required
                  />
                )}

                <button
                  type="submit"
                  className="w-full bg-primary mt-5 text-white px-5 py-3 rounded-xl text-[16px] font-semibold hover:bg-bghover transition-all duration-500"
                  disabled={loading}
                >
                  {loading ? "Generating..." : "Generate"}
                </button>
                <h1 className="text-[#637887] text-[14px] text-center font-sans mt-2">
                  Short links are easier to share and remember
                </h1>
              </form>
              {shortUrl && (
                <div className="text-black text-[16px] w-full flex justify-between bg-watermark rounded-xl py-3 mt-3 px-5">
                  <h1 className="font-semibold">
                    {BASE_URL}
                    {shortUrl}
                  </h1>
                  <button
                    onClick={copyToClipboard}
                    className="text-blue-500 hover:text-blue-700 ml-1 focus:outline-none font-bold"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
