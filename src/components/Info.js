import React from 'react';
import './general.css';
import './Info.css';
import Navbar from './navbar';

const Info =(props)=>{
    
    
    
    
    return(
        <div className="general-container">
            <Navbar />

            <div className="logo-general"></div>
            <h3 className="general-header">REGULAMIN</h3>
            <ul className="info-list">
                <li>ORGANIZATOR <br /> 1. Organizatorem 24 h Maratonu BJJ jest Klub Sportowy Złomiarz Team <br />
                2. Biuro imprezy: Klub Sportowy Złomiarz Team, Gdańsk ul. Słowackiego 4 <br/>
                Osoba kontaktowa: Adam Górny (691-839-697)
                </li>
                <li>CEL <br/>
                1. Popularyzacja sportów walki - brazylijskiego jiu-jitsu i dobra zabawa. <br />
                2. Promocja zdrowego stylu życia. <br />
                3. Promocja Klubu Sportowego Złomiarz Team <br />
                4. Zbiórka pięniędzy na pomoc w leczeniu Nikodema.
                </li>
                <li>
                    TERMIN I MIEJSCE <br />
                1. Maraton rozpocznie się 2 lutego 2019 o godzinie 10:00. Zakończenie planowane jest na 3 lutego 2019, godzina 10:00. <br />
                2. Miejsce: Akademia Wychowania Fizycznego i Sportu im. Jędrzeja Śniadeckiego ul. Kazimierza Górskiego 1. <br />
                3. Czas trwania: 24 godziny. <br />
                 
                </li>
            </ul>
        </div>
    );
}

export default Info;