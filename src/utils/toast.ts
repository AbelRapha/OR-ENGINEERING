import { toast } from "sonner";

export const showSuccess = (message: string) => {
  toast.success(message);
};

export const showError = (title: string, description?: string) => {
  toast.error(title, {
    description: description,
    duration: 10000, // Aumenta a duração para facilitar a leitura
    style: {
      whiteSpace: 'pre-line', // Garante que as quebras de linha sejam exibidas
    },
  });
};

export const showLoading = (message: string) => {
  return toast.loading(message);
};

export const dismissToast = (toastId: string) => {
  toast.dismiss(toastId);
};