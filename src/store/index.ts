import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";

const store: any = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
});

export default store;
