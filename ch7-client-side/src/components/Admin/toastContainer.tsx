// ToastComponent.tsx

import React from 'react';
import { Toast } from 'react-bootstrap';

interface ToastProps {
  show: boolean;
  onClose: () => void;
  message: string; // Mengubah tipe pesan menjadi string
}

const ToastComponent: React.FC<ToastProps> = ({ show, onClose, message }) => {
  return (
    <Toast
      onClose={onClose}
      show={show}
      delay={5000}
      autohide={false} // Set autohide menjadi false
      style={{
        position: 'fixed',
        top: '90px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#28a745', // Green background color
        color: 'white', // White text color
        minWidth: '600px', // Perbesar lebar toast
        borderRadius: '8px', // Memperbesar sudut bulatan
        padding: '16px', // Perbesar padding
      }}
    >
      {/* Hilangkan Toast.Header */}
      <Toast.Body>{message}</Toast.Body> {/* Gunakan pesan dari respons API */}
    </Toast>
  );
};

export default ToastComponent;
