import Link from "next/link";
import {set} from './indexedDB';

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

        {/* Bild nur anzeigen, wenn eins Vorhanden ist */}
        { (Poster === "N/A") || (<Link href={`/detail?id=${imdbID}`}>
        <img src={Poster} alt={`Filmplakat: ${Title}`} className="teaser__image" />
        </Link>)}

        {/* Jahr nur Anzeigen wenn vorhanden */}
        { Year && (<time className="teaser__date" dateTime={Year}>Veröffentlichung: {Year}</time>)}

        {/* Button zur Merkliste hinzufügen */}
        <button id="add"
          onClick={() => dataSpeichernDB(Title, Year, imdbID, Poster, Type)}>Hinzufügen</button>

      </article>
    ))}

  </div>;
};

// Funktion zum Speichern des Filmes in die IndexedDB
function dataSpeichernDB(Title, Year, imdbID, Poster, Type){
  const indexedDBdata = {Title, Year, imdbID, Poster, Type};
  set(imdbID,indexedDBdata);
};