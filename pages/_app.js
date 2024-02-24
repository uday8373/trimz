// pages/_app.js

import "../global.css";
import "tailwindcss/tailwind.css";
import "@fontsource/public-sans";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
