import Layout from '../components/Layout';
import Link from "next/link";
import {useState, useEffect} from "react";
import { useToggle } from "../hooks/useToggle";
import Parser from 'rss-parser';


// globalen Hilfsvariablen initialisieren
let sound, sliderUpdate;

// Hilfsfunktion
function el(css){
    return document.querySelector(css);
};

export async function getStaticProps() {
    const parser = new Parser();
    let feed = [];

    // Begin Try
    try {
        // Fetch mit fester RSS-Feed Adresse
        feed = await parser.parseURL('https://media.rss.com/filmmein/feed.xml');

        // Fehlerausgabe falls nicht news (wenn news leer)
        if (!news) {
            throw new Error("Fehler beim Laden der Daten!");
        };

    // Ende Try / Catch
    } catch (error) {
        // Fehlerausgabe
        console.log("FEHLER :",error);
    };

    return {
        props: {
            feed:feed.items
        },
        revalidate: 600,
    };
};

export default function news({feed}) {

    const [maxDuration, setMaxDuration] = useState(0);
    // const [volume, setvolume] = useState(50)
    const [audioTitel, setAudioTitel] = useState("");
    const [audioURL, setAudioURL] = useState("");
    const [audioTime, setAudioTime] = useState(0);
    const [isPause, togglePause] = useToggle(false, sound);
    // "Weiterhören" Button anzeigen / ausblenden
    const [audioResume, setAudioResume] = useState(false);

    useEffect(() => {  

    // Variablen aus der Localstorage holen und speichern
    const storageAudio = window.localStorage.getItem('audioURL');
    if (storageAudio == null) {
        console.log("Kein altes Audio vorhanden")
    } else {
        const storageAudioTitle = window.localStorage.getItem('audioTitle');
        const storageAudioTime = window.localStorage.getItem('audioTime');
        const storageAudioMaxDuration = window.localStorage.getItem('audioMaxDuration');
        setAudioTitel(storageAudioTitle);
        setAudioURL(storageAudio);
        setAudioTime(storageAudioTime);
        setMaxDuration(storageAudioMaxDuration);
        setAudioResume(true);
    };
    
    // Stop Audio Funktion beim verlassen der Seite aufrufen
    return() => {      
        stopAudio(sound, sliderUpdate)
        sound = "";
    };

    // wird beim Start der Seite ausgeführt
    },[]);

    return (
        <Layout title="Podcast">
                <div className="Audio_Elemente">
                    <p>{audioTitel}</p>
                    <p id="currenttime"></p>

                    <p>
                        {/* Pause Switch  */}
                        <button  onClick = {togglePause}>
                            {isPause ? "Play" : "Pause"}
                        </button>
                        {/* Podcast weiterhören - wird nur beim Start angezeigt */}
                        {audioResume ? 
                            <button onClick={() => {
                                resumeAudio(audioURL, audioTime);
                                setAudioResume(false);
                            }}>
                                Weiterhören
                            </button> 
                            : 
                            ""}
                    </p>

                    <input type="range" max={maxDuration} min="0" 
                        value="0" className="audioslider" id="audiotime"
                    />
                    {/* <p>
                        <label id="volume" htmlFor="volumeslider">Lautstärke</label>
                        <input type="range" id="slidervolume" max="100" min="0" 
                            value="50" className="volumeslider"/>  
                    </p> */}
                </div>
                {/* News durchgehen und Elemente anzeigen */}
                {feed.map(({title, link, pubDate, enclosure, itunes}) => (

                    <dl className="rss_news" key={link}>
                        <Link href={link}>   
                        <dt className="rss_title">             
                            <h4>{title}</h4>
                        </dt>
                        </Link>
                        <dd className="rss_content_audio">
                            <p>
                                {/* Play Audio Button mit Switch, falls Pause ist */}
                                <button id="play_audio" onClick={() => 
                                {
                                    if(isPause===true)
                                    {
                                        togglePause(true);
                                    };
                                    playAudio(enclosure.url);
                                    setMaxDuration(itunes.duration);
                                    setAudioTitel(title);
                                    window.localStorage.setItem('audioTitle',title);
                                    window.localStorage.setItem('audioURL',enclosure.url);
                                    window.localStorage.setItem('audioMaxDuration',itunes.duration);
                                }}
                                >Play</button>
                            </p>
                            <p>
                                {(new Date(pubDate)).getDate()}.
                                {(new Date(pubDate)).getMonth()+1}.
                                {(new Date(pubDate)).getFullYear()}
                            </p>
                        </dd>
                        <hr/>
                    </dl> 
                ))}
        </Layout>
    );
};


function stopAudio(sound, sliderUpdate){
    // Prüfen ob Sound (Sonst fehlermeldung)
    if (sound){
        // Sound und SetIntervall (Slider) stoppen
        sound.pause();
        clearInterval(sliderUpdate);
        // Zeit in localStorage speichern
        window.localStorage.setItem('audioTime',sound.currentTime);
    };
};

function playAudio(audioData){
    stopAudio(sound, sliderUpdate);
    // Sound abspielen
    sound = new Audio();
    sound.src = audioData;
    sound.play();
    sound.volume = 0.5;

    // Render Funktion für den Slider Balken
    render(sound);
};

function resumeAudio(audioURL, audioTime){
    playAudio(audioURL);
    sound.currentTime = audioTime;
};

function render(audioData){
    // EventListener für den Slider für Vorspulen etc.
    el('#audiotime').addEventListener('input',function(){
        audioData.currentTime = audioData.duration-Number(this.value);
    });

    // el('#slidervolume').addEventListener('input',function(){
    //     audioData.volume = Number(this.value)/100;
    //     console.log(audioData.volume)
    //     console.log(Number(this.value))
    // });

    // audioData.volume = Number(slidervolume.value)/100;

    // Hilfsvariablen für Laufzeit initialisieren
    let songVerbleibendDuration, songGesamtDuration, dauerVerbleibend; 

    function timer(){
        sliderUpdate = setInterval(function(){
            // Zeit Elemente berechnen und aneigen
            songVerbleibendDuration = audioData.duration-audioData.currentTime;
            songGesamtDuration = Math.floor(audioData.duration/60) + 'min ' + Math.floor((audioData.duration%60)) + 's';
            dauerVerbleibend = Math.floor(songVerbleibendDuration/60) + 'min ' + Math.floor((songVerbleibendDuration%60)) +'s';
            el('#audiotime').value = songVerbleibendDuration;
            el('#currenttime').innerHTML = `${dauerVerbleibend} / ${songGesamtDuration}`;
            // Aktualisierung in ms
        },100)
    };
    timer();
};





