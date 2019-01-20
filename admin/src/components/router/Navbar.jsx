import React from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const linkStyle = {
  marginLeft: '5px',
};

const Navbar = props => {
  return (
    <Container>
      <Row style={{ margin: '10px 0' }}>
        <Col sm={12}>
          <ButtonGroup>
            <Link style={linkStyle} to="/"><Button>Rejestracja</Button></Link>
            <Link style={linkStyle} to="/prize"><Button>Losowanie nagrody</Button></Link>
            <Link style={linkStyle} to="/results"><Button>Wyniki</Button></Link>
            <Link style={linkStyle} to="/check-participants"><Button>Sprawdź uczestników</Button></Link>
            {props.canManageUsers && <Link style={linkStyle} to="/manage-users"><Button>Użytkownicy</Button></Link>}
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
};

Navbar.propTypes = {
  canManageUsers: PropTypes.bool,
};

export default Navbar;
