// Alle Filter Parameter werden hier übergeben
// immer die Variable und die dazugehöre Set-Funktion
export default function Filter({
    keyword,
    setKeyword,
    year,
    setYear,
    type,
    setType,
    setAbbruch,
    setPageReset
}) {
    // Beginn Return
    return (

        // Unterbinden des Standartverhaltens (Enter) des Browsers
        // Start der Form zum Wähen der Suchparameter
        <form className="filter" onSubmit={(e) => e.preventDefault()}>
            <fieldset className="fieldset">
                <legend>Filmsuche</legend>

                {/* Suchbegriff Eingabefeld */}
                <div>
                    {/* input Element für Keyword-Suche */}
                    {/* <label htmlFor="keyword" className="keyword_label">{keywordLabel}</label> */}
                    <KeyWordLabelCheck 
                        keyword={keyword}
                        setAbbruch={setAbbruch}
                    />
                    <input 
                        type="text" 
                        id="keyword" 
                        value={keyword} 
                        onChange={(e) => {setKeyword(e.target.value);setPageReset(true);}}
                    />

                    {/* Button zum Zurücksetzen  */}
                    <button
                        onClick={() => {setKeyword("");setYear("");setAbbruch(true)}}
                        type="button"
                        disabled={keyword === ""}
                    >
                        {/* HTML X (eigentlich mal Zeichen) */}
                        &times;
                    </button>
                </div>
                {/* // ENDE  Keyword Suche */} 

                {/* Suchbegriff Jahreszahl */}
                <div>
                    {/* input Element für Jahreszahl-Suche */}
                    {/* <label htmlFor="year">{yearLabel}</label> */}
                    <YearLabelCheck year={year}/>
                    <input 
                        type="text" 
                        id="year" 
                        value={year} 
                        onChange={(e) => {setYear(e.target.value);setPageReset(true);}}
                    />

                    {/* Button zum Zurücksetzen  */}
                    <button
                        onClick={() => {setYear("")}}
                        type="button"
                        disabled={year === ""}
                    >
                       &times;
                    </button>

                {/* // Ende Jahr */}
                </div> 

                {/* Suche Film oder Serie */}
                <div>
                    <label htmlFor="movie">Filme</label>
                    <input type="radio" id="movie" name="type" value="movie"
                        checked={type==="movie"}
                        onChange={(e) => {setType(e.target.value);setPageReset(true);}}/>
                </div>
                <div>    
                    <label htmlFor="series">Serien</label>
                    <input type="radio" id="series" name="type" value="series"
                        checked={type==="series"}
                        onChange={(e) => {setType(e.target.value);setPageReset(true);}}/>
                </div>
            </fieldset>               
        {/* Ende Form zur Eingabe der Suchparameter */}
        </form>
    // Ende Return
    );  
};

// Regulärer Ausdruck für keyword
const reg = new RegExp("^([a-z A-ZäöüÄÖÜß0-9]){3,20}$");

// Suchbegriff Check mit Ausgabe im Label und setAbbruch
function KeyWordLabelCheck({keyword, setAbbruch}){
    if (keyword.match(reg) || keyword.length === 0){
        setAbbruch(false);
        return <label htmlFor="keyword" className="keyword_label">Suchbegriff</label>      
    } else {
        setAbbruch(true);
        return  <label htmlFor="keyword" className="keyword_label_wrong">ungültiger Suchbegriff</label>
    };
};

// Jahr Check mit Ausgabe im Label
// Abbruch nicht notwendig, da Jahr optional ist
function YearLabelCheck({year}){
    if (year === ""){
        return <label htmlFor="year" className="year_label">Jahr</label>
    }
    else if (year.length > 4 || year > 2040 || year < 1900) {
        return <label htmlFor="year" className="year_label_wrong">ungültiges Jahr</label>
    } else {
        return  <label htmlFor="year" className="year_label">Jahr</label>
    };
};

