"use client";
import React, {useEffect, useState} from "react";
import {navLinks} from "../constants";
import {AnimatePresence, delay, motion} from "framer-motion";
import {Link as ScrollLink} from "react-scroll";
import {RxCross2} from "react-icons/rx";
import {CgMenuRightAlt} from "react-icons/cg";
import Image from "next/image";
import {menuSilde} from "../constants";
import {useRouter} from "next/navigation";
import {Modal} from "./LoginModels";
import {FiAtSign} from "react-icons/fi";
import {CgMail} from "react-icons/cg";
import {FiLogOut} from "react-icons/fi";
import {toast} from "react-toastify";
import Link from "next/link";

const Nav = () => {
  const router = useRouter();
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isToken, setIsToken] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleLoginSuccess = (event) => {
      if (event.data.type === "LOGIN_SUCCESS") {
        setIsToken(true);
      }
    };

    window.addEventListener("message", handleLoginSuccess);

    return () => {
      window.removeEventListener("message", handleLoginSuccess);
    };
  }, []);

  useEffect(() => {
    const storedActive = localStorage.getItem("active");
    const token = localStorage.getItem("token");

    if (storedActive) {
      setActive(storedActive);
    }
    if (token) {
      setIsToken(true);

      fetchUser();
    } else {
      setIsToken(false);
    }
    return () => {
      localStorage.removeItem("active");
    };
  }, []);

  const fetchUser = async () => {
    try {
      const token = await localStorage.getItem("token");
      const response = await fetch(`/api/signin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      const data = await response.json();
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleNavLinkClick = (id) => {
    localStorage.setItem("active", id);
    setActive(id);
    // router.push(id, {scroll: false});
  };

  const handleMobileNavLinkClick = (id) => {
    // router.push(id, {scroll: false});
    handleNavLinkClick(id);
    setToggle(!toggle);
  };

  const handleLogout = () => {
    if (confirm("Are you sure, you want to logout?")) {
      localStorage.removeItem("token");
      setIsToken(false);
      router.refresh();
    }
  };
  return (
    <>
      {isScrolled ? (
        <motion.nav
          initial={{y: -100, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          transition={{
            duration: 0.8,
            ease: [0.65, 0, 0.35, 1],
            delay: 0,
          }}
          className={`${
            isScrolled ? "bg-white shadow-md border-none" : "bg-transparent"
          } w-full select-none border-b-2 border-primary border-opacity-20 flex items-center justify-center 2xl:border-b-2 bg-bghero fixed py-2 top-0 z-[999] md:py-4 `}>
          <div
            className={`2xl:px-[146px] xl:px-36 lg:px-32 md:px-22 sm:px-16 px-6  w-full flex justify-between  max-w-screen-2xl items-center`}>
            <div className="flex items-center justify-start flex-1 w-screen py-2 xl:py-0 xl:hidden">
              <div
                className="flex flex-row gap-3 xl:hidden items-center"
                onClick={() => {
                  setToggle(!toggle);
                }}>
                {toggle ? (
                  <CgMenuRightAlt color={"#4169E1"} size={30} />
                ) : (
                  <CgMenuRightAlt color={"#4169E1"} size={30} className="rotate-180" />
                )}
                <Link
                  href="/"
                  to="/"
                  className="flex items-center "
                  onClick={() => {
                    setActive("");
                    router.push("/");
                    window.scrollTo(0, 0);
                  }}>
                  <img
                    src="/Trimz_Logo.png"
                    width={1024}
                    height={1024}
                    alt="logo"
                    className="sm:w-[160px]  sm:h-auto w-[110px] object-contain"
                  />
                </Link>
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
                        src="/Trimz_Logo.png"
                        alt="logo"
                        className={`sm:w-[85px]  sm:h-auto w-[120px]  object-contain pt-2`}
                      />
                      <div className="pt-2">
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/"
              to="/"
              className="xl:flex items-center hidden"
              onClick={() => {
                setActive("");
                router.push("/");
                window.scrollTo(0, 0);
              }}>
              <img
                src="/Trimz_Logo.png"
                width={1024}
                height={1024}
                alt="logo"
                className="sm:w-[160px]  sm:h-auto w-[110px] object-contain"
              />
            </Link>

            <div className="flex-row hidden gap-4 list-none lg:gap-6 xl:gap-10 xl:flex">
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
                      handleNavLinkClick(nav.id);
                    }}>
                    {nav.title}
                  </ScrollLink>
                );
              })}
              <div>
                {!isToken ? (
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative mt-2 flex h-[44px] rounded-[100px] w-32 items-center justify-center overflow-hidden bg-gray-800 text-white transition-all before:absolute before:h-0 before:w-0 before:rounded-full bg-pink  before:bg-bghover before:duration-500 before:ease-out hover:shadow-bghover hover:before:h-56 hover:before:w-56">
                    <span className="relative z-10 font-roboto text-[16px]">Sign In</span>
                  </button>
                ) : (
                  <div className="relative">
                    <button
                      onClick={handleProfileClick}
                      className="relative mt-2 rounded-full shadow-3xl">
                      {userData.image ? (
                        <img
                          width={1024}
                          height={1024}
                          src={userData.image}
                          alt="Profile"
                          className="w-[44px] rounded-full border-2 border-primary "
                        />
                      ) : (
                        <Image
                          width={1024}
                          height={1024}
                          src="/short_logo.png"
                          alt="Profile"
                          className="w-[44px] rounded-full border-2 border-primary "
                        />
                      )}
                    </button>
                    {showDropdown && (
                      <div className="absolute top-16 right-0 bg-bghero rounded-md shadow-3xl px-5 py-5">
                        <div className="flex items-center gap-3 py-2">
                          <FiAtSign size={20} /> <p>{userData.name}</p>
                        </div>
                        <div className="flex items-center gap-3 pt-2 pb-4 border-b-2 border-dotted border-lightGray">
                          <CgMail size={20} /> <p>{userData.email}</p>
                        </div>

                        <button
                          onClick={handleLogout}
                          className="flex w-full px-5 py-2 items-center gap-3 bg-primary text-white justify-center rounded-md mt-5 hover:bg-black duration-500 delay-75 transition-all">
                          <FiLogOut size={20} />
                          <p>Logout</p>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* mobile */}
            <div className="flex items-center justify-end flex-1 w-screen py-2 xl:py-0 xl:hidden">
              <div>
                {!isToken ? (
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative mt-2 flex h-[44px] rounded-[100px] w-32 items-center justify-center overflow-hidden bg-gray-800 text-white transition-all before:absolute before:h-0 before:w-0 before:rounded-full bg-pink  before:bg-bghover before:duration-500 before:ease-out hover:shadow-bghover hover:before:h-56 hover:before:w-56">
                    <span className="relative z-10 font-roboto text-[16px]">Sign In</span>
                  </button>
                ) : (
                  <div className="relative">
                    <button
                      onClick={handleProfileClick}
                      className="relative mt-2 rounded-full shadow-3xl">
                      {userData.image ? (
                        <img
                          width={1024}
                          height={1024}
                          src={userData.image}
                          alt="Profile"
                          className="w-[44px] rounded-full border-2 border-primary "
                        />
                      ) : (
                        <Image
                          width={1024}
                          height={1024}
                          src="/short_logo.png"
                          alt="Profile"
                          className="w-[44px] rounded-full border-2 border-primary "
                        />
                      )}
                    </button>
                    {showDropdown && (
                      <div className="absolute top-16 right-0 bg-bghero rounded-md shadow-3xl px-5 py-5">
                        <div className="flex items-center gap-3 py-2">
                          <FiAtSign size={20} /> <p>{userData.name}</p>
                        </div>
                        <div className="flex items-center gap-3 pt-2 pb-4 border-b-2 border-dotted border-lightGray">
                          <CgMail size={20} /> <p>{userData.email}</p>
                        </div>

                        <button
                          onClick={handleLogout}
                          className="flex w-full px-5 py-2 items-center gap-3 bg-primary text-white justify-center rounded-md mt-5 hover:bg-black duration-500 delay-75 transition-all">
                          <FiLogOut size={20} />
                          <p>Logout</p>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
              </div>
            </div>
          </div>
        </motion.nav>
      ) : (
        <nav
          className={`${
            isScrolled ? "bg-white" : "bg-transparent"
          } w-full select-none border-b-2 border-primary border-opacity-20 flex items-center justify-center 2xl:border-b-2 bg-bghero fixed py-2 top-0 z-[999] md:py-4 `}>
          <div
            className={`2xl:px-[146px] xl:px-36 lg:px-32 md:px-22 sm:px-16 px-6  w-full flex justify-between  max-w-screen-2xl items-center`}>
            <div className="flex items-center justify-start flex-1 w-screen py-2 xl:py-0 xl:hidden">
              <div
                className="flex flex-row gap-3 xl:hidden items-center"
                onClick={() => {
                  setToggle(!toggle);
                }}>
                {toggle ? (
                  <CgMenuRightAlt color={"#4169E1"} size={30} />
                ) : (
                  <CgMenuRightAlt color={"#4169E1"} size={30} className="rotate-180" />
                )}
                <Link
                  href="/"
                  to="/"
                  className="flex items-center "
                  onClick={() => {
                    setActive("");
                    router.push("/");
                    window.scrollTo(0, 0);
                  }}>
                  <img
                    src="/Trimz_Logo.png"
                    width={1024}
                    height={1024}
                    alt="logo"
                    className="sm:w-[160px]  sm:h-auto w-[110px] object-contain"
                  />
                </Link>
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
                        src="/Trimz_Logo.png"
                        alt="logo"
                        className={`sm:w-[85px]  sm:h-auto w-[120px]  object-contain pt-2`}
                      />
                      <div className="pt-2">
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/"
              to="/"
              className="xl:flex items-center hidden"
              onClick={() => {
                setActive("");
                router.push("/");
                window.scrollTo(0, 0);
              }}>
              <img
                src="/Trimz_Logo.png"
                width={1024}
                height={1024}
                alt="logo"
                className="sm:w-[160px]  sm:h-auto w-[110px] object-contain"
              />
            </Link>

            <div className="flex-row hidden gap-4 list-none lg:gap-6 xl:gap-10 xl:flex">
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
                      handleNavLinkClick(nav.id);
                    }}>
                    {nav.title}
                  </ScrollLink>
                );
              })}
              <div>
                {!isToken ? (
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative mt-2 flex h-[44px] rounded-[100px] w-32 items-center justify-center overflow-hidden bg-gray-800 text-white transition-all before:absolute before:h-0 before:w-0 before:rounded-full bg-pink  before:bg-bghover before:duration-500 before:ease-out hover:shadow-bghover hover:before:h-56 hover:before:w-56">
                    <span className="relative z-10 font-roboto text-[16px]">Sign In</span>
                  </button>
                ) : (
                  <div className="relative">
                    <button
                      onClick={handleProfileClick}
                      className="relative mt-2 rounded-full shadow-3xl">
                      {userData.image ? (
                        <img
                          width={1024}
                          height={1024}
                          src={userData.image}
                          alt="Profile"
                          className="w-[44px] rounded-full border-2 border-primary "
                        />
                      ) : (
                        <Image
                          width={1024}
                          height={1024}
                          src="/short_logo.png"
                          alt="Profile"
                          className="w-[44px] rounded-full border-2 border-primary "
                        />
                      )}
                    </button>
                    {showDropdown && (
                      <div className="absolute top-16 right-0 bg-bghero rounded-md shadow-3xl px-5 py-5">
                        <div className="flex items-center gap-3 py-2">
                          <FiAtSign size={20} /> <p>{userData.name}</p>
                        </div>
                        <div className="flex items-center gap-3 pt-2 pb-4 border-b-2 border-dotted border-lightGray">
                          <CgMail size={20} /> <p>{userData.email}</p>
                        </div>

                        <button
                          onClick={handleLogout}
                          className="flex w-full px-5 py-2 items-center gap-3 bg-primary text-white justify-center rounded-md mt-5 hover:bg-black duration-500 delay-75 transition-all">
                          <FiLogOut size={20} />
                          <p>Logout</p>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* mobile */}
            <div className="flex items-center justify-end flex-1 w-screen py-2 xl:py-0 xl:hidden">
              <div>
                {!isToken ? (
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative mt-2 flex h-[44px] rounded-[100px] w-32 items-center justify-center overflow-hidden bg-gray-800 text-white transition-all before:absolute before:h-0 before:w-0 before:rounded-full bg-pink  before:bg-bghover before:duration-500 before:ease-out hover:shadow-bghover hover:before:h-56 hover:before:w-56">
                    <span className="relative z-10 font-roboto text-[16px]">Sign In</span>
                  </button>
                ) : (
                  <div className="relative">
                    <button
                      onClick={handleProfileClick}
                      className="relative mt-2 rounded-full shadow-3xl">
                      {userData.image ? (
                        <img
                          width={1024}
                          height={1024}
                          src={userData.image}
                          alt="Profile"
                          className="w-[44px] rounded-full border-2 border-primary "
                        />
                      ) : (
                        <Image
                          width={1024}
                          height={1024}
                          src="/short_logo.png"
                          alt="Profile"
                          className="w-[44px] rounded-full border-2 border-primary "
                        />
                      )}
                    </button>
                    {showDropdown && (
                      <div className="absolute top-16 right-0 bg-bghero rounded-md shadow-3xl px-5 py-5">
                        <div className="flex items-center gap-3 py-2">
                          <FiAtSign size={20} /> <p>{userData.name}</p>
                        </div>
                        <div className="flex items-center gap-3 pt-2 pb-4 border-b-2 border-dotted border-lightGray">
                          <CgMail size={20} /> <p>{userData.email}</p>
                        </div>

                        <button
                          onClick={handleLogout}
                          className="flex w-full px-5 py-2 items-center gap-3 bg-primary text-white justify-center rounded-md mt-5 hover:bg-black duration-500 delay-75 transition-all">
                          <FiLogOut size={20} />
                          <p>Logout</p>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Nav;
