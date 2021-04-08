import Link from "next/link";
// Nur das Löschen einzelner Einträge der indexedDB wird benötigt
import {del} from '../components/indexedDB';

// Hier sind die Elemente, die in der MerkSeite angezeigt werden
// Die Quelle "data" sind die Inhalte aus der indexedDB
// Die Seite ist genauso aufgebaut wie die ProdukListe
// Nur der Button ist anders - Eventuell kann man beide Dateien zusammenfassen?
export default function MerkListe({data, setDataIndexedDB, anzahlIndexedDB, setAnzahlIndexedDB}) {

  return (<div className="movie-teasers">
    {/* movies mit map durchlaufen und relevanten Parameter übergeben */}
    {data.map(({Title, Year, imdbID, Poster}) => (
      // Key kommt in übergeordnetes Element
      <article key={imdbID} className="teaser">

        {/* Parameter in HTML Dinger einsetzen */}
        <Link href={`/detail?id=${imdbID}`}>
          <h3>{Title}</h3>
        </Link>

        {/* Bild nur anzeigen, wenn eins vorhanden ist */}
        { (Poster === "N/A") || (<Link href={`/detail?id=${imdbID}`}>
        <img src={Poster} alt={`Filmplakat: ${Title}`} className="teaser__image" />
        </Link>)}

        {/* Jahr nur Anzeigen wenn vorhanden */}
        { Year && (<time className="teaser__date" dateTime={Year}>Veröffentlichung: {Year}</time>)}

        {/* Button mit Löschfunktion zur Merkliste hinzufügen 
        Es wird hierbei der Wert mit der passanenden imdbID gelöscht*/}
        <button id="erase"
          onClick={() => {
            setDataIndexedDB((movies)=>movies.filter(movie=>movie.imdbID != imdbID));
            setAnzahlIndexedDB(--anzahlIndexedDB);
            del(imdbID);
          }}>Löschen
        </button>

      </article>
    ))}

  </div>);
};