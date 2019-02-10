import React, { useState } from 'react';
import { Alert, Container, Row, Col, Button, FormGroup, Input, Label } from 'reactstrap';
import { registerParticipant } from '../../services/users';
import { BarLoader } from 'react-spinners';

const disabledStyle = {
  pointerEvents: 'none',
  opacity: 0.4,
};

const RegistrationForm = () => {
  const [fullName, setFullName] = useState('');
  const [city, setCity] = useState('');
  const [bjjGrade, setBjjGrade] = useState('');
  const [homeClub, setHomeClub] = useState('');
  const [adult, setAdult] = useState('');
  const [sex, setSex] = useState('');
  const [alert, setAlert] = useState('');
  const [loading, setLoading] = useState(false);

  const displayAlert = alertText => {
    setAlert(alertText);
  };

  const handleSubmit = ev => {
    ev.preventDefault();

    setLoading(true);

    registerParticipant({
      fullName,
      city,
      bjjGrade,
      homeClub,
      adult,
      sex,
    }).then(participantId => {
      setLoading(false);
      displayAlert(`Uczestnik dodany z numerem startowym ${participantId}`);
    });
  };

  return (
    <Container>
      <Alert color="success" isOpen={alert !== ''} fade={false}>
        {alert}
      </Alert>
      <Row>
        <Col sm={8}>
          <form onSubmit={handleSubmit} style={loading ? disabledStyle : {}}>
            <FormGroup>
              <Input type="text" name="fullName" placeholder="Imię oraz nazwisko" value={fullName} onChange={ev => setFullName(ev.target.value)} />
            </FormGroup>
            <FormGroup>
              <Input type="text" name="city" placeholder="Miasto" value={city} onChange={ev => setCity(ev.target.value)} />
            </FormGroup>
            <FormGroup>
              <Input type="text" name="homeClub" placeholder="Klub" value={homeClub} onChange={ev => setHomeClub(ev.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label>Zaznacz kolor pasa bjj</Label>
              <Input type="select" name="bjjGrade" onChange={ev => setBjjGrade(ev.target.value)}>
                <option />
                <option>Biały</option>
                <option>Niebieski</option>
                <option>Purpurowy</option>
                <option>Brązowy</option>
                <option>Czarny</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Czy osoba jest pelnoletnia?</Label>
              <Input type="select" name="adult" onChange={ev => setAdult(ev.target.value)}>
                <option />
                <option>Tak</option>
                <option>Nie</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Zaznacz płeć</Label>
              <Input type="select" placeholder="Plec" name="sex" onChange={ev => setSex(ev.target.value)}>
                <option />
                <option>Mężczyzna</option>
                <option>Kobieta</option>
              </Input>
            </FormGroup>
            <Button type="submit">Dodaj zawodnika</Button>
          </form>
          <BarLoader sizeUnit={'px'} size={150} color={'#123abc'} loading={loading} />
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationForm;
