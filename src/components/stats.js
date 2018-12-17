import React, { Component } from 'react';
import './Stats.css';
import { Table, FormControl, Grid, Row, Col } from 'react-bootstrap';
 
class Stats extends Component{
    constructor(props){
        super(props);
        this.state = {
            userId: "",
            userNumber: ""
        }
    }

    handleChange=(event)=>{
        
        this.setState({userId: event.target.value})
    }

    handleSubmit=(event)=>{
        
        this.setState({userNumber: this.state.userId,
        userId: ""});
        event.preventDefault();
        
    }
    render(){
        return(
        
            <Grid>

                <Row className="nav-row">
                    <Col sm={10} smOffset={1}>
                        <form onSubmit={this.handleSubmit}>
                        <FormControl 
                            value={this.state.userId}
                            placeholder="podaj nr zawodnika"
                            onChange={this.handleChange}

                        />
                        </form>
                    </Col>
                </Row>
            
                <Row className="nav-row">
                    <Col sm={10} smOffset={1}>
                    
                        {<h5 className="info-header">Zawodnik z numerem {this.state.userNumber === "" ? "X" : this.state.userNumber} stoczyl {this.props.state.filter(item => item.content[this.state.userNumber] === 1).length} walk</h5>}
                      
                    </Col>
                </Row>
           
                <Row className="nav-row">
                    <Col sm={10} smOffset={1}>
                    
                    <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Data i godzina rundy</th>
                    </tr>
                    
                    {this.props.state.filter(item => item.content[this.state.userNumber] === 1).map( (i, index) => <tr key={i.key}><td>{index + 1}</td><td>{i.key}</td></tr>)}
                    
                </thead>
            </Table>
                      
                    </Col>
                </Row>
            
    
           </Grid>
        );
    }
    }
    

export default Stats;