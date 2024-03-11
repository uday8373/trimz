// pages/_app.js

import "../global.css";
import "tailwindcss/tailwind.css";
import "@fontsource/public-sans";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "../components/Cookies";
import {SpeedInsights} from "@vercel/speed-insights/next";
import {Analytics} from "@vercel/analytics/react";

function MyApp({Component, pageProps}) {
  return (
    <>
      <Component {...pageProps} />
      <Cookies />
      <ToastContainer position="bottom-right" />
      <SpeedInsights />
      <Analytics />
    </>
  );
}

export default MyApp;
