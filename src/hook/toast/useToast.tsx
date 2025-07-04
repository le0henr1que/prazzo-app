import { useState, useCallback } from "react";

type ToastType = "success" | "danger" | "info" | "warning";

export interface ToastData {
  id: string;
  message: string;
  type?: ToastType;
}

export function useToast() {
  const [toast, setToast] = useState<ToastData | null>(null);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = String(Date.now());
    setToast({ id, message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return { toast, showToast, hideToast };
}
