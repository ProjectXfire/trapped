import { toast } from "sonner";

const ToastMessage = {
  error: (message: string) =>
    toast.error(message, {
      style: { ...container, ...error },
      position: "bottom-center",
    }),
  success: (message: string) =>
    toast.success(message, {
      style: { ...container, ...success },
      position: "bottom-center",
    }),
  warning: (message: string) =>
    toast.warning(message, {
      style: { ...container, ...warning },
      position: "bottom-center",
    }),
};

export default ToastMessage;

const container: React.CSSProperties = {
  border: "2px dotted white",
};

const error: React.CSSProperties = {
  borderColor: "var(--red-color-1)",
};

const success: React.CSSProperties = {
  borderColor: "var(--green-color-1)",
};

const warning: React.CSSProperties = {
  borderColor: "var(--orange-color-1)",
};
