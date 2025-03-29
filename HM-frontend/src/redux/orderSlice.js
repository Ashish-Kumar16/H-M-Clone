import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://hm-backend-wdt8.onrender.com/api/orders";

// Async thunks
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, orderData, {
        withCredentials: true, // Rely on HTTP-only cookies for auth
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to create order" },
      );
    }
  },
);

export const verifyPayment = createAsyncThunk(
  "orders/verifyPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/verify-payment`,
        paymentData,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to verify payment" },
      );
    }
  },
);

export const getOrder = createAsyncThunk(
  "orders/getOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${orderId}`, {
        withCredentials: true,
      });
      return response.data.order;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to fetch order" },
      );
    }
  },
);

export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  async ({ orderId, cancelData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/${orderId}/cancel`,
        cancelData,
        {
          withCredentials: true,
        },
      );
      return response.data.order;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to cancel order" },
      );
    }
  },
);

export const getUserOrders = createAsyncThunk(
  "orders/getUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/user`, {
        withCredentials: true,
      });
      return response.data.orders;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch orders",
      );
    }
  },
);
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    currentOrder: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Create Order
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      })
      // Verify Payment
      .addCase(verifyPayment.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (order) => order.orderId === action.payload.orderId,
        );
        if (index !== -1) state.orders[index].paymentStatus = "completed";
        if (state.currentOrder?.orderId === action.payload.orderId) {
          state.currentOrder.paymentStatus = "completed";
        }
      })
      // Get Order
      .addCase(getOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
      })
      // Cancel Order
      .addCase(cancelOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id,
        );
        if (index !== -1) state.orders[index] = action.payload;
        if (state.currentOrder?._id === action.payload._id) {
          state.currentOrder = action.payload;
        }
      })
      // Get User Orders
      .addCase(getUserOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch orders";
      });
  },
});

export default orderSlice.reducer;
