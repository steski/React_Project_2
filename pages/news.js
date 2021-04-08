import Layout from '../components/Layout';

import Link from "next/link";
import {useState, useEffect} from "react";
// Bibliothek für RSS Feed
import Parser from 'rss-parser';

export default function news() {

    // use State für die gefetchten RSS-Feed Daten
    const [news, setNews] = useState([]);
    
    let parser = new Parser();

    useEffect(() => {

        // Fetchfunktion des News RSS-Feeds
        async function fetchNews(){

            // Begin Try
            try {
                // Fetch mit fester RSS-Feed Adresse
                let feed = await parser.parseURL('https://movieweb.com/rss/movie-news/');
                setNews(feed.items);

                // Fehlerausgabe falls nicht news (wenn news leer)
                if (!news) {
                    throw new Error("Fehler beim Laden der Daten!");
                };

            // Ende Try / Catch
            } catch (error) {
                // Fehlerausgabe
                console.log("FEHLER :",error);
            };
        };
        // obige Funktion aufrufen
        fetchNews();

    // wird beim Start der Seite ausgeführt
    },[]);

    if(!news){
        return <LoadingSpinner/>
    };

    return (
        <Layout title="News">
            <div>
                {/* News durchgehen und Elemente anzeigen */}
                {news.map(({title, link, content, pubDate, enclosure}) => (
                    <Link href={link}>   
                        <dl className="rss_news" key={link}>
                            <dt className="rss_title">             
                                <h4>{title}</h4>
                            </dt>
                            <dd className="rss_content">
                                <img width="30%" src={enclosure.url}></img>
                                <div>
                                    <p>{content}</p>
                                    <p>
                                        Veröffentlicht: &nbsp;
                                        {new Date(Date.now()).getDate() === new Date(pubDate).getDate() && <span>Heute</span>}
                                        {new Date(Date.now()).getDate() != new Date(pubDate).getDate() && <span>Gestern</span>}
                                        &nbsp;um&nbsp;
                                        {(new Date(pubDate)).getHours()}:
                                        {(new Date(pubDate)).getMinutes()}
                                        &nbsp;Uhr
                                    </p>
                                </div>
                            </dd>
                            <hr/>
                        </dl>
                    </Link>
                ))}
            </div>
        </Layout>
    );
};