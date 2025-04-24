// composables/useToast.ts
import { ref } from 'vue';

export type ToastType = 'success' | 'error' | 'warning';

export interface Toast {
  id: number;
  title: string;
  message: string;
  type: ToastType;
}

const toastList = ref<Toast[]>([]);

export function useToast() {
  const showToast = (message: string, type: ToastType = 'success', title?: string) => {
    const id = Date.now();
    toastList.value.push({
      id,
      message,
      type,
      title:
        title ||
        {
          success: 'Success',
          error: 'Error',
          warning: 'Warning',
        }[type],
    });

    setTimeout(() => {
      toastList.value = toastList.value.filter((t) => t.id !== id);
    }, 3000);
  };

  return {
    toastList,
    showToast,
  };
}
