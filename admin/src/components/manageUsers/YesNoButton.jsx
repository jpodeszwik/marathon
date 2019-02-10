import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button } from 'reactstrap';

const YesNoButton = props => {
  const { selected, onSelect } = props;
  const onSelectCb = onSelect || function() {};

  return (
    <ButtonGroup>
      <Button color={selected ? 'primary' : 'secondary'} active={selected} onClick={() => onSelectCb(true)}>
        Tak
      </Button>
      <Button color={selected ? 'secondary' : 'primary'} active={!selected} onClick={() => onSelectCb(false)}>
        Nie
      </Button>
    </ButtonGroup>
  );
};

YesNoButton.propTypes = {
  selected: PropTypes.bool,
  onSelect: PropTypes.func,
};

export default YesNoButton;
