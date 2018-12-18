import React from 'react';
import { Grid, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import './Navbar.css';

export const Navbar =()=>{
    return(
        <Grid>
            <Row className="navBar">
                <Col sm={12}>
                    <ButtonGroup>
                        <Button href="/Register">Panel rejestracji</Button>
                        <Button href="/">Podglad</Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </Grid>
    );
}