import React from 'react';
import './general.css';
import './Info.css';
import Navbar from './navbar';

const Info =(props)=>{
    
    
    
    
    return(
        <div className="general-container">
            <Navbar />

            <div className="logo-general"></div>
            <h3 className="general-header"><p className="list-title">REGULAMIN</p></h3>
            <ul className="info-list">
                <li> <p className="list-title">ORGANIZATOR</p> <br /> 1. Organizatorem 24 h Maratonu BJJ jest Klub Sportowy Złomiarz Team <br />
                2. Biuro imprezy: Klub Sportowy Złomiarz Team, Gdańsk ul. Słowackiego 4 <br/>
                Osoba kontaktowa: Adam Górny (691-839-697)
                </li>
                <li><p className="list-title">CEL</p> <br/>
                1. Popularyzacja sportów walki - brazylijskiego jiu-jitsu i dobra zabawa. <br />
                2. Promocja zdrowego stylu życia. <br />
                3. Promocja Klubu Sportowego Złomiarz Team <br />
                4. Zbiórka pięniędzy na pomoc w leczeniu Nikodema.
                </li>
                <li>
                    <p className="list-title">TERMIN I MIEJSCE</p> <br />
                1. Maraton rozpocznie się 2 lutego 2019 o godzinie 10:00. Zakończenie planowane jest na 3 lutego 2019, godzina 10:00. <br />
                2. Miejsce: Akademia Wychowania Fizycznego i Sportu im. Jędrzeja Śniadeckiego ul. Kazimierza Górskiego 1. <br />
                3. Czas trwania: 24 godziny. <br />
                4. Uczestnicy stoczą 5 minutowe sparingi bez przerw w czasie 24 godzin trwania imprezy. Nowi uczestnicy mogą dołączać do sparingów tylko na początku każdej rundy (co 5 minut). Dołączenie w połowie trwającej walki nie zostanie zaliczone do rankingu. 
                 
                </li>
                <li>
                <p className="list-title">WARUNKI UCZESTNICTWA</p> <br />
                1. Udział w Maratonie jest otwarty dla wszystkich. <br />
                2. Wpisowe uprawniające do nadania numeru startowego wynosi 30zł. Dzieci 10 zł. <br />
                3. Warunkiem dopuszczenia do uczestnictwa w imprezie jest złożenie przed startem przez uczestnika (w przypadku osób niepełnoletnich - przez opiekuna prawnego/rodzica) pisemnego oświadczenia o stanie zdrowia pozwalającym na uczestnictwo w imprezie sportowej (druk do pobrania w biurze imprezy lub do pobrania ze strony wydarzenia w portalu Facebook). <br />
                4. Osoby poniżej 18 roku życia muszą posiadać pisemną zgodę rodziców na udział w 
imprezie (druk do pobrania w biurze zawodów lub na stronie wydarzenia w portalu Facebook).<br />
                5. Każdy uczestnik otrzyma numer startowy. Na jego podstawie kolejne walki zaliczane będą do rankingu. Numer startowy posłuży również podczas losowania nagród. <br />
                6. Uczestnik imprezy wyraża zgodę na przetwarzanie swoich danych osobowych oraz 
wizerunku i zdjęć dla potrzeb związanych z organizacją i promocją imprezy. <br />
                8. Każdy uczestnik zobowiązany jest do zapoznania się z regulaminem imprezy, a w przypadku udziału w Maratonie do jego akceptacji. <br />
                9. Zabrania się wnoszenia na imprezę przedmiotów, które mogą być niebezpieczne dla innych Uczestników. <br />
                12. Weryfikacja uczestników i wydawanie numerów startowych odbywać się będzie 2 lutego 2019 od godziny 9.00. <br />
                13. Organizator ustala limit osób jednorazowo przebywających na macie i toczących sparingi na 120 osób (60 par). <br />
                14. Maraton trwa dopóty, dopóki na macie znajduje przynajmniej jedna walcząca para uczestników. Jeśli w danej 5-cio minutowej rundzie na macie nie pojawi się przynajmniej jedna para Maraton zostanie zakończony.  <br />
                15. Zgłoszenie/rejestracja musi nastąpić minimum 20 minut przed pierwszą walką u osoby rejestrującej uczestników wydarzenia.
                </li>
                <li>
                <p className="list-title">ZGŁOSZENIA</p> <br />
                1. Zgłoszenia będą przyjmowane w dniu imprezy od godziny 9.00. <br />
                2. Zgłoszenia można dokonać w dowolnej chwili trwania imprezy. Rozpoczęcie rejestracji 2 lutego 2019 9.00. Zakończenie rejestracji 3 lutego o godzinie 9.35.
                </li>
                <li>
                <p className="list-title">POSTANOWIENIA KOŃCOWE</p><br />
                1. Organizator zastrzega sobie prawo do zmian w regulaminie, o których zobowiązuje się poinformować wszystkich uczestników przed rozpoczęciem imprezy. <br />
                2. Aktualizacje regulaminu, bieżące ogłoszenia dostępne będą na stronie wydarzenia w portalu Facebook. <br />
                3. Wyniki końcowe, nazwiska zwycięzców opublikowane zostaną na stronie wydarzenia w portalu Facebook. <br />
                4. Prawo interpretacji niniejszego regulaminu przysługuje jedynie Organizatorowi. <br />
                5. Organizator udostępnia zawodnikom prysznice oraz do przebrania pomieszczenie szatni bez 
możliwości pozostawienia w niej rzeczy osobistych (kosztowności, dokumenty, dolary, diamenty) <br />
                6. Organizator nie ponosi odpowiedzialności za rzeczy pozostawione, zagubione na 
terenie obiektu. <br />
                7. Organizator nie ubezpiecza uczestników od NNW. Ubezpieczenie pozostaje w gestii osób biorących udział w imprezie.
                </li>
            </ul>
        </div>
    );
}

export default Info;