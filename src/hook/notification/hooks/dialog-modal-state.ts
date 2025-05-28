import { useSelector } from "react-redux";
import { ApplicationState } from "src/store";

export const useDialogNotificationState = () => {
  return useSelector((state: ApplicationState) => state.notification);
};
