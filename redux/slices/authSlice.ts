import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../hook";
import { account } from "@/utils/appwrite";
import { loginType, regType } from "@/utils/types";
import { ID } from "appwrite";
import { message } from "antd";

export interface AuthError {
  message: string;
}
interface User {
  $id: string;
  email: string;
  phone: string;
  name: string;
}
export interface AuthState {
  isAuth: boolean;
  currentUser: User | null;
  isLoading?: boolean;
  isOAuthLoading?: boolean;
  error: AuthError | any;
}

export const initialState: AuthState = {
  currentUser: null,
  error: { message: "" },
  isAuth: false,
  isLoading: false,
  isOAuthLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    AuthStart(state) {
      state.isLoading = true;
      state.error = null;
      state.isOAuthLoading = true;
    },
    AuthSuccess(state, action: PayloadAction<AuthState | any>) {
      state.currentUser = action.payload;
      state.isAuth = true;
      state.isLoading = false;
      state.isOAuthLoading = false;
      state.error = null;
    },
    AuthFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isOAuthLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.currentUser = null;
      state.isAuth = false;
    },
  },
});

export const { AuthFailure, AuthSuccess, AuthStart, logout } =
  authSlice.actions;
export default authSlice.reducer;

export const registerUser =
  (payload: regType): AppThunk =>
  async (dispatch) => {
    dispatch(AuthStart());
    try {
      const response = await account.create(
        ID.unique(),
        payload.email,
        payload.password,
        payload.name
      );
      await account.createEmailSession(payload.email, payload.password);
      let accountDetails = await account.get();
      dispatch(AuthSuccess(accountDetails));
      console.log(response);
    } catch (err: any) {
      console.error(err);
      dispatch(AuthFailure(err));
    }
  };

export const logUserIn =
  (payload: loginType): AppThunk =>
  async (dispatch) => {
    dispatch(AuthStart());
    try {
      await account.createEmailSession(payload.email, payload.password);
      let accountDetails = await account.get();
      dispatch(AuthSuccess(accountDetails));
    } catch (error: any) {
      message.error(error);
      dispatch(AuthFailure(error));
    }
  };

// export const OAuthLogin = (): AppThunk => async (dispatch) => {
//   dispatch(AuthStart());

//   try {
//     let response = account.createOAuth2Session("google");
//     console.log(response);
//     let detail = account.get();

//     dispatch(AuthSuccess(detail));
//   } catch (err: any) {
//     console.error(err);
//     dispatch(AuthFailure(err));
//   }
// };

export const logUserOut = (): AppThunk => async (dispatch) => {
  try {
    await account.deleteSession("current");
    dispatch(logout());
  } catch (error) {
    message.error("Network error. Please try again.");
    console.log("logout error: " + error);
  }
};