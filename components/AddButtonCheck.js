import {keys, set} from './indexedDB';
import {useState} from "react";

export default function AddButtonCheck({imdbID, Title, Year, Poster}){
    // Alle Keys der IndexedDB
    const [allKeys, setAllKeys] = useState("");

        // Keys aus IndexedDB lesen und speichern
        async function keysLesen(){
            setAllKeys(await keys().then((keys)=>keys));
        };
        keysLesen();

        // gibt true oder false zurück
        let idCHeck = allKeys.includes(imdbID);
        
        // wenn id in der indexedDB ist
        if (idCHeck === true) {
            return(
                <>
                    <button id = "add" disabled="disabled">gespeichert</button>
                </>
            );
        } else {
            return(
                <>
                    <button id = "add"
                    onClick={() => dataSpeichernDB(Title, Year, imdbID, Poster)}>hinzufügen</button>
                </>
            );
        };
};

// Funktion zum Speichern des Filmes in die IndexedDB
function dataSpeichernDB(Title, Year, imdbID, Poster, Type){
    const indexedDBdata = {Title, Year, imdbID, Poster, Type};
    set(imdbID,indexedDBdata);
};