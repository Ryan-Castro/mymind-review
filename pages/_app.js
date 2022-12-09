import "../public/style/globalstyle.css";
import "../public/style/navBar.css";
import "../public/style/header.css"
import "../public/style/card.css"
import "../public/style/creat.css"
import "../public/style/admin.css"
import "../public/style/reading.css"
import "../public/style/modal.css"
import "../public/style/textBox.css"
import "../public/style/config.css"
import Script from "next/script";


export default function MyApp({ Component, pageProps }) {
    return (
    <>
    <Script 
    async
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5923285676279092`}
    crossOrigin="anonymous"
    />
    <Component {...pageProps} />
    </>
    );
    }