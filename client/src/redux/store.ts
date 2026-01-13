import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/authSlice";
import gigReducer from "./Features/gigSlices";
import bidReducer from "./Features/bidSlices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    gig: gigReducer,
    bid: bidReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
