import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./index";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
