import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: localStorage.getItem("token") ? true : false,
    loading: false,
    error: null,
  },
  reducers: {
    loginUserSuccess(state) {
      state.isAuthenticated = true;
      state.error = null;
      state.loading = false;
    },
    logoutUser(state) {
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { loginUserSuccess, logoutUser, setLoading, setError } =
  authSlice.actions;

export default authSlice;
