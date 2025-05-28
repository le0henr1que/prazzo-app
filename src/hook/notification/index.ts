// dialogModalSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DialogNotificationState } from "./types";

const initialState: DialogNotificationState = {
  variant: "info",
  message: "",
  isOpen: false,
  title: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    open(state, action: PayloadAction<DialogNotificationState>) {
      state.variant = action.payload.variant;
      state.message = action.payload.message;
      state.isOpen = action.payload.isOpen;
      state.title = action.payload.title;
    },
  },
});

export const { open } = notificationSlice.actions;
export default notificationSlice.reducer;
