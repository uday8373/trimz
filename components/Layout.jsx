import Head from "next/head";
import Nav from "./Nav";

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Trimz | Url Shortener</title>
      <meta name="description" content="URL Shortener" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <header className="py-4">
      <Nav />
    </header>
    <main>{children}</main>
  </>
);

export default Layout;
