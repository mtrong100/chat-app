import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalSlice from "./slices/globalSlice";
import socketSlice from "./slices/socketSlice";

export const reducer = combineReducers({
  global: globalSlice,
  socket: socketSlice,
});

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
