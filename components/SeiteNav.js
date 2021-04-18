export default function SeiteNav({maxPage, page, seiteZurueck, seiteVor, setPage, anzahl}){

    return(

        <>
            {/* Seiten Navigation */}
            {maxPage > 1 && (<div className="site_buttons">
                {/* Seite zurück */}
                <button 
                    id="back"
                    onClick={seiteZurueck}
                    type="button"
                    disabled={page === 1}
                >
                    &#8592;
                </button>

                {/* Seite 1 */}
                <button 
                    id="backback"
                    onClick={() => setPage(1)}
                    type="button"
                    disabled={page === 1}
                >
                    &#8592;&#8592;
                </button>

                {/* Seite Vor */}
                <button 
                    id="forward"
                    onClick={seiteVor}
                    type="button"
                    disabled={page === (Math.ceil(anzahl/10))}
                >
                    &#8594;
                </button>
            </div>)}
        </>
    );
};