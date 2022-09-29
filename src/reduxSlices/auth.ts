import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { apiRegister, apiLogin } from "../api";
import { errorsActions } from "./errors";
import User, { UserLoginDto, UserRegisterDto } from "../commonTypes/User";
import { projectsActions } from "./projects";

export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";
export const LOGOUT_INTERNAL = "LOGOUT_INTERNAL";

///
/// State
///

export interface AuthState {
  user: User | null;
  loggedIn: boolean;
  firstName: string | null;
  surName: string | null;
  actionSuccessful: boolean;
}

export const initialState: AuthState = {
  user: null,
  loggedIn: false,
  firstName: null,
  surName: null,
  actionSuccessful: true,
};

///
/// Actions
///

const loginUser = createAsyncThunk(LOGIN_USER, async (loginDto: UserLoginDto, thunkApi) => {
  try {
    return await apiLogin(loginDto);
  } catch (err) {
    // display api call error message
    thunkApi.dispatch(errorsActions.throwError(`${err}`));
    return thunkApi.rejectWithValue(null);
  }
});

const registerUser = createAsyncThunk(
  REGISTER_USER,
  async (registerDto: UserRegisterDto, thunkApi) => {
    try {
      return await apiRegister(registerDto);
    } catch (err) {
      // display api call error message
      thunkApi.dispatch(errorsActions.throwError(`${err}`));
      return thunkApi.rejectWithValue(null);
    }
  }
);

const logoutUserInternal = createAsyncThunk(LOGOUT_INTERNAL, (_, thunkApi) => {
  thunkApi.dispatch(authActions.setLoggedOut());
  thunkApi.dispatch(projectsActions.clearProjectState());
});

///
/// Slice
///

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedOut: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.actionSuccessful = true;
        state.loggedIn = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.actionSuccessful = false;
        state.loggedIn = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.actionSuccessful = true;
        state.loggedIn = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.actionSuccessful = false;
        state.loggedIn = false;
      });
  },
});

///
/// Exports
///

export const getUser = (state: RootState) => state.auth.user;
export const isUserLoggedIn = (state: RootState) => state.auth.loggedIn;

export const authActions = {
  ...auth.actions,
  loginUser,
  registerUser,
  logoutUserInternal,
};
export default auth.reducer;
