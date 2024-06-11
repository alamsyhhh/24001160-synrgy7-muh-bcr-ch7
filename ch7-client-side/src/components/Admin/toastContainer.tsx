import React from 'react';
import { Toast } from 'react-bootstrap';

interface ToastProps {
  show: boolean;
  onClose: () => void;
  message: string;
}

const ToastComponent: React.FC<ToastProps> = ({ show, onClose, message }) => {
  return (
    <Toast
      onClose={onClose}
      show={show}
      delay={5000}
      autohide={false}
      style={{
        position: 'fixed',
        top: '90px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#28a745',
        color: 'white',
        minWidth: '600px',
        borderRadius: '8px',
        padding: '16px',
        zIndex: 9999,
        textAlign: 'center',
        textTransform: 'uppercase', 
        fontSize: '1.2em', 
      }}
    >
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default ToastComponent;
