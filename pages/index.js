import Layout from '../components/Layout'


export default function Home() {
  return (
    <Layout title="Startseite">
      <div className="start">
      <h3>😀 Willkommen zum Projekt des JavaScript React Kurses 😀 </h3>

      <dl>
        <dt>Inhalt</dt>
          <dd>RSS Newsfeed</dd>
          <dd>RSS AudioPodcast</dd>
          <dd>Favoritenliste für favorisierte Filme</dd>
          <dd>Filmsuche mit omdbapi</dd>
          <dd>Detailseite der angeklickten Filme</dd>
      </dl>
      </div>
    </Layout>
  );
};
