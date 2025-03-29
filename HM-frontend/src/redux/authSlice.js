import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://hm-backend-wdt8.onrender.com/api/users";

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/me`, {
        withCredentials: true,
      });
      console.log("checkAuth response:", response.data);
      return response.data;
    } catch (error) {
      console.error("checkAuth error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || { msg: "Not authenticated" },
      );
    }
  },
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials, {
        withCredentials: true,
      });
      console.log("signIn response:", response.data);
      return response.data;
    } catch (error) {
      console.error("signIn error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { msg: "Login failed" });
    }
  },
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/logout`, null, {
        withCredentials: true,
      });
      console.log("signOut response:", response.data);
      return response.data;
    } catch (error) {
      console.error("signOut error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { msg: "Logout failed" });
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("registerUser response:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "registerUser error:",
        error.response?.data || error.message,
      );
      return rejectWithValue(
        error.response?.data || { error: "Registration failed" },
      );
    }
  },
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/update`, userData, {
        withCredentials: true,
      });
      console.log("updateUser response:", response.data);
      return response.data;
    } catch (error) {
      console.error("updateUser error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || { error: "Update failed" },
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
      console.log("Logout action triggered, state reset");
    },
  },
  extraReducers: (builder) => {
    builder
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.status = "loading";
        console.log("checkAuth pending");
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user || action.payload.data?.user || null;
        state.error = null;
        console.log("checkAuth fulfilled, user set:", state.user);
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.payload.msg || "Authentication check failed";
        console.log("checkAuth rejected, error:", state.error);
      })
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
        console.log("signIn pending");
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user || action.payload.data?.user || null;
        state.error = null;
        console.log("signIn fulfilled, user set:", state.user);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.payload.msg || "Login failed";
        console.log("signIn rejected, error:", state.error);
      })
      // Sign Out
      .addCase(signOut.pending, (state) => {
        state.status = "loading";
        console.log("signOut pending");
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
        state.error = null;
        console.log("signOut fulfilled, state cleared");
      })
      .addCase(signOut.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.msg || "Logout failed";
        console.log("signOut rejected, error:", state.error);
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        console.log("registerUser pending");
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
        console.log("registerUser fulfilled");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error || "Registration failed";
        console.log("registerUser rejected, error:", state.error);
      })
      // Update User
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
        console.log("updateUser pending");
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user || action.payload.data?.user || null;
        state.error = null;
        console.log("updateUser fulfilled, user updated:", state.user);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error || "Update failed";
        console.log("updateUser rejected, error:", state.error);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
