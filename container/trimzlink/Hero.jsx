import React from "react";
import {useState, useEffect} from "react";
import Image from "next/image";
import {motion} from "framer-motion";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

export default function Hero() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (name.length > 2) {
      fetchLinkTree();
    } else if (name.length > 1) {
      setIsAvailable(false);
      setError("Usernames must be 3 characters or longer");
    }
  }, [name]);

  const fetchLinkTree = async () => {
    try {
      let headers = {
        "Content-Type": "application/json",
      };

      const token = await localStorage.getItem("token");

      if (token) {
        headers.token = token;
      }

      const response = await fetch(`/api/trimzlink/?name=${name}`, {
        method: "GET",
        headers: headers,
      });

      const data = await response.json();

      if (data.success) {
        setIsAvailable(true);
        setError(data.message);
      } else {
        setIsAvailable(false);
        setError(data.message);
      }
    } catch (error) {
      console.error("Error generating link tree:", error);
      toast.error("Error generating link tree");
    }
  };

  const handleContinue = () => {
    router.push({
      pathname: "/appearance",
      query: {heading: name},
    });
  };

  return (
    <section
      id="home"
      className="relative flex items-center pt-16 md:pt-20 justify-center w-full min-h-screen  bg-[#edeaff] select-none">
      <div className="2xl:px-[146px] xl:px-36 lg:px-32 md:px-22 sm:px-16 px-6 flex-col-reverse xl:flex-row w-full flex items-center max-w-screen-2xl">
        <div className="w-full flex xl:flex-row flex-col-reverse  justify-between">
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
            className="w-full flex flex-col xl:mt-10">
            <div className="flex">
              <div className="font-sans font-bold text-[12px] text-purple-500 bg-purple-500 bg-opacity-15 rounded-3xl py-2 px-5 text-left">
                Create your trimzlink
              </div>
            </div>
            <div className="font-sans font-bold text-[28px] md:text-[48px] text-black pt-5 leading-[36px] md:leading-[54px]">
              Create and customize your Trimzlink in minutes
            </div>
            <div className="font-sans font-medium text-[14px] lg:text-[18px] text-gray pt-5">
              Connect your TikTok, Instagram, Twitter, website, store, videos, music,
              podcast, events and more. It all comes together in a link in bio landing
              page designed to convert.
            </div>

            <div className="flex w-full mt-6 xl:mb-0 mb-6 items-center bg-white pl-8 pr-3 rounded-full justify-between">
              <div className="flex md:py-5 py-4">
                <label
                  htmlFor="url"
                  className="md:text-[18px] text-[14px] text-[#637887] font-sans font-medium ">
                  trimz.me/
                </label>
                <input
                  id="url"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 30) {
                      setName(value);
                      if (value.length > 2) {
                        setError("");
                      } else {
                        setIsAvailable(false);
                      }
                    } else {
                      setIsAvailable(false);
                      setError("Usernames cannot be longer than 30 characters");
                    }
                  }}
                  placeholder="username"
                  className=" w-full placeholder-[#637887] font-sans font-medium md:text-[18px] text-[14px] relative focus:outline-none"
                  required
                />
              </div>
              <button
                disabled={!isAvailable}
                onClick={handleContinue}
                className="bg-primary disabled:bg-[#E0E2D9] disabled:text-lightGray hidden md:flex w-36 justify-center items-center text-white font-sans font-semibold text-[16px] py-3 rounded-[100px] hover:bg-bghover transition-all duration-500">
                Continue
              </button>
            </div>
            <div className="w-full flex mt-2 pl-8">
              <h1
                className={`md:text-[16px] text-[14px] font-sans font-medium ${
                  isAvailable ? "text-green-600" : "text-red-500"
                }`}>
                {error}
              </h1>
            </div>

            <button
              disabled={!isAvailable}
              onClick={handleContinue}
              className="w-full md:hidden flex disabled:bg-[#E0E2D9] disabled:text-lightGray bg-primary justify-center items-center mb-6 text-white h-14 rounded-[100px] text-[18px] font-semibold hover:bg-bghover transition-all duration-500">
              Continue
            </button>
          </motion.div>
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
            className="w-full flex items-end xl:justify-end justify-center ">
            <Image
              draggable="false"
              src="/linktree.svg"
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
