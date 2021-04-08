import Layout from '../components/Layout';
import ProduktListe from "../components/ProduktListe";
import Filter from '../components/Filter';
import ErgebnisInfo from '../components/ErgebnisInfo';
import SeiteNav from '../components/SeiteNav';

import defaultMovies from "../components/defaultMovies";
import LoadingSpinner from "../components/LoadingSpinner";

import { useDebouncedValue } from "../hooks/useDebouncedValue";
import {useState, useEffect} from "react";


export default function ProduktSeite() {

    // gefetchte Daten
    const [data, setData] = useState(defaultMovies)
    // Suchparameter
    const [keyword, setKeyword] = useState("");
    const [year, setYear] = useState("");
    const [type, setType] = useState("");
    // aktuelle Seitenzahl
    let [page, setPage] = useState(1);
    // Maximale Anzahl der Seiten
    const [maxPage, setMaxPage] = useState(1);
    // Gesamtanzahl der gefundenen Einträge
    const [anzahl, setAnzahl] = useState(10);
    // Ergebnis von ...
    const [ergebnisVon, setergebnisVon] = useState(1);
    // ... bis
    const [ergebnisBis, setErgebnisBis] = useState(10);  


    const seiteVor = () => {
        // Button ist bei maximaler Seitenzahl schon disabled, daher nicht zwingend notwendig
        if (page<(Math.ceil(anzahl/10))){
        setPage(++page);
        };
    };

    const seiteZurueck = () => {
        // Button ist bei 1 schon disabled, daher nicht zwingend notwendig
        if (page>1){
         setPage(--page);
        };
    };

    // Wartezeit nach der Eingabe, damit nicht sofort gefetcht wird
    const debouncedSearch = useDebouncedValue(keyword, 800)
    const debouncedYear = useDebouncedValue(year, 800)

    useEffect(() => {

        // Weniger als 3 Buchstaben wird von der API nicht unterstützt
        // somit werden die defaultMovies angezeigt und Elemente zurückgesetzt
        if(debouncedSearch.length < 3){
            setData(defaultMovies);
            localStorage.setItem('keyword','');
            setMaxPage(1);
            setAnzahl(10);
            setergebnisVon(1);
            setErgebnisBis(10);
            return;
        };

        if(debouncedYear.length < 4 && debouncedYear.length > 0){
            localStorage.setItem('year','');
            return;
        };

        // Fetchfunktion der Filmdatenbank
        async function fetchData(){

            //Film Array vorher leeren um den Fehler durch doppelte Filme (in der omDB) mit Seitenwechsel zu umgehen
            setData([]);

            // Begin Try
            try {

                // Fetch mit Adresse und debouncedSearch Variable. Das ist der Inhalt des Inputfeldes
                const response = await fetch (`https://omdbapi.com/?apikey=1246666d&s=${debouncedSearch}&y=${debouncedYear}&type=${type}&page=${page}`);

                // Fehlerausgabe falls Response nicht ok
                if (!response.ok) {
                    throw new Error("Fehler beim Laden der Daten!");
                };

                // Ergebnis in Javascript Variable speichern
                const moviesData = await response.json();

                // Prüfen, ob Filme vorhanden sind
                if(moviesData.Response === "True"){
                    // Filme sind im Unterpunkt Search vom Rückgabe Objekt gespeichert
                    setData(moviesData.Search);
                    setAnzahl(moviesData.totalResults);
                    setMaxPage(Math.ceil(moviesData.totalResults/10));
                    setergebnisVon(page*10-9);
                    if(page*10>anzahl){
                        setErgebnisBis(anzahl);
                    } else {
                        setErgebnisBis(page*10);
                    };

                // Falls keine Filme vorhanden sind
                } else {
                    console.log("keine Filme gefunden");
                    setMaxPage(0);
                    setAnzahl(0);
                    setData([]);
                };

            // Ende Try / Catch
            } catch (error) {
                // Fehlerausgabe
                console.log("FEHLER :",error);
            };
        };

    // oben beschriebene Funktion ausführen
    fetchData();
    
    // Abhängigkeit
    }, [debouncedSearch, debouncedYear, type, page])

    if(!data){
        return <LoadingSpinner/>
    };

    // Start der Return Ausgabe
    return (
        <Layout title="Filmliste">
            {/* Filter Einstellungen*/}
            <Filter
                keyword={keyword}
                setKeyword={setKeyword}
                year={year}
                setYear={setYear}
                type={type}
                setType={setType}
            />
            <ErgebnisInfo
                anzahl={anzahl}
                page={page}
                maxPage={maxPage}   
                ergebnisVon={ergebnisVon}
                ergebnisBis={ergebnisBis} 
            />
            <SeiteNav
                maxPage={maxPage}
                page={page}
                seiteZurueck={seiteZurueck}
                seiteVor={seiteVor}
                setPage={setPage}
                anzahl={anzahl}
            />

            { anzahl === 0 && (<h2>Keine Filme gefunden</h2>)}

            {/* Filme übergeben, hier ist das map drin */}
            <ProduktListe data={data}/>

        </Layout>
   
    ); // Ende der Return Ausgabe
};