import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: rgba(0, 0, 0, 0.9);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  overflow: scroll;
  transition: 0.3s;
  z-index: 100;

  ${({ isOpen }) => {
    if (isOpen) {
      return css`
        opacity: 1;
        pointer-events: all;
      `;
    }
    return css`
      opacity: 0;
      pointer-events: none;
    `;
  }}
`;

function Modal({ isOpen, onClose, children }) {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClick={(event) => {
        const isSafeArea = event.target.closest('[data-modal-safe-area="true"');

        if (!isSafeArea) {
          onClose();
        }
      }}
    >
      <div style={{ display: 'flex', flex: 1 }}>
        {children({
          'data-modal-safe-area': 'true',
        })}
      </div>
    </ModalWrapper>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
