import React, { Component } from 'react';
import { Alert, Container, Row, Col, Button, FormGroup, Input, Label } from 'reactstrap';
import { registerParticipant } from '../../services/users';
import { BarLoader } from 'react-spinners';

const disabledStyle = {
  pointerEvents: 'none',
  opacity: 0.4,
};

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      fullName: '',
      city: '',
      bjjGrade: '',
      homeClub: '',
      adult: '',
      sex: '',
      alert: '',
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayAlert = this.displayAlert.bind(this);
  }

  handleChange(e) {
    const { target: { name, value } } = e;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const state = this.state;

    this.setState({ loading: true });

    registerParticipant({
      fullName: state.fullName,
      city: state.city,
      bjjGrade: state.bjjGrade,
      homeClub: state.homeClub,
      adult: state.adult,
      sex: state.sex,
    }).then(participantId => {
      this.displayAlert(`Użytkownik dodany z numerem startowym ${participantId}`);
    });
  }

  displayAlert(alertText) {
    this.setState({ loading: false, alert: alertText });
    setTimeout(() => {
      if (this.state.alert === alertText) {
        this.setState({ alert: '' });
      }
    }, 3000);
  }

  render() {
    return (
      <Container>
        <Alert color="success" isOpen={this.state.alert !== ''} fade={false}>{this.state.alert}</Alert>
        <Row>
          <Col sm={8}>
            <form onSubmit={this.handleSubmit} style={this.state.loading ? disabledStyle : {}}>
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
              <Button type="submit">Dodaj zawodnika</Button>
            </form>
            <BarLoader
              sizeUnit={'px'}
              size={150}
              color={'#123abc'}
              loading={this.state.loading}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RegistrationForm;
