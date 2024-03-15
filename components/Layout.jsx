import Head from "next/head";
import Nav from "./Nav";
import Footer from "./Footer";

const Layout = ({children}) => (
  <>
    <Head>
      <title>
        Trimz.me: Free Advance URL Shortener, Custom Links, One-Time Link Generator,
        IP-Based Links, and Advanced Analytics
      </title>
      <meta
        name="description"
        content="Elevate your link management with Trimz.me – Your all-in-one URL shortener. Create custom short links, generate one-time links, tailor URLs based on IP, and access comprehensive analytics. Trimz.me is your go-to solution for efficient and effective link optimization."
      />
      <meta property="og:image" content="/short_logo.png" />
      <meta property="og:title" content="Trimz | Advance URL shortner" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="http://trimz.me/" />

      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest"></link>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "lgxdawaqxm");
          `,
        }}></script>
    </Head>

    <header className="my-4">
      <Nav />
    </header>
    <main>{children}</main>
    <footer>
      <Footer />
    </footer>
  </>
);

export default Layout;
