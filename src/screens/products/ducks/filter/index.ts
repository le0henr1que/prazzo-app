import { createSlice } from "@reduxjs/toolkit";
import { FilterStateBatch } from "./types";

const INITIAL_STATE: FilterStateBatch = {
  filters: {
    search: "",
    meta: {
      page: 1,
    },
  },
};

const batchFilterSlice = createSlice({
  name: "batchFilter",
  initialState: INITIAL_STATE,
  reducers: {
    setBatchFilter(state, action) {
      state.filters[action.payload.key] = action.payload.value;
    },
  },
});

export const { setBatchFilter } = batchFilterSlice.actions;
export default batchFilterSlice.reducer;
