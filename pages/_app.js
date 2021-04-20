
import "../sass/style.scss";


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
};

export default MyApp;

// API KEY für omdb: 1246666d
// API KEY für Währung: f7160b4c8c764336afe27ddf74a4f3d2

// Merkzettel:

// FEHLER
// es gibt noch einen Fehler bei BoxOffice (Zusätzliche Überprüfung notwendig)
// tritt nur bei einem kleinem Teil der Inhalte auf
// z.b. ID tt0103359 oder tt8306578
// Audio hängt sich manchmal auf wenn man zu schnell klickt

// WARNINGS
// value` prop on `input` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.
// hat mit SessionStorage zu tun, wenn es keinen Wert (=null) gibt

// Can't perform a React state update on an unmounted component
// hat womöglich mit Seitennavigation zu tun

// A component is changing a controlled input to be uncontrolled
// hat womöglich mit Seitennavigation zu tun

// weitere Ideen:
// Bei einigen Filmen: Mal ist wert N/A, mal nicht vorhanden. Weitere Überprüfung notwendig
// FilterCheck eventuell mit debounced?
// useState Funktion sessionStorage
// Lautstärke Regler
// Fehler ergebnis Bis

/* Zur Übersicht - Features:
  Ursprünglich zur Projektabgabe: 
    API Anbindung mit Film, Jahres, Typ Suche
      Seitenanzeige, Seitennavigation
      Anzeige von 10 Ergebnissen (API Bedingt)
        Titel, Bild, Jahr, Hinzufügen Button
      Detailansicht bei Film anklicken
        Fetch mit ID zu spezifischen Film, Ausgabe der Infos
    Favoriten Seite
      hinzugefügte Filme in IndexedDB gespeichert
      Löschen der Filme
    RSS Newsfeed Seite
      Titel, Bild, Beschreibung, Datum mit Konvertierung
    RSS Podcast Seite
      Titel, Datum, Play Button
      Audiofunktion mit Start/Stop anfassbarem Fortschrittsbalken

  Nach Projektabage:
    • Loadingspinner fixes (hat nicht immer funktioniert)
    • Audio Pause fix
    • Umrechnungs Api USD in EUR bei Detailansicht (aktueller Kurs)
    • "Hinzufügen" Button wird disabled und zu "gespeichert" wenn Film bereits in indexedDB
    • Filmliste loadingspinner fix (teile des Layouts werden weiterhin angezeigt)
    • Implementierung SessionStorage zur Speicherung der Eingabe (Keyword, Year, Type, Page)
    • Detailseite fixes - (N/A, leere Werte etc.)
                        - Buttons hinzugefügt
    • SessionStorage fix  - SessionStorage jetzt immer unter UseStates für alle 4 Elemente)
                          - Speicherung bei verlassen der Filmseite
    • Film vorselektiert (damit keine Spiele etc angezeigt werden)
    • DefaultMovies komplett entfernt
    • RSS Date fix  - (es waren auch ätere Einträge als "gestern")
                    - als Funktion ausgelagert
    • Fragment fix - einige <div> durch <> ausgetauscht und überflüssige Entfernt
    • Label für Keyword und Filter zeigen ungültiger Eingabe
    • Abbruch hinzugefügt bei falscher Filtereingabe (setAbbruch)
    • Speicherung des Aktuellen Podcasts in locastStorage für späteres weiterhören
    • Seite Zurücksetzung bei Suchbegriffänderung
    */