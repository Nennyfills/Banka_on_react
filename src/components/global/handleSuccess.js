import React from 'react';
import PropTypes from 'prop-types';

const ShowSuccess = ({ getSuccess }) => (
  <div className="showsuccess">{getSuccess}</div>
);
ShowSuccess.propTypes = {
  getSuccess: PropTypes.func,
};
ShowSuccess.defaultProps = {
  getSuccess: '',
};
export default ShowSuccess;
