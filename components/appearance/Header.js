// Header.js
import React, {useState, useEffect} from "react";
import {ThreeDots} from "react-loader-spinner";
import {LuCopy, LuCopyCheck} from "react-icons/lu";

const Header = ({baseUrl, trimzLink, copyToClipboard, copied, saveChanges, loading}) => {
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsHeaderFixed(true);
      } else {
        setIsHeaderFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`bg-white w-full flex flex-col my-5 rounded-[20px] xl:px-10 xl:py-5 px-5 py-5 ${
        isHeaderFixed
          ? "sticky top-2 left-0 z-50 shadow-2xl border-2 border-primary border-dotted"
          : ""
      }`}>
      <div
        className={`w-full flex gap-5 md:flex-row flex-col justify-between items-center`}>
        <div className="flex gap-2 md:text-[16px] text-[12px]">
          {baseUrl}profile/{trimzLink}
          <button
            onClick={copyToClipboard}
            className="flex items-center ml-1 font-bold text-primary hover:scale-110 focus:outline-none transition-all duration-500 delay-75">
            {copied ? <LuCopyCheck size={25} /> : <LuCopy size={25} />}
          </button>
        </div>
        <button
          onClick={saveChanges}
          className="w-36 flex justify-center items-center py-2 bg-primary  md:text-[16px] text-[14px] font-sans text-white font-semibold rounded-[10px] hover:bg-bghover transition-all duration-500 delay-75">
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
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
