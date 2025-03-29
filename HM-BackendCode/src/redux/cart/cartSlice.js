import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://hm-backend-wdt8.onrender.com"; // Replace with your backend API URL

// Initial state
const initialState = {
  cartItems: [], // Ensure it's an empty array by default
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

// Thunk to update product quantity
export const updateProductQuantity = createAsyncThunk(
  "cart/updateProductQuantity",
  async ({ id, quantity }, { getState, dispatch }) => {
    try {
      const response = await fetch(`${API}/carts/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to update product quantity.");
      }

      const data = await response.json();
      return data; // Return updated product
    } catch (error) {
      throw new Error(error.message);
    }
  },
);

// Thunk to fetch all cart items
export const fetchAllCartItems = createAsyncThunk(
  "cart/fetchAllCartItems",
  async () => {
    const response = await axios.get(`${API}/carts`);
    console.log("API Response:", response); // Log full API response
    return response.data && response.data.carts ? response.data.carts : []; // Ensure it's always an array
  },
);

// Thunk to add product to the cart
export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async (productId) => {
    const response = await axios.post(`${API}/carts/add/${productId}`);
    return response.data; // Return added product
  },
);

// Thunk to remove product from the cart
export const deleteProductFromCart = createAsyncThunk(
  "cart/deleteProductFromCart",
  async (productId, { dispatch }) => {
    try {
      const response = await axios.delete(`${API}/carts/delete/${productId}`);

      // If deletion is successful, immediately update the frontend state
      if (response.data.deletedProduct) {
        dispatch(removeProductFromCart(productId)); // Dispatch action to remove item from Redux state
      }

      return response.data.deletedProduct; // Return removed product
    } catch (error) {
      throw new Error(error.message);
    }
  },
);

// Action to remove product from the cart in the Redux state
export const removeProductFromCart = (productId) => ({
  type: "cart/removeProductFromCart",
  payload: productId,
});

// Slice for the cart
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems(state, action) {
      state.cartItems = action.payload;
    },
    removeProductFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload,
      ); // Filter out the removed product by ID
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart items
      .addCase(fetchAllCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCartItems.fulfilled, (state, action) => {
        console.log("Fetched cart items:", action.payload); // Debugging
        state.status = "succeeded";
        state.cartItems = action.payload || []; // Ensure it's an array
      })
      .addCase(fetchAllCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Capture error message
      })

      // Update product quantity
      .addCase(updateProductQuantity.fulfilled, (state, action) => {
        const updatedItem = action.payload; // Ensure the updated product is returned
        if (!updatedItem || !updatedItem._id) {
          console.error("Invalid updated item:", updatedItem);
          return;
        }
        const index = state.cartItems.findIndex(
          (item) => item._id === updatedItem._id,
        );
        if (index !== -1) {
          state.cartItems[index] = updatedItem; // Update cart item with the new quantity
        }
      })
      .addCase(updateProductQuantity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Capture error message if failed
      })

      // Add product to the cart
      .addCase(addProductToCart.fulfilled, (state, action) => {
        const newProduct = action.payload;
        if (!newProduct || !newProduct._id) {
          console.error("Invalid new product:", newProduct);
          return;
        }
        const index = state.cartItems.findIndex(
          (item) => item._id === newProduct._id,
        );
        if (index === -1) {
          state.cartItems.push(newProduct); // Add new product if it's not in cart
        } else {
          state.cartItems[index] = newProduct; // Update if product already in cart
        }
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Capture error message if failed
      })

      // Remove product from the cart
      .addCase(deleteProductFromCart.fulfilled, (state, action) => {
        const deletedProduct = action.payload;
        if (!deletedProduct || !deletedProduct._id) {
          console.error("Invalid deleted product:", deletedProduct);
          return;
        }
        // This is handled by the removeProductFromCart reducer above
      })
      .addCase(deleteProductFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Capture error message if failed
      });
  },
});

export const { setCartItems } = cartSlice.actions;

export default cartSlice.reducer;
