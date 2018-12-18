import React, { Component } from 'react';
import { Grid, Row, Col, Button, FormGroup, FormControl } from 'react-bootstrap';

class Registration extends Component{
constructor(props){
    super(props);
    this.state=({
        user: {
            id: '',
            fullName: '',
            city: '',
            bjjGrade: '',
            homeClub: '',
            adult: false,
            sex: ''

        },
        registeredUsers: []
    })
}
handleRegisterUser =(user)=>{
    this.setState({registeredUsers: this.state.registeredUsers.push(user)})
}

handleChange =(e)=>{
    const { target: { name, value } } = e
    this.setState({ [name]: value })
}

handleSubmit =(e)=>{
    e.preventDefault();

}
render(){
    return(
        <Grid>
            <Row>
                <Col sm={8} smOffset={2}>
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup >
                            <FormControl    type="text"  name="fullName" placeholder="Imię oraz nazwisko"
                                            value={this.state.user.fullName}
                                            onChange={this.handleChange} />
                        </FormGroup>
                    </form>
                </Col>
            </Row>
        </Grid>
    );
}
}

export default Registration;