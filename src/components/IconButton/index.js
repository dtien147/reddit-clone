import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const IconButton = React.memo(function Spinner({ icon, className, onClick }) {
  return(
    <button className={`icon-btn ${className}`} onClick={onClick}>
      <i className={icon} />
    </button>
  );
});

IconButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

IconButton.defaultProps = {
  className: '',
};

export default IconButton;
