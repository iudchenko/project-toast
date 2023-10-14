import React from "react";
import { useEscapeKey } from "../../hooks/useEscapeKey";

export const ToastContext = React.createContext();
const TOAST_TIMEOUT = 2000;

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const createToast = React.useCallback(
    (message, variant) => {
      const newToast = {
        id: crypto.randomUUID(),
        message,
        variant,
      };

      setToasts([...toasts, newToast]);
    },
    [toasts]
  );

  const dismissToast = React.useCallback(
    (id) => {
      const newToasts = toasts.filter((toast) => toast.id !== id);
      setToasts(newToasts);
    },
    [toasts]
  );

  const dismissAllToasts = React.useCallback(() => {
    setToasts([]);
  }, []);

  React.useEffect(() => {
    if (toasts.length < 1) return;

    const timer = setTimeout(() => {
      dismissToast(toasts.at(0).id);
    }, TOAST_TIMEOUT);

    return () => {
      clearTimeout(timer);
    };
  }, [toasts, dismissToast]);

  useEscapeKey(dismissAllToasts);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        createToast,
        dismissToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
