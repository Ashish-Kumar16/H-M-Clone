// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://hm-backend-wdt8.onrender.com";

// const { user } = useSelector((state) => state.auth);
// const { isAuthenticated, user } = useSelector((state) => state.auth);
// const isAuthenticated = !!user; // Derived from `user` existence

// Async thunk for signing in
export const signIn = createAsyncThunk(
  "auth/signIn",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, credentials, {
        withCredentials: true,
      });
      return response.data; // Return data including ACCESS_TOKEN
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.msg || "Login failed");
    }
  },
);


// Async thunk for signing up
export const signUp = createAsyncThunk(
  "auth/signUp",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users/register`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Signup failed");
    }
  },
);

const initialState = {
  user: JSON.parse(sessionStorage.getItem("user")) || null,
  accessToken: sessionStorage.getItem("accessToken") || null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut(state) {
      state.user = null;
      state.accessToken = null;
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.accessToken = action.payload.ACCESS_TOKEN;
        sessionStorage.setItem("user", JSON.stringify(action.payload.user));
        sessionStorage.setItem("accessToken", action.payload.ACCESS_TOKEN);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { signOut } = authSlice.actions;

export default authSlice.reducer;
