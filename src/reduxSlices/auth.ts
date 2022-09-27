import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { apiRegister, apiLogin } from "../api";
import { errorsActions } from "./errors";
import User, { UserLoginDto, UserRegisterDto } from "../commonTypes/User";

export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";

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

export const loginUser = createAsyncThunk(LOGIN_USER, async (loginDto: UserLoginDto, thunkApi) => {
  try {
    return await apiLogin(loginDto);
  } catch (err) {
    // display api call error message
    thunkApi.dispatch(errorsActions.throwError(`Failed to login: ${err}`));
    return thunkApi.rejectWithValue(null);
  }
});

export const registerUser = createAsyncThunk(
  REGISTER_USER,
  async (registerDto: UserRegisterDto, thunkApi) => {
    try {
      return await apiRegister(registerDto);
    } catch (err) {
      // display api call error message
      thunkApi.dispatch(errorsActions.throwError(`Failed to register: ${err}`));
      return thunkApi.rejectWithValue(null);
    }
  }
);

///
/// Slice
///

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = initialState.user;
      state.firstName = initialState.firstName;
      state.surName = initialState.surName;
    },
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
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.actionSuccessful = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.actionSuccessful = false;
      });
  },
});

///
/// Exports
///

export const getUser = (state: RootState) => state.auth.user;

export const authActions = {
  ...auth.actions,
  loginUser,
  registerUser,
};
export default auth.reducer;
