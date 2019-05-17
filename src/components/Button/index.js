import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Button = React.memo(function Button({ className, text, onClick }) {
  return (
    <button
      className={`btn ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
});

Button.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  className: '',
  text: '',
};

export default Button;
