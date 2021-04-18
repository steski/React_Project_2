export default function DateFormat({pubDate, dateNowDay}){

    // damit Dateobjekte nicht jedesmal neu erstellt werden
    // evtl. Minimal Ressourcensparender und übersichtlicher
    const pubDateDay = new Date(pubDate).getDate()
    const pubDateHours = new Date(pubDate).getHours()
    const pubDateMinutes = new Date(pubDate).getMinutes()

    const minute = (pubDateMinutes < 10 ? `0${pubDateMinutes}` : pubDateMinutes)
    const stunde = (pubDateHours   < 10 ? `0${pubDateHours}`   : pubDateHours)
    const tag = (dateNowDay === pubDateDay ? `Heute` : `${pubDateDay}.${new Date(pubDate).getMonth()+1}.`)

    return (

        <div>
            {tag} um {stunde}:{minute} Uhr
        </div>
    );
};

/*
Alter Vergleich

Datumausgabe mit integrierter Konvertierung
Vergleich auf Heute - Gestern | Vergleich auf kleiner als 10 
RSS Feed hat immer News der letzten 24 Stunden, somit gibt es nur Heute oder Gestern
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
*/