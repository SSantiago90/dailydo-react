import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

interface UseToastOptions {
  type?: "success" | "error" | "info";
  duration?: number;
}

const Toast: React.FC<{ message: string; type: string }> = ({
  message,
  type,
}) => {
  const toastClass = classNames(
    "fixed bottom-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-4 mx-auto text-sm rounded shadow-lg transition-opacity",
    {
      "bg-green-500 text-white": type === "success",
      "bg-rose-500 text-white": type === "error",
      "bg-blue-500 text-white": type === "info",
    }
  );

  return <div className={toastClass}>{message}</div>;
};

const useToast = () => {
  const [toast, setToast] = useState<{ message: string; type: string } | null>(
    null
  );

  useEffect(() => {
    if (toast) {
      const timeoutId = setTimeout(() => {
        setToast(null);
      }, toast.duration || 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [toast]);

  const showToast = (message: string, options: UseToastOptions = {}) => {
    setToast({ message, type: options.type || "info" });
  };

  const ToastPortal = () => {
    if (!toast) return null;
    return ReactDOM.createPortal(
      <Toast message={toast.message} type={toast.type} />,
      document.body
    );
  };

  return { showToast, ToastPortal };
};
/**
 * Use this hook to show toast messages in your app.
 *
 * Example of usage:
 *
 * const { showToast, ToastPortal } = useToast();
 *
 * showToast('Something went wrong', { type: 'error' });
 *
 * // Somewhere in your app
 * <ToastPortal />
 */

export default useToast;
