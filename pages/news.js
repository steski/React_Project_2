import Layout from '../components/Layout';
import DateFormat from '../components/DateFormat';
import Link from "next/link";
import Parser from 'rss-parser';

export async function getStaticProps() {
        const parser = new Parser();
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

    // Heutigen Tag ermitteln
    const dateNowDay = new Date(Date.now()).getDate();

    return (
        <Layout title="News">
                {/* News durchgehen und Elemente anzeigen */}
                {feed.map(({title, link, content, pubDate, enclosure}) => (
                    <Link key={link} href={link}>   
                        <dl className="rss_news">
                            <dt className="rss_title">             
                                <h4>{title.replace("&amp;","&")}</h4>
                            </dt>
                            <dd className="rss_content">
                                <img width="30%" src={enclosure.url}></img>
                                <div>
                                    <p>{content.replace("&amp;","&")}</p>
                                    <p>
                                        <DateFormat 
                                            pubDate={pubDate}
                                            dateNowDay={dateNowDay}
                                        />
                                    </p>
                                </div>
                            </dd>
                            <hr/>
                        </dl>
                    </Link>
                ))}
        </Layout>
    );
};