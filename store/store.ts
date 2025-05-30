import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { parse, stringify } from "flatted";
import { persistReducer, persistStore } from "redux-persist";
import { apiSlice, loginSlice } from "../src/services/http";
import AllReducer from "./root-reducer";

const rootReducer = combineReducers({
  ...AllReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["dialogModal", "auth"],
  serialize: stringify,
  deserialize: parse,
};

const persistedReducer = persistReducer(persistConfig as any, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
      .concat(loginSlice.middleware)
      .concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
