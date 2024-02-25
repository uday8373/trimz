// pages/_app.js

import "../global.css";
import "tailwindcss/tailwind.css";
import "@fontsource/public-sans";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({Component, pageProps}) {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
