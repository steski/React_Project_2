import Layout from '../components/Layout';
import Link from "next/link";
// Bibliothek für RSS Feed
import Parser from 'rss-parser';

export async function getStaticProps() {
        let parser = new Parser();
        let feed = [];

        // Begin Try
        try {
            // Fetch mit fester RSS-Feed Adresse
            feed = await parser.parseURL('https://movieweb.com/rss/movie-news/');

            // Fehlerausgabe falls nicht news (wenn news leer)
            if (!news) {
                throw new Error("Fehler beim Laden der Daten!");
            };

        // Ende Try / Catch
        } catch (error) {
            // Fehlerausgabe
            console.log("FEHLER :",error);
        };

    return {
      props: {
        feed:feed.items
      },
      revalidate: 600,
    };
};

export default function news({feed}) {

    return (
        <Layout title="News">
            <div>
                {/* News durchgehen und Elemente anzeigen */}
                {feed.map(({title, link, content, pubDate, enclosure}) => (
                    <Link key={link} href={link}>   
                        <dl className="rss_news">
                            <dt className="rss_title">             
                                <h4>{title}</h4>
                            </dt>
                            <dd className="rss_content">
                                <img width="30%" src={enclosure.url}></img>
                                <div>
                                    <p>{content}</p>
                                    <p>
                                        {/* Datumausgabe mit integrierter Konvertierung
                                        Vergleich auf Heute - Gestern | Vergleich auf kleiner als 10 
                                        RSS Feed hat immer News der letzten 24 Stunden, somit gibt es nur Heute oder Gestern*/}
                                        Veröffentlicht: &nbsp;
                                        {new Date(Date.now()).getDate() === new Date(pubDate).getDate() && <span>Heute</span>}
                                        {new Date(Date.now()).getDate() != new Date(pubDate).getDate() && <span>Gestern</span>}
                                        &nbsp;um&nbsp;
                                        {(new Date(pubDate)).getHours() < 10 && <span>0{(new Date(pubDate)).getHours()}</span>}
                                        {(new Date(pubDate)).getHours() > 10 && (new Date(pubDate)).getHours()}
                                        :
                                        {(new Date(pubDate)).getMinutes() < 10 && <span>0{(new Date(pubDate)).getMinutes()}</span>}
                                        {(new Date(pubDate)).getMinutes() > 10 && (new Date(pubDate)).getMinutes()}
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