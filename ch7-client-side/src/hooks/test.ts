import { useState } from 'react';

interface ToastData {
  show: boolean;
  message: string;
}

const useToast = () => {
  const [toastData, setToastData] = useState<ToastData>({
    show: false,
    message: '',
  });

  const showToast = (message: string) => {
    setToastData({ show: true, message });
  };

  const hideToast = () => {
    setToastData({ show: false, message: '' });
  };

  return {
    toastData,
    showToast,
    hideToast,
  };
};

export default useToast;
