import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {Button} from 'reactstrap';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import './RoundPicker.css'

const roundLength = 5;

const roundToRoundLength = date => {
    const copiedDate = new Date(date.getTime());

    const minutes = copiedDate.getMinutes();
    copiedDate.setMinutes(minutes - (minutes % roundLength));
    copiedDate.setSeconds(0);

    return copiedDate;
};

const addMinutes = (date, minutes) => {
    const copiedDate = new Date(date.getTime());
    copiedDate.setMinutes(copiedDate.getMinutes() + minutes);
    return copiedDate;
};

const RoundPicker = props => {
    const [roundStart, setRoundStart] = useState(roundToRoundLength(new Date()));
    const onRoundSelected = props.onRoundSelected || function () {
    };

    useEffect(() => {
        onRoundSelected(roundStart);
    }, []);

    const nextRound = () => {
        const newRoundStart = addMinutes(roundStart, roundLength);
        setRoundStart(newRoundStart);
        onRoundSelected(newRoundStart);
    };

    const previousRound = () => {
        const newRoundStart = addMinutes(roundStart, -roundLength);
        setRoundStart(newRoundStart);
        onRoundSelected(newRoundStart);
    };

    const roundEnd = addMinutes(roundStart, roundLength);

    return (
        <div className={'round-picker-container'}>
            <Button onClick={previousRound}>
                <FaAngleLeft/>
            </Button>
            <div>
                <Moment format="DD MMM">{roundStart}</Moment> <Moment format="HH:mm">{roundStart}</Moment> - <Moment
                format="HH:mm">{roundEnd}</Moment>
            </div>
            <Button onClick={nextRound}>
                <FaAngleRight/>
            </Button>
        </div>
    );
};

RoundPicker.propTypes = {
    onRoundSelected: PropTypes.func,
};

export default React.memo(RoundPicker);
