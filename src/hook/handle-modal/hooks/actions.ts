import { useDispatch } from "react-redux";
import { open, close } from "..";
import { DialogModalState } from "../types";

export const useDialogModal = () => {
  const dispatch = useDispatch();

  const handleModal = (payload: DialogModalState) => {
    if (payload.isOpen) {
      dispatch(open(payload));
    } else {
      dispatch(close());
    }
  };

  return { handleModal };
};
