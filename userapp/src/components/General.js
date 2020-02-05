import React from 'react';
import Navbar from './navbar';
import './general.css';
import { Table } from 'react-bootstrap';

const General =(props)=>{
    let results = props.rank.length > 1 ? props.rank.sort((a, b) =>{return parseInt(a.key) > parseInt(b.key) ? 1 : parseInt(a.key) < parseInt(b.key) ? -1 : 0}) :
                [{key: "0" , content: { firstName: "BRAK DANYCH", homeClub: "BRAK DANYCH", totalFights: "BRAK DANYCH"}}]
    
    let place = props.rank.length > 1 ? results.map(item => item.content.totalFights).sort((a, b) =>{return a < b ? 1 : a > b ? -1 : 0}) :
    [0]
    
    return(
        <div className="general-container">
            <Navbar />

            <div className="logo-general"></div>
            <h3 className="general-header">RANKING OGÓLNY</h3>
            <Table striped >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>IMIĘ</th>
                        <th>NAZWA KLUBU</th>
                        <th>ILOŚĆ WALK</th>
                        <th>MIEJSCE</th>
                    </tr>
                </thead>
                <tbody>
                {results.map(item => <tr key={item.key} style={{border: 'none'}}>
                                            <td>{item.key}</td>
                                            <td>{item.content.firstName}</td>
                                            <td>{item.content.homeClub}</td>
                                            <td>{item.content.totalFights}</td>
                                            <td>{place.indexOf(item.content.totalFights)+1}</td>
                                            
                                        </tr> )}
                </tbody>
            </Table>
        </div>
    );
}

export default General;