import Layout from '../components/Layout'
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {

  // gefetchte Daten
  const [data, setData] = useState("")

  // ID aus URL holen
  // react router dom kann gelöscht werden
  const id = (window.location.search).replace('?id=','')
  
  useEffect(() => {

    // Fetch mit Try / Catch mit übergebener ID
    async function fetchDetail(){

      try {
          const response = await fetch (`https://omdbapi.com/?apikey=1246666d&i=${id}`);

        if (!response.ok) {
            throw new Error("Fehler beim Laden der Daten!");
        };

        // Javascript Variable
        const movieData = await response.json();

        // Prüfen, ob Film vorhanden sind
        //if(moviesData){
        if(movieData.Response === "True"){
          
          // Bild durch dummie ersetzen wenn kein Bild
          if(movieData.Poster === "N/A"){
            movieData.Poster = "../img/dummie.jpg"
          }
          setData(movieData);

          console.log(movieData.Ratings[2]);
  
        // Leer machen bei keinem Film     
        } else {
          setData([]);
        }

      // Ende Try / Catch Anfang
      } catch (error) {
          // Fehlerausgabe
          console.log(error);
      }; // Ende Catch
    };
    fetchDetail();

  },[id])

  if(!data){
    return <LoadingSpinner/>
  };

  return (
    <Layout title={`Details zu "${data.Title}"`}>
        <article className="movie">
          <div className="movie__content">

            {/* POSTER */}
            <img src={data.Poster} alt={`Filmplakat: ${data.Title}`} className="movie__poster" />

              <div>
                {/* <!-- Plot anzeigen, wenn vorhanden --> */}
                <p className="movie__plot">{data.Plot}</p>
                <dl className="movie__details">
                    {data.Released && (<><dt>Veröffentlichung</dt>
                      <dd>{data.Released}</dd></>)}

                    {data.Runtime && (<><dt>Dauer</dt>
                      <dd>{data.Runtime}</dd></>)}

                    {data.Genre && (<><dt>Genre</dt>
                      <dd>{data.Genre}</dd></>)}

                    {data.Director && (<><dt>Regisseur</dt>
                      <dd>{data.Director}</dd></>)}

                    {data.Writer && (<><dt>Drehbuchautor</dt>
                      <dd>{data.Writer}</dd></>)}

                    {data.Actors && (<><dt>Schauspieler</dt>
                      <dd>{data.Actors}</dd></>)}

                    {data.Awards && (<><dt>Auszeichnungen</dt>
                      <dd>{data.Awards}</dd></>)}

                    {data.BoxOffice && (<><dt>Einspielergebnis</dt>
                      <dd>{(data.BoxOffice).replaceAll(",",".")}</dd></>)}
                </dl>

                <dl className="movie__ratings">
                  <div>
                    {data.Ratings[0] && (<><dt>{data.Ratings[0].Source}</dt>
                      <dd>{data.Ratings[0].Value}</dd></>)}

                    {data.Ratings[1] && (<><dt>{data.Ratings[1].Source}</dt>
                      <dd>{data.Ratings[1].Value}</dd></>)}
                  
                    {data.Ratings[2] && (<><dt>{data.Ratings[2].Source}</dt>
                      <dd>{data.Ratings[2].Value}</dd></>)}
                  </div>
                </dl>
                
              </div>
          </div>

        </article> 
    </Layout>
  );
};
