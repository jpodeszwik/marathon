import React from 'react';
import Navbar from './navbar';
import './general.css';
import './Schedule.css';
import { Table } from 'react-bootstrap';


const parseLine = line => {
    const parts = line.split(' - ');

    const time = parts.slice(0, -1).join(' - ');
    const event = parts[parts.length - 1];

    return  <tr>
        <td className="gold">{time}</td><td>{event}</td>
    </tr>
};

const staturday = `9:00 - Start rejestracji
10:00 - Rozpoczęcie maratonu
10:30 - 11:30 - Trening dla dzieci BJJ i JUDO Sekcja Sport
11:00 - 19:00 - Wizyta Fizjolab
14:00 - 16:00 - Analiza składu masy ciała Fit Klub Trójmiasto
20:00 - 21:00 - Seminarium Bartek "Silnoręki" Łukaszewicz`.split('\n')
    .map(parseLine);

const sunday = `8:00 - 8:45 - Poranna joga z Mają
10:00 - Zakończenie maratonu
10:15 - Podsumowanie i ogłoszenie wyników`.split('\n')
    .map(parseLine);


const Schedule = () =>{
    
    return(
        <div className="general-container">
            <Navbar />

            <div className="logo-general"></div>
            <h3 className="general-header">HARMONOGRAM</h3>

            <h3 className="gold head">8.02.2020 SOBOTA</h3>
            <Table>
                <tbody>
                    {staturday}
                    <tr><td colSpan={2}>Przez cały czas trwania maratonu dostępny będzie catering Wilczy Głód</td></tr>
                </tbody>
            </Table>
            <h3 className="gold head">9.02.2020 NIEDZIELA</h3>
            <Table>
                <tbody>
                    {sunday}
                </tbody>
            </Table>
        </div>
    );
}

export default Schedule;