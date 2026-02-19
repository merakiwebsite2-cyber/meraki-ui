import "antd/dist/reset.css";
import "../styles/globals.css";
import Head from "next/head";
<Head>
  <link
    href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap"
    rel="stylesheet"
  />
</Head>
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
