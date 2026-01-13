import { toast } from 'react-toastify';

export const notifySuccess = (msg: string, id?: string) => {
  toast.success(msg, {
    toastId: id || msg,
  });
};

export const notifyError = (msg: string, id?: string) => {
  toast.error(msg, {
    toastId: id || msg,
  });
};

export const notifyWarning = (msg: string, id?: string) => {
  toast.warn(msg, {
    toastId: id || msg,
  });
};
