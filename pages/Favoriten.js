
import Layout from '../components/Layout';
import MerkListe from "../components/MerkListe";
import LoadingSpinner from "../components/LoadingSpinner";
// getMany (Alles Anzeigen) und Keys (Schlüssel) von IndexedDB werden benötigt
import {getMany, keys} from '../components/indexedDB';
import {useState, useEffect} from "react";

export default function MerkSeite() {

    // gelesene Daten aus indexedDB
    const [dataIndexedDB, setDataIndexedDB] = useState([]);
    // Gesamtanzahl der gefundenen Einträge
    const [anzahlIndexedDB, setAnzahlIndexedDB] = useState(0);

    useEffect(() => {

        // Alle Inhalte von allen Keys in der IndexedDB lesen und speichern
        async function keysLesen(){
            const allKeys = await keys().then((keys)=>keys);
            const allTogether = await getMany(allKeys);
            setAnzahlIndexedDB(allTogether.length);
            setDataIndexedDB(allTogether);

        };
        // obige Funktion aufrufen
        keysLesen();

    },[]);
    
    if(!dataIndexedDB){
        return <LoadingSpinner/>
    };

    return (
        <Layout title="Favoriten">
            {anzahlIndexedDB > 1 && (<p>{anzahlIndexedDB} gespeicherte Filme vorhanden</p>)}
            {anzahlIndexedDB === 1 && (<p>{anzahlIndexedDB} Film vorhanden</p>)}
            {anzahlIndexedDB < 1 && (<p>Kein Film vorhanden</p>)}
            {/* Filme übergeben, hier ist das map drin */}
            <MerkListe 
                data={dataIndexedDB} 
                setDataIndexedDB={setDataIndexedDB}
                anzahlIndexedDB={anzahlIndexedDB}
                setAnzahlIndexedDB={setAnzahlIndexedDB}
            />
        </Layout>
    );
};