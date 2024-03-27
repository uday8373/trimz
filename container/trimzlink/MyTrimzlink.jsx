import React, {useEffect, useState} from "react";
import moment from "moment";
import Popover from "react-popover";
import {MdOutlineQrCode, MdOutlineContentCopy} from "react-icons/md";
import {toast} from "react-toastify";
import {IoMdOpen} from "react-icons/io";
import {LuShare2} from "react-icons/lu";
import {BiEditAlt} from "react-icons/bi";
import {QrModalTrimzlink} from "../../components/QrModalTrimzlink";
import {useRouter} from "next/router";
import {AiOutlineLoading3Quarters} from "react-icons/ai";

export default function MyTrimzlink() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [popoverQr, setPopoverQr] = useState(-1);
  const [popoverCopy, setPopoverCopy] = useState(-1);
  const [popoverShare, setPopoverShare] = useState(-1);
  const [popoverRedirect, setPopoverRedirect] = useState(-1);
  const [popoverEdit, setPopoverEdit] = useState(-1);
  const [baseUrl, setBaseUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [loading, setLoading] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(-1);

  useEffect(() => {
    fetchData();
    const fetchUrl = window?.location.href;
    const modifiedUrl = fetchUrl.replace(/www\./, "");
    const perfectUrl = modifiedUrl.split("/trimzlink")[0];
    setBaseUrl(perfectUrl);
  }, []);

  const fetchData = async () => {
    try {
      let headers = {
        "Content-Type": "application/json",
      };

      const token = await localStorage.getItem("token");

      if (token) {
        headers.token = token;
      }
      const result = await fetch("/api/trimzlinkById", {
        method: "GET",
        headers: headers,
      });
      const response = await result.json();

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const copyToClipboard = (trimzLink) => {
    navigator.clipboard
      .writeText(`${baseUrl}/profile/${trimzLink}`)
      .then(() => {
        toast.success("Copy Successfully");
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
  };

  const toggleModal = (modalState, link) => {
    switch (modalState) {
      case "qrModal":
        setSelectedItem(link);
        setIsOpen(!isOpen);
        break;

      default:
        break;
    }
  };

  const handleShare = async (link) => {
    try {
      await navigator.share({url: `/profile/${link}`});
    } catch (error) {
      console.error("Error sharing URL:", error);
      toast.error("Error sharing URL");
    }
  };

  const handleUpdate = async (name, index) => {
    setLoading(true);
    setClickedIndex(index);

    await router.push({
      pathname: "/appearance",
      query: {heading: name},
    });
  };
  return (
    <section
      id="home"
      className="relative flex items-center py-10 justify-center w-full  bg-white select-none">
      <div className="2xl:px-[146px] xl:px-36 lg:px-32 md:px-22 sm:px-16 px-6 flex-col-reverse xl:flex-row w-full flex items-center max-w-screen-2xl">
        <div className="w-full flex flex-col items-center gap-10">
          <h1 className="text-black font-sans font-bold md:text-[36px] text-[28px] select-none">
            My Trimzlinks
          </h1>
          <div className="overflow-hidden w-full overflow-x-auto rounded-[10px]">
            <table className="min-w-full ">
              <thead className=" bg-pink text-left text-white">
                <tr>
                  <th scope="col" className="px-6 py-4 font-sans font-medium select-none">
                    Trimzlink
                  </th>

                  <th scope="col" className="px-6 py-4 font-sans font-medium select-none">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4 font-sans font-medium select-none">
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-sans font-medium select-none "></th>
                </tr>
              </thead>
              <tbody>
                {data.map((link, index) => (
                  <tr
                    key={index}
                    className="bg-primary border-y-[5px] border-white bg-opacity-10">
                    <td className="whitespace-nowrap px-6 py-3 font-medium">
                      {baseUrl}/profile/{link.trimzLink}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 font-medium">
                      {link.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 font-medium">
                      {moment(link.updated_at).format("MMM D, YYYY")}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 font-medium flex flex-row items-center gap-5 justify-end">
                      <div>
                        <Popover
                          isOpen={popoverRedirect === index}
                          body={
                            <div className="px-4 py-2 text-white rounded-md shadow-xl popover-content bg-bghover">
                              Click to redirect
                            </div>
                          }>
                          <a
                            href={`${baseUrl}/profile/${link.trimzLink}`}
                            target="_blank">
                            <button
                              onMouseEnter={() => setPopoverRedirect(index)}
                              onMouseLeave={() => setPopoverRedirect(-1)}
                              className="bg-pink px-3 py-3 rounded-full bg-opacity-10  hover:bg-white  transition-all duration-500 delay-75 ease-in-out">
                              <IoMdOpen size={20} color="#E93266" />
                            </button>
                          </a>
                        </Popover>
                      </div>
                      <div>
                        <Popover
                          isOpen={popoverCopy === index}
                          body={
                            <div className="px-4 py-2 text-white rounded-t-md shadow-xl popover-content bg-bghover">
                              Copy to clipboard
                            </div>
                          }>
                          <button
                            onMouseEnter={() => setPopoverCopy(index)}
                            onMouseLeave={() => setPopoverCopy(-1)}
                            onClick={() => {
                              copyToClipboard(link.trimzLink);
                            }}
                            className="bg-pink px-3 py-3 rounded-full bg-opacity-10  hover:bg-white  transition-all duration-500 delay-75 ease-in-out">
                            <MdOutlineContentCopy size={20} color="#E93266" />
                          </button>
                        </Popover>
                      </div>
                      <div>
                        <Popover
                          isOpen={popoverQr === index}
                          body={
                            <div className="px-4 py-2 text-white rounded-md shadow-xl popover-content bg-bghover">
                              Generate QR Code
                            </div>
                          }>
                          <button
                            onMouseEnter={() => setPopoverQr(index)}
                            onMouseLeave={() => setPopoverQr(-1)}
                            onClick={() => toggleModal("qrModal", link)}
                            className="bg-pink px-3 py-3 rounded-full bg-opacity-10  hover:bg-white  transition-all duration-500 delay-75 ease-in-out">
                            <MdOutlineQrCode size={20} color="#E93266" />
                          </button>
                        </Popover>
                      </div>
                      <div>
                        <Popover
                          isOpen={popoverShare === index}
                          body={
                            <div className="px-4 py-2 text-white rounded-md shadow-xl popover-content bg-bghover">
                              Click to share it
                            </div>
                          }>
                          <button
                            onMouseEnter={() => setPopoverShare(index)}
                            onMouseLeave={() => setPopoverShare(-1)}
                            onClick={() => {
                              handleShare(link.trimzLink);
                            }}
                            className="bg-pink px-3 py-3 rounded-full bg-opacity-10  hover:bg-white  transition-all duration-500 delay-75 ease-in-out">
                            <LuShare2 size={20} color="#E93266" />
                          </button>
                        </Popover>
                      </div>
                      <div>
                        <Popover
                          isOpen={popoverEdit === index}
                          body={
                            <div className="px-4 py-2 text-white rounded-md shadow-xl popover-content bg-bghover">
                              Click to edit your trimzlink
                            </div>
                          }>
                          <button
                            onMouseEnter={() => setPopoverEdit(index)}
                            onMouseLeave={() => setPopoverEdit(-1)}
                            onClick={() => {
                              handleUpdate(link.trimzLink, index);
                            }}
                            className={`bg-pink px-3 py-3 rounded-full bg-opacity-10 hover:bg-white transition-all duration-500 delay-75 ease-in-out ${
                              clickedIndex === index ? "animate-spin" : ""
                            }`}>
                            {loading && clickedIndex === index ? (
                              <AiOutlineLoading3Quarters size={20} color="#E93266" />
                            ) : (
                              <BiEditAlt size={20} color="#E93266" />
                            )}
                          </button>
                        </Popover>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <QrModalTrimzlink
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          BaseUrl={baseUrl}
          selectedItem={selectedItem}
        />
      </div>
    </section>
  );
}
