import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./reducers/modalSlice";
import unitsReducer from "./reducers/unitsSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    units: unitsReducer,
    // Other reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
