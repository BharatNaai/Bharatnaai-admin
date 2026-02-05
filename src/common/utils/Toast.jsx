import { useState, useEffect } from "react";
import { FiX, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

/**
 * Toast Component for displaying notifications
 */
export const Toast = ({ message, type = "error", onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";
  const icon = type === "error" ? <FiAlertCircle /> : <FiCheckCircle />;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div
        className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 min-w-[300px] max-w-md`}
      >
        <div className="text-xl">{icon}</div>
        <p className="flex-1 font-medium">{message}</p>
        <button
          onClick={onClose}
          className="hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
        >
          <FiX />
        </button>
      </div>
    </div>
  );
};

/**
 * Toast Hook for managing toast state
 */
export const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "error", duration = 3000) => {
    setToast({ message, type, duration });
  };

  const hideToast = () => {
    setToast(null);
  };

  return { toast, showToast, hideToast };
};

export default Toast;


