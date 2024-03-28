import Head from "next/head";
import Nav from "./Nav";
import Footer from "./Footer";
import Script from "next/script";

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
      <meta
        name="keywords"
        content="URL shortener, Link shortener, Custom URL generator, Short link service, One-time link generator, IP-restricted link generator, Custom name URL generator, URL optimization, Link management tool, Shorten links,Secure URL shortener, Short URL service, Link tracking,Custom link shortener, URL shortener with analytics, Personalized short URLs, Shorten and share links, Short URL creator, URL shortener for businesses, Shorten URL for free"
      />
      <meta property="og:image" content="/short_logo.png" />
      <meta property="og:title" content="Trimz | Advance URL shortner" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="http://trimz.me/" />

      <link rel="icon" href="/favicon.ico" />

      <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/android-icon-192x192.png"
      />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />

      <Script
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "lgxdawaqxm");
          `,
        }}></Script>
    </Head>

    <header>
      <Nav />
    </header>
    <main>{children}</main>
    <footer>
      <Footer />
    </footer>
  </>
);

export default Layout;
