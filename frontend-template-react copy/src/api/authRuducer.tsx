import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {UserState} from "../redux/reducer/userReducer"

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  role: string | null;
  id: string | null;
  name: string | null;
  email: string | null;
}


const initialState: AuthState = {
  token: localStorage.getItem("authToken"),
  isAuthenticated: !!localStorage.getItem("authToken"),
  role: localStorage.getItem("role"),
  name: localStorage.getItem("name")||"",
  id: localStorage.getItem("id")||"",
  email: localStorage.getItem("email"),
  
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Set the authentication token and log the user in.
     * 
     * @param {string} token The authentication token.
     */
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("authToken", action.payload);

      
    },
   
    /**
     * Log the user out.
     * 
     * Removes the authentication token from state and localStorage, and sets
     * isAuthenticated to false.
     */
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("playlists");
      localStorage.removeItem("authToken");
      localStorage.removeItem("name");
      localStorage.removeItem("id");
      localStorage.removeItem("role");
      localStorage.removeItem("email");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
    },

    // setUser: (state, action: PayloadAction<{ user: AuthState["user"] }>) => {
    //   state.user = action.payload.user;
    //   localStorage.setItem("user", JSON.stringify(action.payload.user));
    // },
    setUserData: (state, action: PayloadAction<{name: string, id: string, email:string}>) => {
         
      localStorage.setItem("id", action.payload.id);
      localStorage.setItem("name", action.payload.name);
      localStorage.setItem("email", action.payload.email);
      
    },

    // setUserData: (state, action: PayloadAction<UserState>) => {
    //   state.user = action.payload;
    //   localStorage.setItem("name" , action.payload.user.name);
    // },
    // clearUser: (state) => {
    //   state.user = null;
    //   localStorage.removeItem("user");  
    // },
  },
});

export const { setToken, logout, setUserData } = authSlice.actions;
export default authSlice.reducer;
