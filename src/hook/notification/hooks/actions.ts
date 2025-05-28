import { useDispatch } from "react-redux";
import { open } from "..";
import { DialogNotificationState } from "../types";

export const useDialogNotification = () => {
  const dispatch = useDispatch();

  const handleNotification = (payload: DialogNotificationState) => {
    setTimeout(() => {
      dispatch(open(payload));
    }, 0);
  };

  return { handleNotification };
};
