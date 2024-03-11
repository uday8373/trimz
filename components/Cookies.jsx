import React, {useEffect, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";

export default function Cookies() {
  const [acceptCookie, setAcceptCookie] = useState(false);

  const getCookies = async () => {
    const cookies = await localStorage.getItem("AcceptCookies");
    if (cookies) {
      setAcceptCookie(true);
    } else {
      setAcceptCookie(false);
    }
  };

  useEffect(() => {
    getCookies();
  }, []);

  const handleOk = () => {
    localStorage.setItem("AcceptCookies", true);
    setAcceptCookie(true);
  };

  return (
    <div>
      {!acceptCookie && (
        <section
          id="feature"
          className="relative flex items-center justify-center w-full min-h-full py-10">
          <div className="2xl:px-[146px] xl:px-36 lg:px-32 md:px-22 sm:px-16 px-6 flex-col fixed bottom-5 z-[999] w-full flex items-center max-w-screen-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{y: 100, opacity: 0}}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.8,
                    ease: [0.65, 0, 0.35, 1],
                    delay: 0.2,
                  },
                }}
                exit={{
                  y: -100,
                  opacity: 0,
                  transition: {
                    duration: 0.6,
                    ease: [0.65, 0, 0.35, 1],
                    delay: 0.3,
                  },
                }}
                className="flex md:flex-row flex-col items-center justify-center gap-5 px-5 py-5 bg-white shadow-3xl rounded-[10px]">
                <h1 className="flex text-left text-black font-sans md:font-semibold xl:text-[16px] md:text-[14px] text-[16px]">
                  Our website uses cookies & ip address to improve your experience and
                  provide some features.
                  <br className="hidden xl:flex" />
                  By continuing to use our site, you accept our use of cookies & ip
                  address.
                </h1>
                <button
                  onClick={handleOk}
                  className="flex w-full md:w-auto justify-center px-8 py-3 rounded-[10px] shadow-3xl bg-pink text-white text-[16px] font-sans font-semibold hover:bg-bghover transition-all duration-500 delay-75">
                  OK
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      )}
    </div>
  );
}
