import { toast, ToastOptions } from "react-toastify";
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineInfoCircle, AiOutlineWarning } from "react-icons/ai";

// Common Toast Configurations
const toastConfig: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

// Success Toast
export const showSuccessToast = (message: string) => {
  toast.success(message, {
    ...toastConfig,
    icon: <AiOutlineCheckCircle size={24} color="white" />, // Using react-icons
    style: { background: "#28a745", color: "#fff", fontWeight: "bold" },
  });
};

// Error Toast
export const showErrorToast = (message: string) => {
  toast.error(message, {
    ...toastConfig,
    icon: <AiOutlineCloseCircle size={24} color="white" />,
    style: { background: "#dc3545", color: "#fff", fontWeight: "bold" },
  });
};

// Info Toast
export const showInfoToast = (message: string) => {
  toast.info(message, {
    ...toastConfig,
    icon: <AiOutlineInfoCircle size={24} color="white" />,
    style: { background: "#17a2b8", color: "#fff", fontWeight: "bold" },
  });
};

// Warning Toast
export const showWarningToast = (message: string) => {
  toast.warn(message, {
    ...toastConfig,
    icon: <AiOutlineWarning size={24} color="black" />,
    style: { background: "#ffc107", color: "#333", fontWeight: "bold" },
  });
};

// Loading Toast
export const showLoadingToast = (message: string) => {
  toast.loading(message, {
    ...toastConfig,
    icon: <AiOutlineWarning size={24} color="yellow" />, // Unicode emoji in JSX is fine
    autoClose: false, // Must be dismissed manually
  });
};

// Dismiss a toast manually
export const dismissToast = () => {
  toast.dismiss();
};
