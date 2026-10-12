import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export default function Toast() {
  const { toastMessage, hideToast } = useApp();

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      hideToast();
    }, 2600);
    return () => clearTimeout(timer);
  }, [toastMessage, hideToast]);

  if (!toastMessage) return null;

  return (
    <div className="toast" id="toast">
      <span>✓</span>
      <span id="toast-text">{toastMessage}</span>
    </div>
  );
}
