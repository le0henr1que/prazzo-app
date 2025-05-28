import { apiSlice, loginSlice } from "../src/services/http";
import authReducer from "../src/hook/auth/slice/auth-slice";
import { DialogModalState } from "../src/hook/handle-modal/types";
import { DialogNotificationState } from "../src/hook/notification/types";
import { FilterStateBatch } from "../src/screens/products/ducks/filter/types";
import { FilterStateProduct } from "../src/screens/add-product/ducks/filter/types";

export type ApplicationState = {
  [apiSlice.reducerPath]: ReturnType<typeof apiSlice.reducer>;
  [loginSlice.reducerPath]: ReturnType<typeof loginSlice.reducer>;
  auth: ReturnType<typeof authReducer>;
  dialogModal: DialogModalState;
  notification: DialogNotificationState;
  //   filterSupplier: FilterStateSupplier;
  filterProduct: FilterStateProduct;
  filterBatch: FilterStateBatch;
};
