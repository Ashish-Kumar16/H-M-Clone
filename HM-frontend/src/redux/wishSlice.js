import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://hm-backend-wdt8.onrender.com/api/wishlist"; // Adjust to your backend URL

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (wishData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, wishData, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      console.error("Add to wishlist error:", error.response?.data || error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to add to wishlist" },
      );
    }
  },
);

export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, { withCredentials: true });
      console.log("Wishlist response:", response.data);
      return response.data.data;
    } catch (error) {
      console.error("Get wishlist error:", error.response?.data || error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch wishlist" },
      );
    }
  },
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productCode, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/${productCode}`, {
        withCredentials: true,
      });
      return { productCode }; // Return productCode for reducer
    } catch (error) {
      console.error(
        "Remove from wishlist error:",
        error.response?.data || error,
      );
      return rejectWithValue(
        error.response?.data || { message: "Failed to remove from wishlist" },
      );
    }
  },
);

const wishSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(getWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter(
          (item) => item.productCode !== action.payload.productCode,
        );
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export default wishSlice.reducer;
