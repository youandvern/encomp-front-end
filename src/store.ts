import { configureStore } from "@reduxjs/toolkit";
import projects from "./reduxSlices/projects";
import errors from "./reduxSlices/errors";

export const store = configureStore({
  reducer: { projects, errors },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
