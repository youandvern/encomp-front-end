import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOGGED_OUT } from "../api";
import { RootState } from "../store";
import { authActions } from "./auth";

export const THROW_ERROR = "THROW_ERROR";
export const POST_ERROR = "POST_ERROR";

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

const throwError = createAsyncThunk(THROW_ERROR, async (message: string, thunkApi) => {
  if (message === LOGGED_OUT) {
    thunkApi.dispatch(authActions.logoutUserInternal());
  } else {
    thunkApi.dispatch(errorsActions.postError(message));
  }
});

const postError = (state: ErrorState, action: PayloadAction<string>) => {
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
    postError,
  },
});

///
/// Exports
///

export const getErrorMessage = (state: RootState) => state.errors.message;
export const getErrorStatus = (state: RootState) => state.errors.newErrorPosted;

export const errorsActions = { ...errors.actions, throwError };
export default errors.reducer;
