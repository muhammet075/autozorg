import { useEffect } from "react";
import Header from "../components/header";
import "@/styles/globals.css";

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
    <div id='app'>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
