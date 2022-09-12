import { configureStore } from "@reduxjs/toolkit";
import projects from "./reduxSlices/projects";

export const store = configureStore({
  reducer: { projects },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
