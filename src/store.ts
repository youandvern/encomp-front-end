import { configureStore } from "@reduxjs/toolkit";
import projects from "./reduxSlices/projects";
import errors from "./reduxSlices/errors";
import auth from "./reduxSlices/auth";
import calculation from "./reduxSlices/calculation";
import templates from "./reduxSlices/template";

export const store = configureStore({
  reducer: { projects, errors, auth, calculation, templates },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
