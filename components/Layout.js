import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";


// Allgemeines Layout der Seite
export default function layout({children, title}) {

    return (
        <div className="site-wrapper">
            <Head>
                {/* Wenn kein Titel gesetzt ist */}
                <title>{title || "React Projekt"}</title>
            </Head>
            <Header/>
            <main className="site-main inner-width">
                {title && <h2>{title}</h2>}
                {children}
            </main>
            <Footer/>
        </div>
    );
};
