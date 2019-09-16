import React from 'react';
import PropTypes from 'prop-types';

const Slide = ({ signUpLink, loginLink }) => (
  <div className="slideCol">
    <div className="showcase-content">
      <h1 className="showcase-text">
        Lets take Banking system to the next
        <strong> level </strong>
      </h1>
      {!signUpLink ? loginLink : signUpLink}
    </div>
  </div>
);
Slide.propTypes = {
  signUpLink: PropTypes.node,
  loginLink: PropTypes.node,
};
Slide.defaultProps = {
  signUpLink: '',
  loginLink: '',
};
export default Slide;
