/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

const Hamburger = ({ click }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  <div color="" onClick={click} className="hamburger">
    <i className="fas fa-bars" style={{ fontSize: '2rem' }} />
  </div>
);

Hamburger.propTypes = {
  click: PropTypes.func,
};
Hamburger.defaultProps = {
  click: '',
};
export default Hamburger;
