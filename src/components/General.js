import React from 'react';
import Navbar from './navbar';
import './general.css';
import { Table } from 'react-bootstrap';

const General =(props)=>{
    let results = props.rank.sort((a, b) =>{return a.content.totalFights < b.content.totalFights ? 1 : a.content.totalFights > b.content.totalFights ? -1 : 0}).map(item => item.content.totalFights)
    console.log(results)
    
    return(
        <div className="general-container">
            <Navbar />

            <div className="logo-general"></div>
            <h3 className="general-header">RANKING OGÓLNY</h3>
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
                                        </tr> )}
                </tbody>
            </Table>
        </div>
    );
}

export default General;