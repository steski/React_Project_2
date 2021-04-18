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
    // Suchparameter, Startwert ist der Inhalt des sessionStorage
    const [keyword, setKeyword] = useState("");
    const [year, setYear] = useState("");
    const [type, setType] = useState("movie");
    // aktuelle Seitenzahl
    let [page, setPage] = useState(1);
    // let [page, setPage] = useState(sessionStorage.getItem('page'));
    // Maximale Anzahl der Seiten
    const [maxPage, setMaxPage] = useState(1);
    // Gesamtanzahl der gefundenen Einträge
    const [anzahl, setAnzahl] = useState(10);
    // Ergebnis von ...
    const [ergebnisVon, setergebnisVon] = useState(1);
    // ... bis
    const [ergebnisBis, setErgebnisBis] = useState(10);  

    /*
    Funktion für sessionStorage
    Bei Deployment (vercel) gibt es Fehlermeldung mit window not definied
    ursprünglich wurde sessionStorage direkt im UseState geladen
    Wird nun hier geladen mit überprüfung, ob im Storage bereits etwas drin ist
    Ebenfalls überprüfung ob window null ist
    */
    const sessionStorageLoad = () => {

        // UseEffect, damit es nur beim Aufruf aufgerufen wird
        // Ansonsten "to many Renders" Fehlermeldung
        useEffect(() => {

        // Aktuelle Seite
        const storagePage = window.sessionStorage.getItem('page');
        if (storagePage == null) {
            setPage(1);
        } else {
            setPage(storagePage);
        };

        // Keyword
        const storageKeyword = window.sessionStorage.getItem('keyword');
        if (storageKeyword == null) {
            setKeyword("");
        } else {
            setKeyword(storageKeyword);
        };

        // Jahr
        const storageYear = window.sessionStorage.getItem('year');
        if (storageYear == null) {
            setYear("");
        } else {
            setYear(storageYear);
        };

        // Type
        const storageType = window.sessionStorage.getItem('type');
        if (storageType == null) {
            setType("movie");
        } else {
            setType(storageType);
        };

        // Data
        const storageData = JSON.parse(window.sessionStorage.getItem('data'));
        if (storageData == null) {
            setData(defaultMovies);
            console.log("IF storageData: ")
        } else {
            setData(storageData);
            console.log("ELSE storageData: ")
        };

        },[]);
    };
    sessionStorageLoad();

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
        if(debouncedSearch == null || debouncedSearch.length < 3){
            setData(defaultMovies);
            setMaxPage(1);
            setAnzahl(10);
            setergebnisVon(1);
            setErgebnisBis(10);
            // leeren Eintrag speichern bei defaultMovies
            // Alternativ direkt in den "x" Button integrieren
            window.sessionStorage.setItem('keyword','');
            window.sessionStorage.setItem('year','');
            return;
        };

        // if(debouncedYear == null || (debouncedYear.length < 4 && debouncedYear.length > 0)){
        //     return;
        // };

        // Fetchfunktion der Filmdatenbank
        async function fetchData(){

            //Film Array vorher leeren um den Fehler durch doppelte Filme (in der omDB) mit Seitenwechsel zu umgehen
            setData("");

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

    // beim verlassen der Seite aufrufen
    return() => {      
        // keyword und Seite in storage speichern
        window.sessionStorage.setItem('keyword',keyword);
        window.sessionStorage.setItem('page',page);
        window.sessionStorage.setItem('type',type);
        window.sessionStorage.setItem('data',JSON.stringify(data));
        // year oder leer (bei keinem Jahr) in storage speichern
        if(year == null){
            window.sessionStorage.setItem('year','');
        } else {
            window.sessionStorage.setItem('year',year);
        };
    };
    
    // Abhängigkeit
    }, [debouncedSearch, debouncedYear, type, page])

    if(!data){
        return (
            <Layout title="Filmliste">
            <Filter/>
            <ErgebnisInfo
                anzahl={anzahl}
                page={page}
                maxPage={maxPage}   
                ergebnisVon={ergebnisVon}
                ergebnisBis={ergebnisBis} 
            />
            <LoadingSpinner/>
            </Layout>
        );
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
                setPage={setPage}
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
            <ProduktListe 
                data={data}
            />

        </Layout>
   
    ); // Ende der Return Ausgabe
};
