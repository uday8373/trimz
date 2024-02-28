"use client";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import {MdCurrencyRupee} from "react-icons/md";
import {FaArrowUpLong} from "react-icons/fa6";

import {motion} from "framer-motion";
export default function Sales() {
  return (
    <section className="relative flex items-center justify-center w-full min-h-full bg-[#fbfaff] py-10">
      <div className="2xl:px-[146px] xl:px-36 lg:px-32 md:px-22 sm:px-16 px-6  flex-col-reverse xl:flex-row w-full flex items-center max-w-screen-2xl">
        <div className="flex flex-col items-center justify-center w-full h-full gap-8 pb-10 lg:flex-row">
          <div className="relative flex items-center justify-center w-full py-20 rounded-[15px] bg-[#e2deff] lg:w-1/2">
            <Image
              src="/analytics.jpg"
              width={600}
              height={600}
              className="md:w-[400px] lg:w-[300px] px-8 md:px-0 w-full h-auto rounded-[10px]"
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
              className="absolute px-4 top-10 right-2 md:right-24 lg:right-2 xl:right-10 shadow-2xl rounded-[10px] py-2 bg-white
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
                <p className="text-[10px] font-sans text-gray "> Compared to last year</p>
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
              className="absolute px-4  bottom-8 right-2 md:right-24  lg:right-2  xl:right-20 shadow-2xl rounded-[10px] py-2 bg-white">
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
              className="absolute   bottom-14  left-2 md:left-8 lg:left-2 xl:left-8 flex items-center gap-2 px-4 py-2 bg-white shadow-2xl rounded-[10px] ">
              <Image src="profile.svg" width={0} height={0} className="w-10" />
              <p>Mithun Gorai</p>
            </motion.div>
          </div>
          <div className="flex flex-col justify-start w-full h-full gap-4 lg:w-1/2 ">
            <div className="flex ">
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
                  <Image src="/analytics.svg" width={0} height={0} className="w-5 h-5" />
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
  );
}
