import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import Image from "next/image";
import {toast} from "react-toastify";
import {Modal} from "../../components/LoginModels";
import UsernameInput from "../../components/trimzlink/UsernameInput";
import ErrorMessage from "../../components/trimzlink/ErrorMessage";
import LoadingButton from "../../components/trimzlink/LoadingButton";

const Hero = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);

  useEffect(() => {
    if (name.length > 2) {
      const timeOut = setTimeout(() => {
        fetchLinkTree();
      }, 1000);
      return () => {
        clearTimeout(timeOut);
      };
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

      const token = localStorage.getItem("token");

      if (token) {
        headers.token = token;
      }

      const response = await fetch(`/api/trimzlink/?trimzLink=${name}`, {
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
      console.error("Error generating trimzlink:", error);
      toast.error("Error generating trimzlink");
    }
  };

  const handleContinue = async () => {
    setIsLoading(true);

    try {
      let headers = {
        "Content-Type": "application/json",
      };

      const token = localStorage.getItem("token");

      if (token) {
        headers.token = token;
      } else {
        setIsOpenLogin(true);
        return;
      }

      const response = await fetch("/api/trimzlink", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          trimzLink: name,
        }),
      });

      const data = await response.json();

      if (data.success) {
        await router.push({
          pathname: "/appearance",
          query: {heading: name},
        });

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error generating trimzlink:", error);
      toast.error("Error generating trimzlink");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="home"
      className="relative flex items-center pt-16 md:pt-20 justify-center w-full min-h-screen bg-gradient-to-b from-[#E9F6FF] to-[#e2deff] bg-fixed select-none">
      <div className="2xl:px-[146px] xl:px-36 lg:px-32 md:px-22 sm:px-16 px-6 flex-col-reverse xl:flex-row w-full flex items-center max-w-screen-2xl">
        <div className="w-full flex xl:flex-row flex-col-reverse  justify-between">
          <div className="w-full flex flex-col xl:mt-10 xl:mb-0 mb-10">
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

            <UsernameInput
              value={name}
              onChange={(e) => {
                const value = e.target.value;
                if (/\s/.test(value)) {
                  setError("Spaces are not allowed in usernames");
                  setIsAvailable(false);
                } else if (value.length <= 30) {
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
              isAvailable={isAvailable}
              isLoading={isLoading}
              handleContinue={handleContinue}
            />

            <ErrorMessage error={error} isAvailable={isAvailable} />

            <LoadingButton
              disabled={!isAvailable}
              isLoading={isLoading}
              handleContinue={handleContinue}
            />
          </div>
          <div className="w-full flex items-end xl:justify-end justify-center ">
            <Image
              draggable="false"
              src="/linktree.svg"
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </div>
        </div>
        <Modal isOpen={isOpenLogin} setIsOpen={setIsOpenLogin} />
      </div>
    </section>
  );
};

export default Hero;
