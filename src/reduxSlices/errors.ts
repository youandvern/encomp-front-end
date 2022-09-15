import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const THROW_ERROR = "THROW_ERROR";

///
/// State
///

export interface ErrorState {
  message: string | null;
  newErrorPosted: boolean;
}

export const initialState: ErrorState = {
  message: null,
  newErrorPosted: false,
};

///
/// Actions/Reducers
///

const throwError = (state: ErrorState, action: PayloadAction<string>) => {
  state.message = action.payload;
  state.newErrorPosted = true;
};

const clearError = (state: ErrorState) => {
  state.newErrorPosted = false;
};

///
/// Slice
///

export const errors = createSlice({
  name: "errors",
  initialState,
  reducers: {
    clearError,
    throwError,
  },
});

///
/// Exports
///

export const getErrorMessage = (state: RootState) => state.errors.message;
export const getErrorStatus = (state: RootState) => state.errors.newErrorPosted;

export const errorsActions = { ...errors.actions };
export default errors.reducer;
