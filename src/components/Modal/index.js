import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import IconButton from '../IconButton';
import './styles.scss';

class Modal extends PureComponent {
  render() {
    const {
      header,
      content,
      footer,
      show,
      onCloseModal,
      className,
    } = this.props;

    if (!show) {
      return null;
    }

    const modal = <div className="modal-layer">
      <div className={`modal ${className}`}>
        <IconButton
          icon="fas fa-times"
          className="modal-close-btn"
          onClick={onCloseModal}
        />
        {header && <div className="modal-header">{header}</div>}
        {content && <div className="modal-content">{content}</div>}
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>;

    return (
      <div>
        {ReactDOM.createPortal(modal, document.body)}
      </div>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool,
  header: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  content: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  footer: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  onCloseModal: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  show: false,
  header: null,
  content: null,
  footer: null,
};

export default Modal;
