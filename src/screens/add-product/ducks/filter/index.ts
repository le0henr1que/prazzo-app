import { createSlice } from "@reduxjs/toolkit";
import { FilterStateProduct } from "./types";

const INITIAL_STATE: FilterStateProduct = {
  filters: {
    search: "",
    meta: {
      page: 1,
    },
  },
};

const productFilterSlice = createSlice({
  name: "productFilter",
  initialState: INITIAL_STATE,
  reducers: {
    setProductFilter(state, action) {
      state.filters[action.payload.key] = action.payload.value;
    },
  },
});

export const { setProductFilter } = productFilterSlice.actions;
export default productFilterSlice.reducer;
