import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface user {
  name: string;
  email: string;
  address: string;
  password: string;
  isLogged: boolean;
  isAdmin: boolean;
}

const initialState: user = {
  name: "",
  email: "",
  address: "",
  password: "",
  isLogged: false,
  isAdmin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initUser: (_state, action: PayloadAction<user>) => {
      return action.payload;
    },
    loggedIn: (_state,action: PayloadAction<{name: string;email: string;address: string;password: string;isAdmin: boolean}>) => {
      localStorage.setItem("user", JSON.stringify({ ...action.payload, isLogged: true }));
      return { ...action.payload, isLogged:true };
    },
    logOut: () => {
      localStorage.removeItem('user')
      return {
        name: "",
        email: "",
        address: "",
        password: "",
        isLogged: false,
        isAdmin: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { initUser, loggedIn, logOut } = userSlice.actions;

export default userSlice.reducer;
