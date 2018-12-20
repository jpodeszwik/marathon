import React, { Component } from 'react';
import { Grid, Row, Col, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class Registration extends Component{
  constructor(props){
    super(props);
    this.state=({
      id: '',
      fullName: '',
      city: '',
      bjjGrade: '',
      homeClub: '',
      adult: '',
      sex: '',
      registeredUsers: []
    });
  }
  handleRegisterUser (user) {
    this.setState({registeredUsers: this.state.registeredUsers.push(user)});
  }

  handleChange (e) {
    const { target: { name, value } } = e;
    this.setState({ [name]: value });
  }

  handleSubmit (e) {
    e.preventDefault();
    console.log(this.state); // eslint-disable-line no-console
  }

  render() {
    return(
      <Grid>
        <Row>
          <Col sm={8} smOffset={2}>
            <form onSubmit={this.handleSubmit}>
              <FormGroup >
                <FormControl
                  type="text" name="fullName" placeholder="Imię oraz nazwisko"
                  value={this.state.fullName}
                  onChange={this.handleChange} />
                <FormControl
                  type="text" name="city" placeholder="Miasto"
                  value={this.state.city}
                  onChange={this.handleChange} />
                <FormControl type="text" name="homeClub" placeholder="Klub"
                  value={this.state.homeClub}
                  onChange={this.handleChange} />
                <ControlLabel>Zaznacz kolor pasa bjj</ControlLabel>
                <FormControl componentClass="select" name="bjjGrade" onChange={this.handleChange} >
                  <option ></option>
                  <option >Biały</option>
                  <option >Niebieski</option>
                  <option >Purpurowy</option>
                  <option >Brązowy</option>
                  <option >Czarny</option>
                </FormControl>
                <ControlLabel>Czy osoba jest pelnoletnia?</ControlLabel>
                <FormControl componentClass="select" name="adult" onChange={this.handleChange} >
                  <option ></option>
                  <option >Tak</option>
                  <option >Nie</option>
                </FormControl>
                <ControlLabel>Zaznacz płeć</ControlLabel>
                <FormControl componentClass="select" placeholder="Plec" name="sex" onChange={this.handleChange} >
                  <option ></option>
                  <option >Kobieta</option>
                  <option >Mężczyzna</option>
                </FormControl>
              </FormGroup>
              <Button type="submit">X</Button>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Registration;