import { User } from "@/api/users/types";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  isLoggedIn: boolean;
  openLoginDialog: boolean;
  user: User | null;
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    openLoginDialog: false,
    user: null,
  } as UserState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.openLoginDialog = false;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.openLoginDialog = false;
    },
    setOpenLoginDialog: (state, action) => {
      state.openLoginDialog = action.payload;
    },
    checkAuthAndPromptLogin: (state) => {
      if (!state.isLoggedIn) {
        state.openLoginDialog = true;
      }
    },
  },
});

export const { login, logout, setOpenLoginDialog, checkAuthAndPromptLogin } =
  userSlice.actions;

export const selectIsLoggedIn = (state: { user: UserState }) =>
  state.user.isLoggedIn;
export const selectOpenLoginDialog = (state: { user: UserState }) =>
  state.user.openLoginDialog;
export const selectUser = (state: { user: UserState }) => state.user.user;

export default userSlice.reducer;
