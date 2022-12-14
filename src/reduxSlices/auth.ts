import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { apiRegister, apiLogin, apiGetUser, apiLogout } from "../api";
import { errorsActions } from "./errors";
import User, { UserLoginDto, UserRegisterDto } from "../commonTypes/UserT";
import { projectsActions } from "./projects";
import { StatusT } from "../commonTypes/StatusT";
import { templatesActions } from "./template";
import { calculationActions } from "./calculation";

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const REGISTER_USER = "REGISTER_USER";
export const LOGOUT_INTERNAL = "LOGOUT_INTERNAL";
export const GET_USER = "GET_USER";

///
/// State
///

export interface AuthState {
  user: User | null;
  loggedIn: boolean;
  firstName: string | null;
  surName: string | null;
  authStatus: StatusT;
  userStatus: StatusT;
}

export const initialState: AuthState = {
  user: null,
  loggedIn: true,
  firstName: null,
  surName: null,
  authStatus: "idle",
  userStatus: "loading",
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

const fetchUser = createAsyncThunk(GET_USER, async (_, thunkApi) => {
  try {
    return await apiGetUser();
  } catch (err) {
    thunkApi.dispatch(errorsActions.throwError(`${err}`));
    return thunkApi.rejectWithValue(null);
  }
});

const logoutUser = createAsyncThunk(LOGOUT_USER, async (_, thunkApi) => {
  try {
    await apiLogout();
    thunkApi.dispatch(logoutUserInternal());
    return true;
  } catch (err) {
    thunkApi.dispatch(errorsActions.throwError(`${err}`));
    return thunkApi.rejectWithValue(null);
  }
});

const logoutUserInternal = createAsyncThunk(LOGOUT_INTERNAL, async (_, thunkApi) => {
  await thunkApi.dispatch(authActions.clearAuthState());
  thunkApi.dispatch(authActions.setLoggedOut());
  thunkApi.dispatch(projectsActions.clearProjectState());
  thunkApi.dispatch(templatesActions.clearTemplatesState());
  thunkApi.dispatch(calculationActions.clearCalculationState());
});

///
/// Slice
///

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: () => initialState,
    setLoggedOut: (state) => {
      state.loggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userStatus = "idle";
        state.authStatus = "idle";
        state.loggedIn = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.authStatus = "loading";
        state.userStatus = "loading";
      })
      .addCase(loginUser.rejected, (state) => {
        state.loggedIn = false;
        state.authStatus = "failed";
        state.userStatus = "failed";
      })
      .addCase(registerUser.pending, (state) => {
        state.authStatus = "loading";
        state.userStatus = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authStatus = "idle";
        state.userStatus = "idle";
        state.loggedIn = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loggedIn = false;
        state.authStatus = "failed";
        state.userStatus = "failed";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loggedIn = true;
        state.userStatus = "idle";
      })
      .addCase(fetchUser.pending, (state) => {
        state.userStatus = "loading";
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loggedIn = false;
        state.userStatus = "failed";
      });
  },
});

///
/// Exports
///

export const getUser = (state: RootState) => state.auth.user;
export const getAuthStatus = (state: RootState) => state.auth.authStatus;
export const getUserStatus = (state: RootState) => state.auth.userStatus;
export const isUserLoggedIn = (state: RootState) => state.auth.loggedIn;

export const authActions = {
  ...auth.actions,
  loginUser,
  registerUser,
  logoutUser,
  logoutUserInternal,
  fetchUser,
};
export default auth.reducer;
