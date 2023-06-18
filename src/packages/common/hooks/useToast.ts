import { toast, type ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
};

export function useToast() {
  const toastError = (message: React.ReactNode, options: ToastOptions = {}) => {
    toast.error(message, { ...defaultOptions, ...options });
  };
  const toastSuccess = (message: React.ReactNode, options: ToastOptions = {}) => {
    toast.success(message, { ...defaultOptions, ...options });
  };
  const toastInfo = (message: React.ReactNode, options: ToastOptions = {}) => {
    toast.info(message, { ...defaultOptions, ...options });
  };
  const toastWarn = (message: React.ReactNode, options: ToastOptions = {}) => {
    toast.warn(message, { ...defaultOptions, ...options });
  };

  return {
    toastError,
    toastSuccess,
    toastInfo,
    toastWarn,
  };
}
