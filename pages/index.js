import Layout from '../components/Layout'


export default function Home() {
  return (
    <Layout title="Startseite">
      <div className="start">
      <h3>😀 Willkommen zum Projekt des JavaScript React Kurses 😀 </h3>

      <dl>
          <dt>Filmsuche</dt>
            <dd>omdbapi anbindung</dd>
            <dd>Suchmaske zur Film/Seriensuche</dd>
            <dd>Seitennavigation</dd>
            <dd>Speicherung der Eingabe mit sessionStorage</dd>
            <dd>Hinzufügen der Filme zu Favoriten</dd>
            <dd>Detailansicht für angeklickte Filme</dd>
          <br/><dt>Favoritenliste</dt>
            <dd>Speicherung der Filme mit IndexedDB</dd>
            <dd>Detailansicht für angeklickte Filme</dd>
          <br/><dt>Newsfeed</dt>
            <dd>Anzeige eines RSS Feeds</dd>
          <br/><dt>Newspodcast</dt>
            <dd>Anzeige eines RSS Feeds mit Audiofunktion</dd>

      </dl>
      </div>
    </Layout>
  );
};
