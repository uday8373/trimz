import Head from "next/head";
import Nav from "./Nav";

const Layout = ({children}) => (
  <>
    <Head>
      <title>
        Trimz.me: Powerful URL Shortener, Custom Links, One-Time Link Generator, IP-Based
        Links, and Advanced Analytics
      </title>
      <meta
        name="description"
        content="Elevate your link management with Trimz.me – Your all-in-one URL shortener. Create custom short links, generate one-time links, tailor URLs based on IP, and access comprehensive analytics. Trimz.me is your go-to solution for efficient and effective link optimization."
      />
      <meta property="og:image" content="/Trimz_Logo.png" />
      <meta property="og:title" content="Trimz | Advance URL shortner" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="http://trimz.me/" />

      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest"></link>
    </Head>

    <header className="my-4">
      <Nav />
    </header>
    <main>{children}</main>
  </>
);

export default Layout;
