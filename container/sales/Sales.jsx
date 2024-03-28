"use client";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import {FaArrowUpLong} from "react-icons/fa6";
import {BiRupee} from "react-icons/bi";
import {GiClick} from "react-icons/gi";
import {FaLink} from "react-icons/fa6";
import {Link as ScrollLink} from "react-scroll";
import {RiLockPasswordLine} from "react-icons/ri";
import {MdOutlineQrCode} from "react-icons/md";
import {MdOutlinePrivacyTip, MdOutlineDashboard} from "react-icons/md";

import {motion} from "framer-motion";
export default function Sales() {
  return (
    <section
      id="feature"
      className="relative flex items-center overflow-hidden justify-center w-full min-h-full bg-[#fbfaff] py-10">
      <div className="2xl:px-[146px] xl:px-36 lg:px-32 md:px-22 sm:px-16 px-6 flex-col w-full flex items-center max-w-screen-2xl">
        <div className="w-full flex flex-col-reverse  xl:flex-row items-center">
          <div className="flex flex-col items-center justify-center w-full h-full gap-8 pb-10 lg:flex-row">
            <div className="relative flex items-center justify-center w-full py-20 rounded-[15px] bg-[#e2deff] lg:w-1/2 select-none">
              <motion.div
                initial={{x: -10}}
                animate={{y: 10}}
                transition={{
                  type: "smooth",
                  repeatType: "mirror",
                  duration: 2,
                  delay: 0.2,
                  repeat: Infinity,
                }}>
                <Image
                  draggable="false"
                  src="/sales.jpg"
                  width={600}
                  height={600}
                  className="md:w-[400px] lg:w-[300px] px-8 md:px-0 w-full h-auto rounded-[10px]"
                  alt="Secure URL shortener"
                />
              </motion.div>
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
                <p className="font-sans text-secondary text-[14px]">Sales</p>
                <div className="flex flex-col w-full">
                  <div className="flex flex-row w-full gap-2">
                    <p className="flex items-center font-sans font-semibold">
                      <BiRupee size={20} />
                      27549
                    </p>
                    <span className="flex items-center font-sans text-sm text-green-500 font-medium">
                      +2.5
                      <FaArrowUpLong size={12} />
                    </span>
                  </div>
                  <p className="text-[10px] font-sans text-gray ">
                    {" "}
                    Compared to last year
                  </p>
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
                <p className="font-sans text-secondary text-[14px]">Daily Clicks</p>
                <div className="flex flex-row w-full gap-2">
                  <GiClick size={25} color="#e9aeff" />
                  <p className="flex items-center text-lg font-semibold">850 +</p>
                </div>
              </motion.div>
              <motion.div
                initial={{y: -15}}
                animate={{y: 15}}
                transition={{
                  type: "smooth",
                  repeatType: "mirror",
                  duration: 2,
                  delay: 0.7,
                  repeat: Infinity,
                }}
                className="absolute   bottom-14  left-2 md:left-8 lg:left-2 xl:left-8 flex items-center gap-2 px-4 py-2 bg-white shadow-2xl rounded-[10px] ">
                <Image
                  draggable="false"
                  src="/user.png"
                  width={500}
                  height={500}
                  className="w-10"
                  alt="Secure URL shortener"
                />
                <div className="w-full text-[14px]">
                  <p>Dan Cooper</p>
                  <p className="w-full bg-[#e2deff] h-1 rounded-full mt-1"></p>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{x: 50, opacity: 0}}
              whileInView={{
                x: 0,
                opacity: 1,
                transition: {
                  duration: 0.8,
                  ease: [0.65, 0, 0.35, 1],
                  delay: 0.1,
                },
              }}
              viewport={{once: true}}
              className="flex flex-col justify-start w-full h-full gap-4 lg:w-1/2 select-none">
              <div className="flex">
                <div className="font-sans font-bold text-[12px] text-pink bg-pink bg-opacity-15 rounded-3xl py-2 px-5 text-left">
                  Sales & Marketing
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="font-sans font-bold text-[32px] md:text-[38px] text-black">
                  Perfect for sales & marketing
                </div>
                <div>
                  Understanding your users and customers will help you increase your
                  conversion. Our system allows you to track everything. Whether it is the
                  amount of clicks, the country or the referrer, the data is there for you
                  to analyze it.
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Image
                      draggable="false"
                      src="/thunderbolt.svg"
                      width={500}
                      height={500}
                      className="w-5 h-5"
                      alt="Secure URL shortener"
                    />
                    <p>Redirection Tools</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Image
                      draggable="false"
                      src="/analytics.svg"
                      width={500}
                      height={500}
                      className="w-5 h-5"
                      alt="Secure URL shortener"
                    />
                    <p>Powerful Statistics</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Image
                      draggable="false"
                      src="/profile.svg"
                      width={500}
                      height={500}
                      className="w-5 h-5"
                      alt="Secure URL shortener"
                    />
                    <p>Beautiful Profiles</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="w-full flex flex-col-reverse  xl:flex-row items-center mt-5">
          <div className="flex flex-col items-center justify-center w-full h-full gap-8 pb-10 lg:flex-row-reverse select-none">
            <div className="relative flex items-center justify-center w-full py-20 rounded-[15px] bg-[#B0DCFF] lg:w-1/2">
              <motion.div
                initial={{x: -10}}
                animate={{y: 10}}
                transition={{
                  type: "smooth",
                  repeatType: "mirror",
                  duration: 2,
                  delay: 0.2,
                  repeat: Infinity,
                }}>
                <Image
                  draggable="false"
                  src="/privacy_control.jpg"
                  width={600}
                  height={600}
                  className="md:w-[400px] lg:w-[300px] px-8 md:px-0 w-full h-auto rounded-[10px]"
                  alt="Secure URL shortener"
                />
              </motion.div>
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
                <div className="flex w-full justify-center items-center gap-2">
                  <div className="px-2 py-2 bg-[#B0DCFF] bg-opacity-45 rounded-full">
                    <MdOutlinePrivacyTip size={25} color="#2161DF" />
                  </div>
                  <div>
                    <p className="font-sans text-secondary text-[14px]">
                      Privacy Control
                    </p>
                    <div className="flex w-[50%] h-1 bg-[#B0DCFF] rounded-full mt-1"></div>
                    <div className="flex w-full h-1 bg-[#B0DCFF] rounded-full mt-1"></div>
                  </div>
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
                className="absolute px-4  bottom-14 right-2 md:right-24  lg:right-2  xl:right-20 shadow-2xl rounded-[10px] py-2 bg-white">
                <div className="flex flex-row w-full gap-2 justify-center items-center">
                  <div className="px-2 py-2 bg-[#B0DCFF] bg-opacity-45 rounded-full">
                    <FaLink size={20} color="#2161DF" />
                  </div>
                  <p className="font-sans text-secondary text-[14px]">trimz.me/MzHk</p>
                </div>
              </motion.div>
              <motion.div
                initial={{y: -15}}
                animate={{y: 15}}
                transition={{
                  type: "smooth",
                  repeatType: "mirror",
                  duration: 2,
                  delay: 0.7,
                  repeat: Infinity,
                }}
                className="absolute   bottom-36  left-2 md:left-8 lg:left-2 xl:left-8 flex items-center gap-2 px-4 py-2 bg-white shadow-2xl rounded-[10px] ">
                <div className="w-full flex justify-center items-center">
                  <Image
                    draggable="false"
                    src="/user1.png"
                    width={500}
                    height={500}
                    className="w-10 mr-[-10%] "
                    alt="Link tracking"
                  />
                  <Image
                    draggable="false"
                    src="/user2.png"
                    width={500}
                    height={500}
                    className="w-10 mr-[-10%] "
                    alt="Link tracking"
                  />
                  <div className="w-10 h-10 bg-white  rounded-full flex justify-center items-center shadow-3xl">
                    <RiLockPasswordLine size={20} color="#2161DF" />
                  </div>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{x: -50, opacity: 0}}
              whileInView={{
                x: 0,
                opacity: 1,
                transition: {
                  duration: 0.8,
                  ease: [0.65, 0, 0.35, 1],
                  delay: 0.1,
                },
              }}
              viewport={{once: true}}
              className="flex flex-col justify-start w-full h-full gap-4 lg:w-1/2 ">
              <div className="flex ">
                <h1 className="font-sans font-bold text-[12px] text-pink bg-pink bg-opacity-15 rounded-3xl py-2 px-5 text-left">
                  Privacy Control
                </h1>
              </div>
              <div className="flex flex-col gap-5">
                <div className="font-sans font-bold text-[32px] md:text-[38px] text-black">
                  Powerful tools that work
                </div>
                <div>
                  Our product lets yoyr target your users to better understand their
                  behaviour and provide them a better overall experience through smart
                  re-targeting. We provide you many powerful tools to reach them better.
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <FaLink size={20} color="#2161DF" />
                    <p>Link Management</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <MdOutlinePrivacyTip size={20} color="#2161DF" />
                    <p>Privacy Control</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <MdOutlineDashboard size={20} color="#2161DF" />
                    <p>Powerful Dashboard</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="w-full flex flex-col-reverse  xl:flex-row items-center mt-5">
          <div className="flex flex-col items-center justify-center w-full h-full gap-8 pb-10 lg:flex-row select-none">
            <div className="relative flex items-center justify-center w-full py-20 rounded-[15px] bg-[#FFE4E3] lg:w-1/2">
              <motion.div
                initial={{x: -10}}
                animate={{y: 10}}
                transition={{
                  type: "smooth",
                  repeatType: "mirror",
                  duration: 2,
                  delay: 0.2,
                  repeat: Infinity,
                }}>
                <Image
                  draggable="false"
                  src="/qr_code.jpg"
                  width={600}
                  height={600}
                  className="md:w-[400px] lg:w-[300px] px-8 md:px-0 w-full h-auto rounded-[10px]"
                  alt="Link tracking"
                />
              </motion.div>
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
                <p className="font-sans text-secondary text-[14px]">
                  AVG Engagement Rate
                </p>
                <div className="flex flex-col w-full">
                  <div className="flex flex-row w-full gap-2">
                    <p className="flex items-center font-sans font-semibold">91.8%</p>
                    <span className="flex items-center font-sans text-sm text-green-500 font-medium">
                      +8.64%
                      <FaArrowUpLong size={12} />
                    </span>
                  </div>
                  <p className="text-[10px] font-sans text-gray ">
                    {" "}
                    Compared to last year
                  </p>
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
                className="absolute px-3  bottom-10 right-2 md:right-24  lg:right-2  xl:right-24 rounded-full py-3 bg-pink border-4 border-white shadow-3xl">
                <div className="flex flex-row w-full gap-2">
                  <MdOutlineQrCode size={50} color="#fff" />
                </div>
              </motion.div>
              <motion.div
                initial={{y: -15}}
                animate={{y: 15}}
                transition={{
                  type: "smooth",
                  repeatType: "mirror",
                  duration: 2,
                  delay: 0.7,
                  repeat: Infinity,
                }}
                className="absolute  bottom-14  left-2 md:left-8 lg:left-2 xl:left-8 flex flex-col px-4 py-2 bg-white shadow-2xl rounded-[10px] ">
                <p className="font-sans text-secondary text-[14px]">AVG Reach</p>
                <div className="flex flex-col w-full">
                  <div className="flex flex-row w-full gap-2">
                    <p className="flex items-center font-sans font-semibold">926</p>
                    <span className="flex items-center font-sans text-sm text-green-500 font-medium">
                      +2.5%
                      <FaArrowUpLong size={12} />
                    </span>
                  </div>
                  <p className="text-[10px] font-sans text-gray ">
                    {" "}
                    Compared to last year
                  </p>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{x: 50, opacity: 0}}
              whileInView={{
                x: 0,
                opacity: 1,
                transition: {
                  duration: 0.8,
                  ease: [0.65, 0, 0.35, 1],
                  delay: 0.1,
                },
              }}
              viewport={{once: true}}
              className="flex flex-col justify-start w-full h-full gap-4 lg:w-1/2 ">
              <div className="flex ">
                <h1 className="font-sans font-bold text-[12px] text-pink bg-pink bg-opacity-15 rounded-3xl py-2 px-5 text-left">
                  QR Code
                </h1>
              </div>
              <div className="flex flex-col gap-5">
                <span className="font-sans font-bold text-[32px] md:text-[38px] text-black">
                  QR Codes
                </span>
                <div>
                  Easy to use, dynamic and customizable QR Codes for your marketing
                  campaigns. Analyze Statistics and optimize your marketing strategy and
                  increase engagement.
                </div>
                <div className="flex">
                  <ScrollLink
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                    to="/"
                    spy={true}
                    smooth={true}
                    offset={-90}
                    duration={300}
                    className="flex cursor-pointer flex-row mt-2 px-6 py-2 border-2 border-primary rounded-full text-primary font-sans font-semibold text-[16px] hover:bg-black hover:text-white hover:border-black transition-all duration-500 delay-75">
                    Get Started
                  </ScrollLink>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
