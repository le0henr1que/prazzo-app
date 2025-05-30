import { createSlice } from "@reduxjs/toolkit";
import { FilterStateSupplier } from "./types";

const INITIAL_STATE: FilterStateSupplier = {
  filters: {
    search: "",
    meta: {
      page: 1,
    },
  },
};

const supplierFilterSlice = createSlice({
  name: "supplierFilter",
  initialState: INITIAL_STATE,
  reducers: {
    setSupplierFilter(state, action) {
      state.filters[action.payload.key] = action.payload.value;
    },
  },
});

export const { setSupplierFilter } = supplierFilterSlice.actions;
export default supplierFilterSlice.reducer;
