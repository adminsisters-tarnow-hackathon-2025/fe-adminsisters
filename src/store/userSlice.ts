import { loginAsync } from "@/api/users";
import { LoginResponse } from "@/api/users/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
  isLoggedIn: boolean;
  openLoginDialog: boolean;
  user: LoginResponse | null;
  isAdmin?: boolean;
}

// Thunk do logowania
export const loginThunk = createAsyncThunk(
  "user/loginThunk",
  async ({ name, password }: { name: string; password: string }) => {
    const response = await loginAsync(name, password);
    return response?.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    openLoginDialog: false,
    user: null,
    isAdmin: false,
  } as UserState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.openLoginDialog = false;
      state.isAdmin = false;
    },
    setOpenLoginDialog: (state, action) => {
      state.openLoginDialog = action.payload;
    },
    checkAuthAndPromptLogin: (state) => {
      if (!state.isLoggedIn) {
        state.openLoginDialog = true;
      }
    },
    setCoins: (state, action) => {
      if (state.user) {
        state.user.data.coinAmount = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload || null;
      state.isAdmin = action.payload?.isAdmin ?? false;
      state.openLoginDialog = false;
    });
  },
});

export const { logout, setOpenLoginDialog, setCoins, checkAuthAndPromptLogin } =
  userSlice.actions;

export const selectIsLoggedIn = (state: { user: UserState }) =>
  state.user.isLoggedIn;
export const selectOpenLoginDialog = (state: { user: UserState }) =>
  state.user.openLoginDialog;
export const selectUser = (state: { user: UserState }) => {
  return state.user;
};

export default userSlice.reducer;
