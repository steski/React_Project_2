
import "../sass/style.scss"


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

// API KEY für omdb: 1246666d
// API KEY für Währung: f7160b4c8c764336afe27ddf74a4f3d2

// Merkzettel:

// WARNINGS
// value` prop on `input` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.
// hat mit SessionStorage zu tun, wenn es keinen Wert (=null) gibt

// Can't perform a React state update on an unmounted component
// hat mit der Seitennavigation zu tun

// A component is changing a controlled input to be uncontrolled
// Keine Ahnung

// Zusätzliche Features:
// Filme / Serien vorselektieren und speichern
// Zurückbutton in Detailansicht
// Seite speichern, um zur selben Ansicht zurückzukommen
// Umstrukturierung Navigation
// Schriftart ändern (gefällt mir nicht)

