import AddButtonCheck from './AddButtonCheck';
import Link from "next/link";

// Hier sind die Filme, die auf der PoduktSeite angezeigt werden
// Quelle ist omdb API
export default function ProduktListe({data}) {

  return <div className="movie-teasers">
    {/* movies mit map durchlaufen und relevanten Parameter übergeben */}
    {data.map(({Title, Year, imdbID, Poster, Type}) => (
      // Key kommt in übergeordnetes Element
      <article key={imdbID} className="teaser">
        
        {/* Parameter in HTML Dinger einsetzen */}
        <Link href={`/detail?id=${imdbID}`}>
        <h3>{Title}</h3>
        </Link>

        {/* Bild nur anzeigen, wenn eins Vorhanden ist 
        Keine Bilder (N/A) werdefn durch Bild dummie ersetzt*/}
        { (Poster === "N/A") || (<Link href={`/detail?id=${imdbID}`}>
        <img src={Poster} alt={`Filmplakat: ${Title}`} className="teaser__image" />
        </Link>)}

        { (Poster === "N/A") && (<Link href={`/detail?id=${imdbID}`}>
        <img src="../img/dummie.jpg" alt={`Filmplakat: ${Title}`} className="teaser__image" />
        </Link>)}

        {/* Jahr nur Anzeigen wenn vorhanden */}
        { Year && (<time className="teaser__date" dateTime={Year}>Release: {Year}</time>)}

        {/* Button mit allen Übergabeparametern
        fügt Film zu Favoriten hinzu */}
        <AddButtonCheck
          imdbID = {imdbID}
          Title = {Title}
          Year = {Year}
          Poster = {Poster}
        />
 
      </article>
    ))}

  </div>;
};