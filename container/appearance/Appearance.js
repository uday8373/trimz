import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import UploadModal from "../../components/UploadModal";
import {useRouter} from "next/router";
import LinkModels from "../../components/LinkModels";
import {FiInstagram} from "react-icons/fi";
import {TfiEmail} from "react-icons/tfi";
import {BsThreads} from "react-icons/bs";
import {FaSquareFacebook} from "react-icons/fa6";
import Header from "../../components/appearance/Header";
import Profile from "../../components/appearance/Profile";
import Background from "../../components/appearance/Background";
import Sidebar from "../../components/appearance/Sidebar";

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

export default function Appearance() {
  const router = useRouter();
  const [uploadModal, setUploadModal] = useState(false);
  const [linkModal, setLinkModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [trimzLink, setTrimzLink] = useState("");
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [platformLinks, setPlatformLinks] = useState([]);
  const [background, setBackground] = useState("#E9F6FF");
  const [baseUrl, setBaseUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

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
    console.log("platformLinks---------->", platformLinks);
  }, [platformLinks]);

  useEffect(() => {
    const fetchUrl = window?.location.href;
    const modifiedUrl = fetchUrl.split("appearance")[0];
    setBaseUrl(modifiedUrl);
    const {heading} = router.query;
    if (heading) {
      setHeading(heading);
      setTrimzLink(heading);
    }
    fetchLinkTree();
  }, [router.query]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(`${baseUrl}profile/${heading}`)
      .then(() => {
        setCopied(true);
        toast.success("Copy Successfully");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
  };

  const saveChanges = async () => {
    setLoading(true);
    try {
      let headers = {
        "Content-Type": "application/json",
      };

      const token = localStorage.getItem("token");

      if (token) {
        headers.token = token;
      }

      const response = await fetch(`/api/trimzlink/?trimzLink=${trimzLink}`, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify({
          name: heading,
          about: subHeading,
          backgroundColor: background,
          image: uploadedImage,
          socialLinks: platformLinks,
        }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Save Changes Successfully");
        fetchLinkTree();
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLinkTree = async () => {
    try {
      let headers = {
        "Content-Type": "application/json",
      };

      const token = localStorage.getItem("token");

      if (token) {
        headers.token = token;
      }
      const {heading} = router.query;

      const response = await fetch(`/api/getlinks/?trimzLink=${heading}`, {
        method: "GET",
        headers: headers,
      });

      const data = await response.json();

      if (data.success) {
        setUploadedImage(data.user.image);
        setHeading(data.user.name);
        setSubHeading(data.user.about);
        setBackground(data.user.backgroundColor);
        setPlatformLinks(data.user.socialLinks);
        console.log("platformLink", data.user.socialLinks);

        console.log(data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error generating trimzlink:", error);
      toast.error("Error generating trimzlink");
    }
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
    <section
      id="home"
      className="relative flex items-center  justify-center w-full min-h-screen bg-gradient-to-b from-[#E9F6FF] to-[#c2e9fb] bg-fixed ">
      <div className="2xl:px-[146px] xl:px-36 lg:px-32 md:px-22 sm:px-16 px-6 h-full flex-col-reverse xl:flex-row w-full flex items-center max-w-screen-2xl">
        <div className="flex w-full justify-between h-full">
          <div className="w-full flex xl:w-[70%] bg-transparent xl:border-r-2 border-lightGray border-dotted">
            <div className="flex xl:py-14 py-5 flex-col w-full xl:pr-28">
              <h1 className="text-black font-sans text-[24px] font-semibold">
                TrimzLink
              </h1>
              <Header
                baseUrl={baseUrl}
                trimzLink={trimzLink}
                copyToClipboard={copyToClipboard}
                copied={copied}
                saveChanges={saveChanges}
                loading={loading}
              />
              <h1 className="text-black font-sans text-[24px] font-semibold ">Profile</h1>
              <Profile
                setLinkModal={setLinkModal}
                uploadedImage={uploadedImage}
                setUploadModal={setUploadModal}
                heading={heading}
                subHeading={subHeading}
                platformLinks={platformLinks}
                deletePlatformLink={deletePlatformLink}
                renderSocialIcon={renderSocialIcon}
                uploadModal={uploadModal}
                setUploadedImage={setUploadedImage}
                linkModal={linkModal}
                setHeading={setHeading}
                setSubHeading={setSubHeading}
              />
              <h1 className="text-black font-sans text-[24px] font-semibold mt-5">
                Background
              </h1>
              <Background setBackground={setBackground} background={background} />
            </div>
          </div>
          <Sidebar
            uploadedImage={uploadedImage}
            heading={heading}
            subHeading={subHeading}
            platformLinks={platformLinks}
            renderSocialIcon={renderSocialIcon}
            background={background}
          />
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
