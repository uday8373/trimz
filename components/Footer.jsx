import React from "react";
import {RiInstagramFill} from "react-icons/ri";
import {FaFacebookSquare} from "react-icons/fa";
import {Link as ScrollLink} from "react-scroll";
import {motion} from "framer-motion";

export default function Footer() {
  return (
    <section
      id="home"
      className="relative flex items-center justify-center overflow-hidden w-full bg-[url('/map.jpg')] bg-contain select-none">
      <div className="2xl:px-[146px] xl:px-36 lg:px-32 md:px-22 sm:px-16 px-6 flex-col-reverse xl:flex-row w-full flex items-center max-w-screen-2xl">
        <div className="relative w-full flex flex-col  pt-20 pb-10">
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
            className="text-[18px] text-white font-sans text-left">
            Contact Us
          </motion.div>
          <motion.div
            initial={{x: -50, opacity: 0}}
            whileInView={{
              x: 0,
              opacity: 1,
              transition: {
                duration: 0.8,
                ease: [0.65, 0, 0.35, 1],
                delay: 0.2,
              },
            }}
            viewport={{once: true}}
            className=" md:text-[64px] select-text text-[32px]  font-sans font-semibold text-left bg-gradient-to-r from-pink via-primary to-pink inline-block text-transparent bg-clip-text">
            support@erex.in
          </motion.div>
          <div className="w-full flex flex-row justify-between items-center md:mb-10 mt-10 mb-3 gap-5">
            <motion.div
              initial={{x: -50, opacity: 0}}
              whileInView={{
                x: 0,
                opacity: 1,
                transition: {
                  duration: 0.8,
                  ease: [0.65, 0, 0.35, 1],
                  delay: 0.3,
                },
              }}
              viewport={{once: true}}
              className="md:text-[18px] text-[16px] text-white font-sans">
              Get latest update here
            </motion.div>
            <div className="w-[72%] bg-white h-[1.5px] xl:flex hidden"></div>
            <motion.div
              initial={{x: 50, opacity: 0}}
              whileInView={{
                x: 0,
                opacity: 1,
                transition: {
                  duration: 0.8,
                  ease: [0.65, 0, 0.35, 1],
                  delay: 0.3,
                },
              }}
              viewport={{once: true}}
              className=" gap-5 flex">
              <a
                href="https://www.instagram.com/erexstudio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank">
                <RiInstagramFill
                  size={32}
                  color="#fff"
                  className="hover:scale-125 transition-all duration-500 delay-75 ease-in-out"
                />
              </a>
              <a
                href="https://www.facebook.com/erexstudio/?show_switched_toast=0&show_invite_to_follow=0&show_switched_tooltip=0&show_podcast_settings=0&show_community_review_changes=0&show_community_rollback=0&show_follower_visibility_disclosure=0"
                target="_blank">
                <FaFacebookSquare
                  size={30}
                  color="#fff"
                  className="hover:scale-125 transition-all duration-500 delay-75 ease-in-out"
                />
              </a>
            </motion.div>
          </div>
          <div className="w-full bg-white h-[1.5px] xl:hidden flex"></div>
          <div className="w-full justify-between flex items-center md:mt-5 mt-10 md:flex-row flex-col gap-5">
            <h1 className="md:text-[16px] text-[14px] text-white font-sans">
              © 2024.{" "}
              <ScrollLink
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
                to="/"
                spy={true}
                smooth={true}
                offset={-90}
                duration={300}
                className="underline underline-offset-2 cursor-pointer">
                Trimz.me
              </ScrollLink>{" "}
              All Rights Reserved.
            </h1>
            <h1 className="md:text-[16px] text-[14px] text-white font-sans text-left">
              Developed by{" "}
              <a
                href="https://erex.in/"
                target="_blank"
                className="underline underline-offset-2">
                Erex Studio
              </a>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
