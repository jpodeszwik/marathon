import React from 'react';
import './general.css';
import './Info.css';
import Navbar from './navbar';

const regulamin = `ORGANIZATOR
1. Organizatorem 24h Maratonu BJJ jest Klub Sportowy Złomiarz Team.
2. Biuro imprezy: Klub Sportowy Złomiarz Team, Gdańsk, ul. Słowackiego 4
3. Osoba kontaktowa: Adam Górny (691 839 697) 

CEL
1. Popularyzacja sportów walki - brazylijskiego jiu-jitsu i dobra zabawa.
2. Promocja zdrowego stylu życia.
3. Promocja Klubu Sportowego Złomiarz Team.
4. Zbiórka pieniędzy na rzecz Fundacji Pomorze Dzieciom.

TERMIN, MIEJSCE 
1. Maraton rozpocznie się 8 lutego 2020 o godz. 10.00. Zakończenie planowane jest na 9 lutego 2020, godzina 10.00
2. Miejsce: Akademia Wychowania Fizycznego i Sportu im. Jędrzeja Śniadeckiego, ul. Kazimierza Górskiego 1.
3. Czas trwania: 24 godziny.
4. Uczestnicy stoczą 5 minutowe sparingi bez przerw w czasie 24 godzin trwania imprezy. Nowi uczestnicy mogą dołączać do sparingów tylko na początku każdej rundy (co 5 minut). Dołączenie w połowie trwającej walki nie zostanie zaliczone do rankingu. 

WARUNKI UCZESTNICTWA
1. Udział w Maratonie jest otwarty dla wszystkich.
2. Wpisowe uprawniające do nadania numeru startowego wynosi 30 zł. Dzieci 10 zł.
3. Warunkiem dopuszczenia do uczestnictwa w imprezie jest złożenie przed startem przez uczestnika (w przypadku osób niepełnoletnich - przez opiekuna prawnego/rodzica) pisemnego oświadczenia o stanie zdrowia pozwalającym na uczestnictwo w imprezie sportowej (druk do pobrania w biurze imprezy lub do pobrania ze strony wydarzenia w portalu Facebook). 
4. Osoby poniżej 18 roku życia muszą posiadać pisemną zgodę rodziców na udział w imprezie (druk do pobrania w biurze zawodów lub na stronie wydarzenia w portalu Facebook).
5. Każdy uczestnik otrzyma numer startowy. Na jego podstawie kolejne walki zaliczane będą do rankingu. Numer startowy posłuży również podczas losowania nagród. 
6. Uczestnik imprezy wyraża zgodę na przetwarzanie swoich danych osobowych oraz wizerunku i zdjęć dla potrzeb związanych z organizacją i promocją imprezy.
8. Każdy uczestnik zobowiązany jest do zapoznania się z regulaminem imprezy, a w przypadku udziału w Maratonie do jego akceptacji.
9. Zabrania się wnoszenia na imprezę przedmiotów, które mogą być niebezpieczne dla innych Uczestników.
12. Weryfikacja uczestników i wydawanie numerów startowych odbywać się będzie 8 lutego 2020 od godziny 9.00.
13. Organizator ustala limit osób jednorazowo przebywających na macie i toczących sparingi na 120 osób (60 par).
14. Maraton trwa dopóty, dopóki na macie znajduje przynajmniej jedna walcząca para uczestników. Jeśli w danej 5-cio minutowej rundzie na macie nie pojawi się przynajmniej jedna para Maraton zostanie zakończony. 
15. Zgłoszenie/rejestracja musi nastąpić minimum 20 minut przed pierwszą walką u osoby rejestrującej uczestników wydarzenia.

ZGŁOSZENIA / REJESTRACJA
1. Zgłoszenia będą przyjmowane w dniu imprezy od godziny 9.00. 
2. Zgłoszenia można dokonać w dowolnej chwili trwania imprezy. Rozpoczęcie rejestracji 8 lutego 2020 9.00. Zakończenie rejestracji 9 lutego 2020 o godzinie 9.35.

POSTANOWIENIA KOŃCOWE
1. Organizator zastrzega sobie prawo do zmian w regulaminie, o których zobowiązuje się poinformować wszystkich uczestników przed rozpoczęciem imprezy.
2. Aktualizacje regulaminu, bieżące ogłoszenia dostępne będą na stronie wydarzenia w portalu Facebook. 
3. Wyniki końcowe, nazwiska zwycięzców opublikowane zostaną na stronie wydarzenia w portalu Facebook. 
4. Prawo interpretacji niniejszego regulaminu przysługuje jedynie Organizatorowi.
5. Organizator udostępnia zawodnikom prysznice oraz do przebrania pomieszczenie szatni bez możliwości pozostawienia w niej rzeczy osobistych (kosztowności, dokumenty, dolary, diamenty)
6. Organizator nie ponosi odpowiedzialności za rzeczy pozostawione, zagubione na terenie obiektu.
7. Organizator nie ubezpiecza uczestników od NNW. Ubezpieczenie pozostaje w gestii osób biorących udział w imprezie.`;

const sections = regulamin.split('\n\n').map(section => {
    const lines = section.split('\n');
    return {
        header: lines[0],
        lines: lines.slice(1)
    };
});


const Info = (props) => {  
    return(
        <div className="general-container">
            <Navbar />

            <div className="logo-general"></div>
            <h3 className="general-header"><p className="list-title">REGULAMIN</p></h3>
            <ul className="info-list">
                {sections.map(section => 
                    <li>
                        <p className="list-title">{section.header}</p><br/>
                        {section.lines.map(line => <>{line}<br/></>)}    
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Info;