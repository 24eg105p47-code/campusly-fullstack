import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export default function Modal({ isOpen, onClose, hideCloseButton = false, children }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !hideCloseButton) {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, hideCloseButton]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !hideCloseButton) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" id="modal-backdrop" onClick={handleBackdropClick}>
      <section className="modal" role="dialog" aria-modal="true">
        {!hideCloseButton && (
          <button
            className="modal-close"
            id="modal-close"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        )}
        <div id="modal-content">{children}</div>
      </section>
    </div>
  );
}
