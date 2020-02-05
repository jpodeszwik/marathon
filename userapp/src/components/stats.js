import React, { Component } from 'react';
import './Stats.css';
import { Table, FormControl, Grid, Row, Col, Button } from 'react-bootstrap';

 
class Stats extends Component{
    constructor(props){
        super(props);
        this.state = {
            userId: "",
            userNumber: "",
            champ: ""
        }
    }

    handleChange=(event)=>{
        
        this.setState({userId: event.target.value})
    }

    handleSubmit=(event)=>{
        
        this.setState({userNumber: this.state.userId,
        userId: ""});
        console.log(this.state)
        console.log(this.props.rank)
        console.log(this.props.rounds.filter(round => round.key === "55")[0].content)
        console.log(this.props.rank.filter(item => item.key === "55")[0].content.totalFights)
        event.preventDefault();
        
    }

    handleTop=()=>{
        const winner = this.props.rank.map( item => item.content.totalFights )
        const nr = Math.max(...winner)
        const champ = this.props.rank.filter(item => item.content.totalFights === nr).map(item => item.key)
        this.setState({ champ: champ})
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
    
                            {<h5 className="info-header">Zawodnik z numerem {this.state.userNumber === "" ? "X" : this.state.userNumber} stoczyl {
                                this.state.userNumber === "" ? "zero" :
                                this.props.rank.filter(item => item.key === this.state.userNumber).length === 0 ? null :
                                this.props.rank.filter(item => item.key === this.state.userNumber)[0].content.totalFights
                            } walk</h5>}
      
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
                                </thead>
                                <tbody>
                                    
                                
                                    {this.state.userNumber === "" ? null : 
                                    this.props.rounds
                                        .filter( round => round.key === this.state.userNumber).length === 0 ? null :
                                    Object.keys(this.props.rounds
                                        .filter( round => round.key === this.state.userNumber)[0].content)
                                        .map((key, index) => <tr key={index}><td >{index + 1}</td><td>{key}</td></tr>)
                        }
                                
                                </tbody>
                                
                            </Table>  
                            <Button onClick={this.handleTop}>Top</Button>
                            {this.state.champ === "" ? null : <h3>{this.state.champ}</h3>}
      
                        </Col>
                    </Row>


                </Grid>
        
        );
    }
    }
    

export default Stats;