import Layout from '../components/Layout'
import AddButtonCheck from '../components/AddButtonCheck';
import LoadingSpinner from "../components/LoadingSpinner";
import { useState, useEffect } from "react";

export default function Home() {
  // gefetchte Daten
  const [data, setData] = useState("");
  // Wert für Umrechnungskurs USD und EUR
  // Startwert ist Näherungswert, falls Fetch fehlschlägt
  const [currency, setCurrency] = useState(0.83);

  let id = "";
  // ID aus URL holen
  if (typeof window !== "undefined") {
    id = (window.document.location.search).replace('?id=','');
  };
  
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
  
        // Leer machen bei keinem Film     
        } else {
          setData([]);
        };

      // Ende Try / Catch Anfang
      } catch (error) {
          // Fehlerausgabe
          console.log(error);
      }; // Ende Catch
    };

    // Fetch für die Währungsumrechnung mit API von USD in EUR
    async function fetchCurrency(){

      try {
        // const currencyResponse = await fetch (`https://omdbapi.com/?apikey=1246666d&i=${id}`);
        const currencyResponse = await fetch (`https://openexchangerates.org/api/latest.json?app_id=f7160b4c8c764336afe27ddf74a4f3d2`);
      
        if (!currencyResponse.ok) {
            throw new Error("Fehler beim Laden der Währungsdaten!");
        };

        // Umrechungkurs USD in EUR speichern
        const currencyData = await (currencyResponse.json());
        setCurrency(currencyData.rates.EUR);
      
      // Ende Try / Catch Anfang
      } catch (currencyError) {
          // Fehlerausgabe
          console.log(currencyError);
      }; // Ende Catch
    };

    fetchDetail();
    fetchCurrency();

  },[id])

  if(!data){
    return (
      <Layout title="Details zu ...">
      <LoadingSpinner/>
      </Layout>
    );
  };

  // BoxOffice Check
  let boxOffice;
  if (data.BoxOffice === "N/A" || data.BoxOffice == null) {
    boxOffice = "0";
  }
  // BoxOffice in EUR umrechnen
  else {
    // data.BoxOffice in Int umwandeln
    boxOffice = parseInt((data.BoxOffice)
                    .replace("$","")
                    .replaceAll(",",""));
    // Mit dem Aktuellen Umrechnungskurs verrechnen
    // . zwischen Tausendern. Das parseInt Muss dorthin, obwohl es schon Int ist.
    boxOffice = parseInt(boxOffice * currency).toLocaleString('de');
  };
  
  return (
    <Layout title={`Details zu "${data.Title}"`}>
        <article className="movie">
          <div className="movie__content">

            {/* POSTER */}
            <img src={data.Poster} alt={`Filmplakat: ${data.Title}`} className="movie__poster" />

              <div>
                {/* <!-- Plot anzeigen, wenn vorhanden --> */}
                <p className="movie__plot">{data.Plot != "N/A" && data.Plot}</p>
                <dl className="movie__details">
                    {data.Released != "N/A" && (<><dt>Veröffentlichung</dt>
                      <dd>{(data.Released).replaceAll(' ','. ')}</dd></>)}

                    {data.Runtime != "N/A" && (<><dt>Dauer</dt>
                      <dd>{data.Runtime}</dd></>)}

                    {data.Genre != "N/A" && (<><dt>Genre</dt>
                      <dd>{data.Genre}</dd></>)}

                    {data.Director != "N/A" && (<><dt>Regisseur</dt>
                      <dd>{data.Director}</dd></>)}

                    {data.Writer != "N/A" && (<><dt>Drehbuchautor</dt>
                      <dd>{data.Writer}</dd></>)}

                    {data.Actors != "N/A" && (<><dt>Schauspieler</dt>
                      <dd>{data.Actors}</dd></>)}

                    {data.Awards != "N/A" && (<><dt>Auszeichnungen</dt>
                      <dd>{data.Awards}</dd></>)}

                    {boxOffice != 0 && (<><dt>Einspielergebnis</dt>
                      <dd>{boxOffice} €</dd></>)}
                </dl>
                
                {data.Ratings[0] && (<dt>Bewertungen</dt>)}
                <dl className="movie__ratings"> 
                    {data.Ratings[0] && (<><dt>{data.Ratings[0].Source}</dt>
                      <dd>{data.Ratings[0].Value}</dd></>)}

                    {data.Ratings[1] && (<><dt>{data.Ratings[1].Source}</dt>
                      <dd>{data.Ratings[1].Value}</dd></>)}
                  
                    {data.Ratings[2] && (<><dt>{data.Ratings[2].Source}</dt>
                      <dd>{data.Ratings[2].Value}</dd></>)}
                </dl>        
                
                  <AddButtonCheck
                    imdbID = {id}
                    Title = {data.Title}
                    Year = {data.Year}
                    Poster = {data.Poster}
                  />     
                  <button onClick={() => history.back()}>Zurück</button>  
                
              </div>
          </div>

        </article> 
    </Layout>
  );
};