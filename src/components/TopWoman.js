import React from 'react';
import Navbar from './navbar';
import './general.css';
import { Table } from 'react-bootstrap';

const TopWoman =(props)=>{
    let results = props.rank.filter(item => item.content.sex === "Kobieta").sort((a, b) =>{return a.content.totalFights < b.content.totalFights ? 1 : a.content.totalFights > b.content.totalFights ? -1 : 0})
    console.log(results)
    let place = results.map(item => item.content.totalFights)
    
    return(
        <div className="general-container">
            <Navbar />

            <div className="logo-general"></div>
            <h3 className="general-header">TOP 3 KOBIETY</h3>
            {results.length === 0 ? <h4>Brak danych</h4> :
            <Table striped >
            <thead>
                <tr>
                    <th>MIEJSCE</th>
                    <th>IMIĘ</th>
                    <th>NAZWA KLUBU</th>
                    <th>ILOŚĆ WALK</th>
                    <th>ID</th>
                </tr>
            </thead>
            <tbody>
            {results.map(item => <tr key={item.key} style={{border: 'none'}}>
                                        <td>{place.indexOf(item.content.totalFights)+1}</td>
                                        <td>{item.content.firstName}</td>
                                        <td>{item.content.homeClub}</td>
                                        <td>{item.content.totalFights}</td>
                                        <td>{item.key}</td>
                                    </tr> ).slice(0, 3)}
            </tbody>
        </Table>}
        </div>
    );
}

export default TopWoman;