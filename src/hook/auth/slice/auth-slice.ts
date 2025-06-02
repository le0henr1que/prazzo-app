import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  googleToken: string | null;
  facebookToken: string | null;
  user: any | null; // Define a more specific type if available
  currentStore?: any | null;
}

const initialState: AuthState = {
  token: null,
  googleToken: null,
  facebookToken: null,
  user: null,
  currentStore: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    clearToken(state) {
      state.token = null;
    },
    setGoogleToken(state, action: PayloadAction<string>) {
      state.googleToken = action.payload;
    },
    clearGoogleToken(state) {
      state.googleToken = null;
    },
    setFacebookToken(state, action: PayloadAction<string>) {
      state.facebookToken = action.payload;
    },
    clearFacebookToken(state) {
      state.facebookToken = null;
    },
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
    setCurrentStore(state, action: PayloadAction<string | null>) {
      state.currentStore = action.payload;
    },
  },
});

export const {
  setToken,
  clearToken,
  setGoogleToken,
  clearGoogleToken,
  setFacebookToken,
  clearFacebookToken,
  setUser,
  setCurrentStore,
} = authSlice.actions;
export default authSlice.reducer;
