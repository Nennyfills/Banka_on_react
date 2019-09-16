import React from 'react';
import PropTypes from 'prop-types';

const ShowError = ({ getErrors }) => (
  <div className="showerror">{getErrors}</div>
);
ShowError.propTypes = {
  getErrors: PropTypes.func,
};
ShowError.defaultProps = {
  getErrors: '',
};
export default ShowError;
