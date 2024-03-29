import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Router from "next/router";
import Image from "next/image";
import {PiDotsThreeBold} from "react-icons/pi";
import {FiInstagram} from "react-icons/fi";
import {TfiEmail} from "react-icons/tfi";
import {BsThreads} from "react-icons/bs";
import {FaSquareFacebook} from "react-icons/fa6";

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

export default function TrimzLinks() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [platformLinks, setPlatformLinks] = useState([]);
  const [background, setBackground] = useState("#E9F6FF");

  useEffect(() => {
    async function fetchMyAPI() {
      const {trimzLink} = router.query;
      console.log("trimzLink", trimzLink);
      if (trimzLink) {
        fetch(`/api/profile/${trimzLink}`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              setError(true);
              throw new Error("Failed to fetch original URL");
            }
          })
          .then((data) => {
            console.log("response", data);
            setUploadedImage(data.image);
            setHeading(data.name);
            setSubHeading(data.about);
            setBackground(data.backgroundColor);
            setPlatformLinks(data.socialLinks);
          })
          .catch((error) => {
            console.error(error);
            setError(true);
          });
      }
    }
    fetchMyAPI();
  }, [router]);

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

  const handleShare = async (url) => {
    try {
      await navigator.share({url: `${url}`});
    } catch (error) {
      console.error("Error sharing URL:", error);
      toast.error("Error sharing URL");
    }
  };

  if (error) {
    return (
      <>
        <div className="w-full h-screen flex justify-center items-center flex-col bg-background">
          <Image
            src="/404_page.svg"
            width={0}
            height={0}
            alt="URL shortener for businesses"
            className="sm:w-[350px]  sm:h-auto w-[250px] object-contain"
          />
          <h1 className="text-black font-sans font-semibold text-[26px] md:[32px]">
            opps! page not found
          </h1>
          <button
            onClick={() => Router.push("/")}
            className=" bg-primary mt-5 text-white px-10 py-3 rounded-xl text-[16px] font-semibold hover:bg-bghover transition-all duration-500">
            Go Home
          </button>
        </div>
      </>
    );
  }

  return (
    <section
      id="home"
      className={`${
        background ? `bg-[${background}] ` : "bg-[#E9F6FF]"
      } relative flex w-full min-h-screen pt-16 md:pt-10 `}>
      <div className="2xl:px-[146px]  justify-center items-start xl:px-36 lg:px-32 md:px-22 sm:px-16 px-6 w-full flex ">
        <div className="md:w-[600px] w-full h-full items-center justify-between flex flex-col">
          <div>
            {uploadedImage ? (
              <div className="flex items-center justify-center">
                <Image
                  draggable="false"
                  src={uploadedImage}
                  width={125}
                  height={125}
                  alt="URL shortener for businesses"
                  className="rounded-full"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Image
                  draggable="false"
                  src="/short_logo.png"
                  width={100}
                  height={100}
                  alt="URL shortener for businesses"
                  className="rounded-full"
                />
              </div>
            )}

            <div className="flex w-full md:min-w-[600px] min-w-[250px] justify-center md:px-5 pt-5 flex-col items-center gap-3">
              <h1 className="text-black font-sans font-semibold md:text-[20px] text-[16px] flex text-center">
                {heading}
              </h1>
              <h1 className="text-black font-sans font-medium md:text-[16px] text-[14px] flex text-center w-full">
                {subHeading}
              </h1>
              <div className="w-full flex flex-col justify-center items-center my-5 gap-3 md:px-16">
                {platformLinks.map((selectedLink, index) => (
                  <div
                    href={selectedLink.link}
                    target="_blank"
                    key={index}
                    className={`w-full flex flex-row items-center bg-transparent justify-between px-5 rounded-[10px] shadow-3xl hover:-translate-y-0.5 transition-all duration-500 delay-75 ease-in-out`}>
                    <a href={selectedLink.link} target="_blank" className="w-[10%]">
                      {renderSocialIcon(selectedLink.title)}
                    </a>
                    <a
                      href={
                        selectedLink.title === "Email"
                          ? `mailto:${selectedLink.link}`
                          : selectedLink.link
                      }
                      target="_blank"
                      className=" text-black  font-sans font-medium text-[16px] bg-transparent py-4 outline-none w-[80%] justify-center flex">
                      {selectedLink.title}
                    </a>
                    <button
                      onClick={() => {
                        handleShare(selectedLink.link);
                      }}
                      className="hover:scale-125 transition-all duration-500 delay-75 z-50 w-[10%]">
                      {<PiDotsThreeBold color="#5A5A5A" size={30} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex w-full items-end justify-center pb-10">
            <div className="flex flex-col justify-center items-center">
              <h1 className="font-sans font-semibold text-[16px] text-primary">
                Powered by -
              </h1>
              <Image
                draggable="false"
                src="/Trimz_Logo.png"
                width={150}
                height={150}
                alt="Shorten links"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
