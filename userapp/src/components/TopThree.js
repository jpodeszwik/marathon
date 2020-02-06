import React from 'react';
import Navbar from './navbar';
import './general.css';
import { Table } from 'react-bootstrap';

const TopThree = (props) => {
    let results = props.rank.length > 1 ? props.rank.filter(props.filter).sort((a, b) =>{return (b.content.totalFights || 0) - (a.content.totalFights || 0)} ) :
    [{key: "0" , content: { firstName: "BRAK DANYCH", homeClub: "BRAK DANYCH", totalFights: "BRAK DANYCH"}}]
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

export default TopThree;