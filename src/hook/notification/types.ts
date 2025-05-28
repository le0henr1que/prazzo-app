/* eslint-disable @typescript-eslint/no-explicit-any */
export interface NotificationModal {
  id: number;
  name: string;
}

export type NotificationVariant = "success" | "error" | "warning" | "info";

export interface DialogNotificationState {
  variant?: NotificationVariant;
  message?: string;
  title?: string;
  isOpen: boolean;
}
