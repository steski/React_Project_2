// Alle Filter Parameter werden hier übergeben
// immer die Variable und die dazugehöre Set-Funktion
export default function Filter({
    keyword,
    setKeyword,
    year,
    setYear,
    type,
    setType,
    setPage
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
                    <label htmlFor="keyword">Suchbegriff</label>
                    <input 
                        type="text" 
                        id="keyword" 
                        value={keyword} 
                        onChange={(e) => setKeyword(e.target.value)}
                    />

                    {/* Button zum Zurücksetzen  */}
                    <button
                        onClick={() => {setKeyword("");setYear("");setPage("")}}
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
                    <label htmlFor="year">Jahr</label>
                    <input 
                        type="text" 
                        id="year" 
                        value={year} 
                        onChange={(e) => setYear(e.target.value)}
                    />

                    {/* Button zum Zurücksetzen  */}
                    <button
                        onClick={() => setYear("")}
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
                        onChange={(e) => 
                        setType(e.target.value)}/>
                </div>
                <div>    
                    <label htmlFor="series">Serien</label>
                    <input type="radio" id="series" name="type" value="series"
                        checked={type==="series"}
                        onChange={(e) => 
                        setType(e.target.value)}/>
                </div>
            </fieldset>               
        {/* Ende Form zur Eingabe der Suchparameter */}
        </form>
    // Ende Return
    );  
};