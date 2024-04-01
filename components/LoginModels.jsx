import React, {useState, useEffect} from "react";
import {Dialog} from "@headlessui/react";
import {motion, AnimatePresence} from "framer-motion";
import {RxCross2} from "react-icons/rx";
import {FaGoogle, FaEyeSlash, FaEye} from "react-icons/fa";
import {MdEmail} from "react-icons/md";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {ThreeDots} from "react-loader-spinner";
import {FaUserLarge} from "react-icons/fa6";
import {auth} from "../utils/firebase";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useRouter} from "next/navigation";

export const Modal = ({isOpen, setIsOpen}) => {
  const router = useRouter();
  const [isVisible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [isSignUp, setIsSingUp] = useState(false);
  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   if (!validateForm()) return;
  //   setErrors({});
  // }, [email, name, password]);

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation
    const lowercaseEmail = email.trim().toLowerCase();
    if (!lowercaseEmail) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(lowercaseEmail)) {
      errors.email = "Email is invalid";
    }

    // Name validation
    if (isSignUp && !name.trim()) {
      errors.name = "Name is required";
    } else if (name.includes("  ")) {
      errors.name = "Name cannot contain double spaces";
    }

    // Password validation
    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (/\s/.test(password)) {
      errors.password = "Password cannot contain spaces";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setErrors({});
    try {
      const ipAddressResponse = await fetch("https://api.ipify.org?format=json");

      const {ip} = await ipAddressResponse.json();

      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password, name, ipAddress: ip}),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        toast.success(data.message);
        window.postMessage({type: "LOGIN_SUCCESS"}, "*");
        router.refresh();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setEmail("");
      setPassword("");
      setName("");
      setLoading(false);
      setIsOpen(!isOpen);
      setErrors({});
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setErrors({});
    try {
      const ipAddressResponse = await fetch("https://api.ipify.org?format=json");

      const {ip} = await ipAddressResponse.json();

      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password, ipAddress: ip}),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        toast.success(data.message);
        window.postMessage({type: "LOGIN_SUCCESS"}, "*");
        router.refresh();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setEmail("");
      setPassword("");
      setLoading(false);
      setIsOpen(!isOpen);
      setErrors({});
    }
  };

  const toggle = () => {
    setVisible(!isVisible);
  };
  const handleClick = () => {
    setEmail("");
    setPassword("");
    setName("");
    setErrors({});
    setIsSingUp(!isSignUp);
  };
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const {user} = result;
      const ipAddressResponse = await fetch("https://api.ipify.org?format=json");

      const {ip} = await ipAddressResponse.json();

      const response = await fetch("/api/google/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          image: user.photoURL,
          name: user.displayName,
          ipAddress: ip,
        }),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        toast.success(data.message);
        window.postMessage({type: "LOGIN_SUCCESS"}, "*");
        router.refresh();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    } finally {
      setGoogleLoading(false);
      setIsOpen(!isOpen);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setErrors({});
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={setIsOpen}
          as="div"
          className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-black/25">
          <div className="flex flex-col h-full lg:px-8 pt-5 overflow-hidden text-center lg:pt-10 lg:pb-8 md:pt-14 md:pb-8 ">
            <Dialog.Overlay />

            <button
              onClick={handleCloseModal}
              className="fixed inset-0 transition-opacity "
              aria-hidden="true">
              <div className="absolute inset-0 opacity-30  bg-black/40"></div>
            </button>

            <motion.div
              className="flex items-center justify-center min-h-screen lg:px-4 md:pb-0 text-center sm:block sm:p-0 "
              initial={{
                opacity: 0,
                scale: 0.75,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  ease: "easeOut",
                  duration: 0.15,
                },
              }}
              exit={{
                opacity: 0,
                scale: 0.75,
                transition: {
                  ease: "easeIn",
                  duration: 0.15,
                },
              }}>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true">
                &#8203;
              </span>
              <div
                className="inline-block overflow-hidden align-bottom transition-all  transform   rounded-[15px] shadow-3xl bg-bghero sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline">
                <div className="md:w-[400px] w-full h-auto ">
                  <div className="relative flex w-full lg:px-4 py-4 border-b border-dashed border-opacity-70 border-lightGray ">
                    <div className="flex items-center justify-center w-full ">
                      <p className="font-sans text-2xl font-semibold text-gray ">
                        {isSignUp ? "Sign Up" : "Sign In"}
                      </p>
                    </div>
                    <div className="absolute right-5 ">
                      <button
                        type="button"
                        tabIndex={0}
                        className="flex items-center justify-center px-2 py-2 border rounded-lg border-lightGray bg-bghero"
                        onClick={handleCloseModal}>
                        <RxCross2 size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="lg:px-10 px-5 py-5 bg-bghero">
                    <button
                      onClick={handleGoogleSignIn}
                      className="w-full drop-shadow-md">
                      <div className="flex w-full rounded-[10px] bg-pink ">
                        <div className="flex items-center justify-center w-1/5 h-12 px-2 border-r-2 border-white border-opacity-45">
                          <FaGoogle size={25} color="#ffffff" />
                        </div>
                        <div className="flex items-center rounded-r-[10px] justify-center w-4/5 bg-pink">
                          <p className="font-sans text-base font-semibold text-white">
                            {googleLoading ? (
                              <ThreeDots
                                visible={true}
                                height="50"
                                width="50"
                                color="#fff"
                                radius="9"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                              />
                            ) : (
                              "Continue with Google"
                            )}
                          </p>
                        </div>
                      </div>
                    </button>

                    <div className="py-3">
                      <p className="font-sans text-lg font-medium text-black">Or</p>
                    </div>
                    {/* *********************************************************************************** */}

                    <div className="flex flex-col w-full gap-5 ">
                      {isSignUp && (
                        <div>
                          <div className="flex w-full shadow-3xl   rounded-[10px] ">
                            <div className="w-4/5 font-sans  rounded-l-[10px]">
                              <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Name"
                                className="w-full h-12  rounded-l-[10px] pl-5 text-black outline-none bg-white"
                              />
                            </div>
                            <div className="flex items-center justify-center w-1/5  rounded-r-[10px] bg-white">
                              <FaUserLarge color="#AFAFAF" size={20} />
                            </div>
                          </div>

                          {errors.name && (
                            <p className="text-red-500 pt-2 font-sans text-[14px]">
                              {errors.name}
                            </p>
                          )}
                        </div>
                      )}
                      <div>
                        <div className="flex w-full shadow-3xl   rounded-[10px] ">
                          <div className="w-4/5 font-sans  rounded-l-[10px]">
                            <input
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              type="email"
                              placeholder="Email"
                              className="w-full h-12  rounded-l-[10px] pl-5 text-black outline-none bg-white"
                            />
                          </div>
                          <div className="flex items-center justify-center w-1/5  rounded-r-[10px] bg-white">
                            <MdEmail color="#AFAFAF" size={20} />
                          </div>
                        </div>
                        {errors.email && (
                          <p className="text-red-500 pt-2 font-sans text-[14px]">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      {/* ************** */}
                      <div>
                        <div className="flex w-full shadow-3xl rounded-[10px] ">
                          <div className="w-4/5 font-sans rounded-l-[10px] ">
                            <input
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              type={!isVisible ? "password" : "text"}
                              placeholder="Password"
                              className="w-full h-12  rounded-l-[10px] pl-5 text-black outline-none bg-white"
                            />
                          </div>
                          <div
                            onClick={toggle}
                            className="flex items-center justify-center w-1/5  rounded-r-[10px] bg-white">
                            {isVisible ? (
                              <FaEye color="#AFAFAF" size={20} />
                            ) : (
                              <FaEyeSlash color="#AFAFAF" size={20} />
                            )}
                          </div>
                        </div>
                        {errors.password && (
                          <p className="text-red-500 pt-2 font-sans text-[14px]">
                            {errors.password}
                          </p>
                        )}
                      </div>

                      {/* *********************************************************************************** */}
                      {isSignUp ? (
                        <button
                          type="submit"
                          onClick={handleSignUp}
                          disabled={loading}
                          className="w-full h-12 justify-center items-center flex shadow-3xl text-white font-sans font-semibold text-lg rounded-[10px] bg-primary">
                          {loading ? (
                            <ThreeDots
                              visible={true}
                              height="60"
                              width="60"
                              color="#fff"
                              radius="9"
                              ariaLabel="three-dots-loading"
                              wrapperStyle={{}}
                              wrapperClass=""
                            />
                          ) : (
                            "Sign Up"
                          )}
                        </button>
                      ) : (
                        <button
                          type="submit"
                          onClick={handleSignIn}
                          disabled={loading}
                          className="w-full h-12 justify-center items-center flex shadow-3xl text-white font-sans font-semibold text-lg rounded-[10px] bg-primary">
                          {loading ? (
                            <ThreeDots
                              visible={true}
                              height="60"
                              width="60"
                              color="#fff"
                              radius="9"
                              ariaLabel="three-dots-loading"
                              wrapperStyle={{}}
                              wrapperClass=""
                            />
                          ) : (
                            "Sign In"
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center w-full px-5 py-3 border-t border-dashed border-lightGray border-opacity-70">
                  <div className="flex gap-1">
                    <p className="font-sans text-secondary">
                      {isSignUp ? "Already have an account? " : "New Here? "}
                    </p>
                    <button
                      onClick={() => {
                        handleClick(isSignUp);
                      }}
                      className="font-sans text-pink font-semibold">
                      {isSignUp ? "Sign In" : "Sign Up"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
