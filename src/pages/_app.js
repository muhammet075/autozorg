import { useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "@/styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth <= 480) {
        window.scrollTo(0, 1);
      }
    };
    window.addEventListener("load", handler);
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("load", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <>
      <Head>
        <link rel='manifest' href='/manifest.json' />
        <meta name='theme-color' content='#0C79DD' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta content='yes' name='apple-mobile-web-app-capable' />
        <meta content='yes' name='mobile-web-app-capable' />
      </Head>
      <div id='app'>
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default MyApp;
