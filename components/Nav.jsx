"use client";
import React, {useEffect, useState} from "react";
import {navLinks} from "../constants";
import {AnimatePresence, delay, motion} from "framer-motion";
import {Link, Link as ScrollLink} from "react-scroll";
import {RxCross2} from "react-icons/rx";
import {CgMenuRightAlt} from "react-icons/cg";
import Image from "next/image";
import {menuSilde} from "../constants";
import {useRouter} from "next/navigation";
import {Modal} from "./LoginModels";

const Nav = () => {
  const router = useRouter();
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleNavLinkClick = (id) => {
    localStorage.setItem("active", id);
    setActive(id);
  };

  useEffect(() => {
    const storedActive = localStorage.getItem("active");
    if (storedActive) {
      setActive(storedActive);
    }
    return () => {
      localStorage.removeItem("active");
    };
  }, []);

  const handleMobileNavLinkClick = () => {
    setToggle(!toggle);
    handleNavLinkClick("");
    setIsOpen(!isOpen);
  };
  return (
    <nav
      className={` w-full border-b-2 border-primary border-opacity-20 flex items-center justify-center 2xl:border-b-4 bg-bghero fixed py-2 top-0 z-[999] md:py-4 `}>
      <div
        className={`2xl:px-[146px] xl:px-36 lg:px-32 md:px-22 sm:px-16 px-6  w-full flex justify-between  max-w-screen-2xl items-center`}>
        <Link
          href="/"
          to="/"
          className="flex items-center"
          onClick={() => {
            setActive("");
            router.push("/");
            window.scrollTo(0, 0);
          }}>
          <Image
            src="/Trimz_Logo.png"
            width={1024}
            height={1024}
            alt="logo"
            className="sm:w-[160px]  sm:h-auto w-[110px] object-contain"
          />
        </Link>
        <div className="flex-row hidden gap-4 list-none lg:gap-6 xl:gap-10 md:flex">
          {navLinks.map((nav, index) => {
            return (
              <ScrollLink
                key={index}
                className={`${active === nav.id ? "text-primary" : "text-heading"}
               hover:text-primary text-[16px] lg:text-[18px] px-4 py-4 font-medium font-roboto cursor-pointer  `}
                to={nav.id}
                spy={true}
                smooth={true}
                offset={-90}
                duration={300}
                onClick={() => {
                  handleMobileNavLinkClick(nav.id);
                }}>
                {nav.title}
              </ScrollLink>
            );
          })}
          {/* <ScrollLink
            className="pt-2 leading-loose"
            to="sign"
            spy={true}
            offset={-90}
            smooth={true}
            duration={300}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative flex h-[44px] rounded-[100px] w-32 items-center justify-center overflow-hidden bg-gray-800 text-white transition-all before:absolute before:h-0 before:w-0 before:rounded-full bg-pink  before:bg-bghover before:duration-500 before:ease-out hover:shadow-bghover hover:before:h-56 hover:before:w-56">
              <span className="relative z-10 font-roboto text-[16px]">Sign In</span>
            </button>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
          </ScrollLink> */}
        </div>

        {/* mobile */}
        <div className="flex items-center justify-end flex-1 w-screen py-2 md:py-0 md:hidden">
          <div className=" md:hidden" onClick={handleMobileNavLinkClick}>
            {toggle ? (
              <CgMenuRightAlt color={"#4169E1"} size={30} />
            ) : (
              <CgMenuRightAlt color={"#4169E1"} size={30} />
            )}
          </div>

          <AnimatePresence mode="wait">
            {toggle && (
              <motion.div
                variants={menuSilde}
                animate="enter"
                exit="exit"
                initial="initial"
                className={`py-2 bg-background absolute top-0 left-0 w-screen h-screen z-10 menu `}>
                <div
                  className={`flex items-center  w-full px-6  pt-1 pb-6 justify-between border-b-2   border-watermark `}>
                  <img
                    src="https://res.cloudinary.com/dtwvobf3j/image/upload/v1706284707/geo-span-measure_cikupf.png"
                    alt="logo"
                    className={`sm:w-[85px]  sm:h-auto w-[120px]  object-contain `}
                  />
                  <div className="pt-4">
                    <RxCross2
                      color={"#4169E1"}
                      size={30}
                      onClick={() => setToggle(!toggle)}
                    />
                  </div>
                </div>
                <ul className="list-none flex flex-col px-6 gap-[0.5rem]  pt-10  items-start justify-center w-full">
                  {navLinks.map((nav, index) => {
                    return (
                      <motion.div
                        key={index}
                        initial={{x: 100, opacity: 0}}
                        animate={{
                          x: 0,
                          opacity: 1,
                          transition: {
                            duration: 0.8,
                            ease: [0.65, 0, 0.35, 1],
                            delay: 0.2 * index,
                          },
                        }}
                        exit={{
                          x: -100,
                          opacity: 0,
                          transition: {
                            duration: 0.6,
                            ease: [0.65, 0, 0.35, 1],
                            delay: 0.3 * index,
                          },
                        }}>
                        <ScrollLink
                          onClick={() => handleMobileNavLinkClick(nav.id)}
                          key={index}
                          className={`${
                            active === nav.title ? "text-heading" : "text-heading"
                          } hover:text-primary text-[24px] mt-5 font-medium font-roboto uppercase cursor-pointer w-full  flex`}
                          to={nav.id}
                          spy={true}
                          smooth={true}
                          offset={-70}
                          duration={300}>
                          {nav.title}
                        </ScrollLink>
                      </motion.div>
                    );
                  })}
                </ul>
                {/* <ScrollLink
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={300}>
                  <button
                    onClick={() => {
                      handleMobileNavLinkClick("#contact");
                    }}
                    className="relative my-8 mx-6 flex h-[50px] w-40 items-center justify-center overflow-hidden bg-gray-800 text-white transition-all before:absolute before:h-0 before:w-0 before:rounded-full bg-primary  before:bg-bghover before:duration-500 before:ease-out hover:shadow-bghover hover:before:h-56 hover:before:w-56">
                    <span className="relative z-10 font-roboto text-[20px]">Sign In</span>
                  </button>
                  <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
                </ScrollLink> */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
