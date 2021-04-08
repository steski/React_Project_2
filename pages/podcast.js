import Layout from '../components/Layout';

import Link from "next/link";
import {useState, useEffect} from "react";
// Bibliothek für RSS Feed
import Parser from 'rss-parser';

export async function getStaticProps() {
    let parser = new Parser();
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

    // use State für die gefetchten RSS-Feed Daten
    // const [news, setNews] = useState([]);
    const [maxDuration, setMaxDuration] = useState(0);
    // const [time, setTime] = useState(0)
    // const [volume, setvolume] = useState(50)
    const [audioTitel, setAudioTitel] = useState("Titel");
    const [pause, setpause] = useState("0");
      

    useEffect(() => {  
    
    // Stop Audio Funktion beim verlassen der Seite aufrufen
    return() => {                                        
        if (sound){
            sound.pause();
            clearInterval(sliderUpdate);
        };
    };

    // wird beim Start der Seite ausgeführt
    },[]);

    // if(!feed){
    //     return <LoadingSpinner/>
    // };

    return (
        <Layout title="Podcast">
            <div>
                <div className="Audio_Elemente">
                    <p>{audioTitel}</p>
                    <p id="currenttime">Zeitanzeige</p>
                    
                    <button id="playpause">Pause</button>

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
                                <button id="play_audio" onClick={() => 
                                {
                                    playAudio(enclosure.url);
                                    setMaxDuration(itunes.duration);
                                    setAudioTitel(title);
                                }}
                                >Play</button>
                            </p>
                            <p>
                                Veröffentlicht: &nbsp;
                                {(new Date(pubDate)).getDate()}.
                                {(new Date(pubDate)).getMonth()}.
                                {(new Date(pubDate)).getFullYear()}
                            </p>

                        </dd>
                        <hr/>
                    </dl>
                    
                ))}
            </div>
        </Layout>
    );
};


// globalen Hilfsvariablen initialisieren
let sound, sliderUpdate;

// Hilfsfunktion
function el(css){
    return document.querySelector(css);
};

let pauseflag = 0;

function playAudio(audioData){
    // Altes Audio Stoppen
    if (sound){
        sound.pause();
        clearInterval(sliderUpdate);
    };

    // Sound abspielen
    sound = new Audio();
    sound.src = audioData;
    sound.play();
    sound.volume = 0.5;

    // Render Funktion für den Slider Balken
    render(sound);

    el('#playpause').addEventListener('click', function(){
        if ( pauseflag === 0){
          sound.pause();
          pauseflag = 1;
          el('#playpause').innerHTML = "Play";
        }
        else{
          sound.play();
          pauseflag = 0;
          el('#playpause').innerHTML = "Pause";
        };
      });
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

    // Hilfsvariablen initialisieren
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





