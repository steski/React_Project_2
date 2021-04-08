import Navigation from "./Navigation";

// Header beinhaltet die Navigation
export default function Header() {
    return (
        <header className="site-header">
            <div className="inner-width">
           <h1>Filmdatenbank Projekt React 03/21</h1>
            <Navigation/>
            </div>
        </header>
    );
};
