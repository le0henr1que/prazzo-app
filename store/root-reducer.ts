import authReducer from "../src/hook/auth/slice/auth-slice";
import { apiSlice, loginSlice } from "../src/services/http";
import dialogModalReducer from "../src/hook/handle-modal";
import notificationReducer from "../src/hook/notification";
import filterBatchReducer from "../src/screens/products/ducks/filter";
import filterProductReducer from "../src/screens/add-product/ducks/filter";

const AllReducer = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  [loginSlice.reducerPath]: loginSlice.reducer,
  auth: authReducer,
  dialogModal: dialogModalReducer,
  notification: notificationReducer,
  // filterSupplier: filterSupplierReducer,
  filterProduct: filterProductReducer,
  filterBatch: filterBatchReducer,
};

export default AllReducer;
