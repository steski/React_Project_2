
import "../sass/style.scss"


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

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

// ZUSATZ
// Bei einigen Filmen: Mal ist wert N/A, mal nicht vorhanden. Weitere Überprüfung notwendig
// RSS NEWS: News sind auch von Vorgestern
// SessionStorage wie bei UseToggle in Hooks machen
// sessionStorage Data überprüfen
// Regex bei Forumalareingabe
// News --> Date --> Monatswechsel Eventuell Fehlerhaft? Heute, Gestern 