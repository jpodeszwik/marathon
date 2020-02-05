import React from 'react';
import Navbar from './navbar';
import './general.css';
import './Schedule.css';
import { Table } from 'react-bootstrap';

const Schedule =()=>{
    
    
    return(
        <div className="general-container">
            <Navbar />

            <div className="logo-general"></div>
            <h3 className="general-header">HARMONOGRAM</h3>

            <h3 className="gold head">2.02.2019 SOBOTA</h3>
            <Table>

                <tbody>
                    <tr>
                        <td className="gold">9:00</td><td>Start rejestracji</td>
                    </tr>
                    <tr>
                        <td className="gold">10:00</td><td>Start Maratonu</td>
                    </tr>
                    <tr>
                        <td className="gold">12:00 - 15:00</td><td>Fizjolab - fizjoterapia</td>
                    </tr>
                    <tr>
                        <td className="gold">12:00 - 12:45</td><td>Judo i BJJ, dzieci w wieku 4-6 lat</td>
                    </tr>
                    <tr>
                        <td className="gold">12:45 - 13:30</td><td>Judo i BJJ dzieci w wieku 7 lat +</td>
                    </tr>
                    <tr>
                        <td className="gold">14:00</td><td>Wizyta RedBull, rozdanie napojów</td>
                    </tr>
                    <tr>
                        <td className="gold">16:00</td><td> Trening Animal Flow</td>
                    </tr>
                    
                    <tr>
                        <td className="gold">19:00</td><td>Seminarium No-gi z Mateuszem Szczecińskim</td>
                    </tr>
                </tbody>
            </Table>
            <h3 className="gold head">3.02.2019 NIEDZIELA</h3>
            <Table>
              
                <tbody>
                    <tr>
                        <td className="gold">8:00</td><td>Poranna joga z Martą Szulc</td>
                    </tr>
                    <tr>
                        <td className="gold">10:00</td><td>Zakończenie maratonu</td>
                    </tr>
                    <tr>
                        <td className="gold head">10:15</td><td>Podsumowanie i wyniki</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default Schedule;