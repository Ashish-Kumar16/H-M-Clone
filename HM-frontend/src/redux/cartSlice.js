import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://hm-backend-wdt8.onrender.com/api/cart"; // Matches backend

// Async thunks
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartData, { rejectWithValue }) => {
    try {
      console.log("addToCart - Sending data:", cartData);
      const response = await axios.post(API_URL, cartData, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      console.error("addToCart error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || { message: "Failed to add to cart" },
      );
    }
  },
);

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, {
        withCredentials: true,
      });
      return response.data.data; // Array of cart items
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch cart" },
      );
    }
  },
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ cartId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/${cartId}`,
        { quantity },
        { withCredentials: true },
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update cart" },
      );
    }
  },
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (cartId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/${cartId}`, {
        withCredentials: true,
      });
      return cartId; // Return cartId for local filtering
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to remove from cart" },
      );
    }
  },
);

// Add clearCart thunk to clear all items from the cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      await axios.delete(API_URL, {
        withCredentials: true,
      });
      return []; // Return an empty array to clear the state
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to clear cart" },
      );
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(getCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id,
        );
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      // Handle clearCart
      .addCase(clearCart.fulfilled, (state) => {
        state.status = "succeeded";
        state.items = []; // Clear the items array
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export default cartSlice.reducer;
