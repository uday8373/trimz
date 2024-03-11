// pages/_app.js

import "../global.css";
import "tailwindcss/tailwind.css";
import "@fontsource/public-sans";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "../components/Cookies";
import {SpeedInsights} from "@vercel/speed-insights/next";

function MyApp({Component, pageProps}) {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <SpeedInsights />
      <Cookies />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
