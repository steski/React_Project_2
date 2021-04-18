export default function ErgebnisInfo({anzahl, page, maxPage, ergebnisVon, ergebnisBis}){

    return(

        <>
            {/* Info für die Ergebnisse */}
            {maxPage > 1 && (<div className="site_info">
                <p id="gesamt">Filme: {anzahl} </p>
                <p id="seite">Seite {page} von {maxPage}</p>
                <p id="ergebnis">Film {ergebnisVon} bis {ergebnisBis}</p>
            </div>)}
        </>
    );
};
