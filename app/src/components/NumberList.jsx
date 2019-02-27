import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import './NumberList.css'

function NumberList(props) {
    const {numbers, onRemoveNumber} = props;

    return (
        <div className={'number-list'}>
            {numbers.map((number, key) => (
                <div key={key}>
                    <span>{number}</span>
                    <Button style={{float: 'right'}} onClick={() => onRemoveNumber(number)} color="danger">
                        X
                    </Button>
                </div>
            ))}
        </div>
    );
}

NumberList.propTypes = {
    numbers: PropTypes.arrayOf(PropTypes.string),
    onRemoveNumber: PropTypes.func,
};

export default NumberList;
