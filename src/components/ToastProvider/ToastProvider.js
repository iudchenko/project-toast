import React from "react";
import { useEscapeKey } from "../../hooks/useEscapeKey";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  // React.useEffect(() => {
  //   function handleKeyDown(e) {
  //     if (e.code === "Escape") {
  //       setToasts([]);
  //     }
  //   }

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

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

  const removeAllToasts = React.useCallback(() => {
    setToasts([]);
  }, []);

  useEscapeKey(removeAllToasts);

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
