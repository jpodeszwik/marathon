import React from 'react';
import { Table } from 'react-bootstrap';
import './general.css';
import Navbar from './navbar';

const TopFive =(props)=>{
    let results = props.rank.sort((a, b) =>{return a.content.totalFights < b.content.totalFights ? 1 : a.content.totalFights > b.content.totalFights ? -1 : 0}).map(item => item.content.totalFights)
    // let top = results.slice(0, 5)
    
    
    
    return(
        <div className="general-container">
            <Navbar />

            <div className="logo-general"></div>
            <h3 className="general-header">TOP 5 UCZESTNIKÓW</h3>
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
                {props.rank.map(item => <tr key={item.key} style={{border: 'none'}}>
                                            <td>{results.indexOf(item.content.totalFights)+1}</td><td>{item.content.firstName}</td>
                                            <td>{item.content.homeClub}</td><td>{item.content.totalFights}</td>
                                            <td>{item.key}</td>
                                        </tr> ).slice(0, 5)}
                </tbody>
            </Table>
        </div>
    );
}

export default TopFive;