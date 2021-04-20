import Layout from '../components/Layout';
import ProduktListe from "../components/ProduktListe";
import Filter from '../components/Filter';
import ErgebnisInfo from '../components/ErgebnisInfo';
import SeiteNav from '../components/SeiteNav';
import LoadingSpinner from "../components/LoadingSpinner";

import { useDebouncedValue } from "../hooks/useDebouncedValue";
import {useState, useEffect} from "react";

export default function ProduktSeite() {

    // gefetchte Daten
    const [data, setData] = useState([])
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
    // bricht suche ab bei True, wird in Filterprüfung gesetzt
    const [abbruch, setAbbruch] = useState(false);
    // Seite 1 Anzeigen bei Änderung der Suchparameter
    const [pageReset, setPageReset] = useState(false);
    // Wenn keine Filme gefunden wurden
    const [noResult, setnoResult] = useState(false);

    /*
    Funktion für sessionStorage
    Bei Deployment (vercel) gibt es Fehlermeldung mit window not definied
    ursprünglich wurde sessionStorage direkt im UseState geladen
    Wird nun hier geladen mit überprüfung, ob im Storage bereits etwas drin ist
    Ebenfalls überprüfung ob window null ist
    */
    const sessionStorageLoad = () => {
        // UseEffect, damit es nur beim Aufruf aufgerufen wird
        useEffect(() => {
            const storageKeyword = window.sessionStorage.getItem('keyword');
            if (storageKeyword == null) {
                setKeyword("");
            } else {
                setKeyword(storageKeyword);
                setYear(window.sessionStorage.getItem('year'));
                setType(window.sessionStorage.getItem('type'));
                setPage(window.sessionStorage.getItem('page'));
                setAnzahl(window.sessionStorage.getItem('anzahl'));
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

    /* Seite 1 Anzeigen, Bei Eingabeänderung
    Bei Änderung der Suchparameter ändert sich die Anzahl der Ergebnisse */
    useEffect(() => {
        if (pageReset == true) {
            setPage(1);
        };
    },[anzahl]);

    useEffect(() => {

        // Weniger als 3 Buchstaben wird von der API nicht unterstützt
        // somit nichts angezeigt und Elemente zurückgesetzt
        // Durch setAbbruch sind die anderen Bedingen evtl Obsolet -> Testen
        if(debouncedSearch == null || debouncedSearch.length < 3 || abbruch === true){
            // Damit Ergebnisinfo nicht mehr angezeigt wird
            setMaxPage(0);
            // damit "keine Film gefunden" angezeigt wird
            setnoResult(true);
            // damit Loadingspinner nicht angezeigt wird
            setData([]);
            // leeren Eintrag speichern bei keinen ergebnissen
            // Alternativ direkt in den "x" Button integrieren
            window.sessionStorage.setItem('keyword','');
            window.sessionStorage.setItem('year','');
            return;
        };

        // Nur 4 Stellige Jahreszahlen werden durchgelassen
        if(debouncedYear == null || (debouncedYear.length < 4 && debouncedYear.length > 0)){
            return;
        };
        if(debouncedYear == null || debouncedYear.length > 4){
            return;
        };

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
                    // Informationen für Ergebnisinfo.js ermitteln
                    setAnzahl(moviesData.totalResults);
                    setMaxPage(Math.ceil(moviesData.totalResults/10));
                    setergebnisVon(page*10-9);
                    if(page*10>moviesData.totalResults){
                        setErgebnisBis(moviesData.totalResults);
                    } else {
                        setErgebnisBis(page*10);
                    };

                // Falls keine Filme vorhanden sind
                } else {
                    // Damit Ergebnisinfo nicht mehr angezeigt wird
                    setMaxPage(0);
                    // damit "keine Film gefunden" angezeigt wird
                    setnoResult(true);
                    // damit Loadingspinner nicht angezeigt wird
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
        window.sessionStorage.setItem('anzahl',anzahl);
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
            {/* Filter mit übergabevariablen*/}
            <Filter 
                keyword={keyword}
                year={year}
                type={type}
                setAbbruch={setAbbruch}
                setPageReset={setPageReset}
                data={data}
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
                setAbbruch={setAbbruch}
                setPageReset={setPageReset}
                data={data}
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
            { noResult && (<h2>Keine Filme gefunden</h2>)}

            {/* Filme übergeben, hier ist das map drin */}
            <ProduktListe 
                data={data}
            />
        </Layout>
    ); // Ende der Return Ausgabe
};
