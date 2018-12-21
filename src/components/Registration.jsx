import React, { Component } from 'react';
import { Container, Row, Col, Button, FormGroup, Input, Label } from 'reactstrap';
import { createUser } from '../services/users';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      id: '',
      fullName: '',
      city: '',
      bjjGrade: '',
      homeClub: '',
      adult: '',
      sex: ''
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { target: { name, value } } = e;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const state = this.state;

    createUser({
      fullName: state.fullName,
      city: state.city,
      bjjGrade: state.bjjGrade,
      homeClub: state.homeClub,
      adult: state.adult,
      sex: state.sex,
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col sm={8}>
            <form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Input
                  type="text" name="fullName" placeholder="Imię oraz nazwisko"
                  value={this.state.fullName}
                  onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text" name="city" placeholder="Miasto"
                  value={this.state.city}
                  onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Input type="text" name="homeClub" placeholder="Klub"
                  value={this.state.homeClub}
                  onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label>Zaznacz kolor pasa bjj</Label>
                <Input type="select" name="bjjGrade" onChange={this.handleChange} >
                  <option ></option>
                  <option >Biały</option>
                  <option >Niebieski</option>
                  <option >Purpurowy</option>
                  <option >Brązowy</option>
                  <option >Czarny</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Czy osoba jest pelnoletnia?</Label>
                <Input type="select" name="adult" onChange={this.handleChange} >
                  <option ></option>
                  <option >Tak</option>
                  <option >Nie</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Zaznacz płeć</Label>
                <Input type="select" placeholder="Plec" name="sex" onChange={this.handleChange} >
                  <option ></option>
                  <option >Kobieta</option>
                  <option >Mężczyzna</option>
                </Input>
              </FormGroup>
              <Button type="submit">X</Button>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Registration;