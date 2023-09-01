import { createSlice } from "@reduxjs/toolkit";
import { User } from "../graphql/__generated__/graphql";

interface AuthState {
  accessToken: string;
  user: User | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken") || "",
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "")
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.access_token;
      state.user = action.payload.user;
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
