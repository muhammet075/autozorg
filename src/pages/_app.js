import Header from "../components/header";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
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
