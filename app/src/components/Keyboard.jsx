import React, {useState} from 'react';
import {Button} from 'reactstrap';
import PropTypes from 'prop-types';
import './Keyboard.css';

const Keyboard = props => {
    const [number, setNumber] = useState('');

    const buttonClicked = num => {
        setNumber(number.concat(num));
    };

    const addClicked = () => {
        if (number === '') {
            return;
        }

        props.onSave(number);
        setNumber('');
    };

    const deleteClicked = () => {
        setNumber(number.slice(0, -1));
    };

    return (
        <div style={{display: 'block'}}>
            <div className={'keyboard-container'}>
                <span/>
                <h1 className="text-center">{number || '-'}</h1>
                <Button color="danger" onClick={deleteClicked}>
                    Popraw
                </Button>
                <Button onClick={() => buttonClicked(1)}>
                    1
                </Button>
                <Button onClick={() => buttonClicked(2)}>
                    2
                </Button>
                <Button onClick={() => buttonClicked(3)}>
                    3
                </Button>
                <Button onClick={() => buttonClicked(4)}>
                    4
                </Button>
                <Button onClick={() => buttonClicked(5)}>
                    5
                </Button>
                <Button onClick={() => buttonClicked(6)}>
                    6
                </Button>
                <Button onClick={() => buttonClicked(7)}>
                    7
                </Button>
                <Button onClick={() => buttonClicked(8)}>
                    8
                </Button>
                <Button onClick={() => buttonClicked(9)}>
                    9
                </Button>
                <span/>
                <Button onClick={() => buttonClicked(0)}>
                    0
                </Button>
                <Button color="success" onClick={addClicked}>
                    Dodaj
                </Button>
            </div>
        </div>
    );
};

Keyboard.propTypes = {
    onSave: PropTypes.func,
};

export default Keyboard;
