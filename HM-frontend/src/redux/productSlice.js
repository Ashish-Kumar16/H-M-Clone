import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://hm-backend-wdt8.onrender.com/api/products"; // Adjust if your backend URL differs

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      const productSummaries = response.data.data;
      console.log("fetchProducts summaries:", productSummaries);
      const detailedProducts = await Promise.all(
        productSummaries.map(async (product) => {
          const detailResponse = await axios.get(`${API_URL}/${product._id}`);
          return detailResponse.data.data;
        }),
      );
      console.log("fetchProducts detailed products:", detailedProducts);
      return detailedProducts;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch products",
      );
    }
  },
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async ({ id, productCode }, { rejectWithValue }) => {
    try {
      const url = productCode
        ? `${API_URL}/${id}/${productCode}`
        : `${API_URL}/${id}`;
      const response = await axios.get(url);
      console.log("fetchProductById response:", response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product",
      );
    }
  },
);

// Updated searchProducts to use category endpoint
export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/category/${category}`);
      const productSummaries = response.data.data;
      console.log("searchProducts summaries for category:", productSummaries);
      const detailedProducts = await Promise.all(
        productSummaries.map(async (product) => {
          const detailResponse = await axios.get(`${API_URL}/${product._id}`);
          return detailResponse.data.data;
        }),
      );
      console.log("searchProducts detailed products:", detailedProducts);
      return detailedProducts;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to search products",
      );
    }
  },
);
export const searchProductsByQuery = createAsyncThunk(
  "products/searchProductsByQuery",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/search?query=${query}`);
      return response.data.data; // Return the array of products
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to search products",
      );
    }
  },
);
export const getSearchSuggestions = createAsyncThunk(
  "products/getSearchSuggestions",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/suggestions?query=${query}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch suggestions",
      );
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    currentProduct: null,
    suggestions: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
      state.status = "idle";
      state.error = null;
    },
    clearProducts: (state) => {
      state.products = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to fetch products";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch product";
      })
      .addCase(searchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to search products";
      })
      .addCase(searchProductsByQuery.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchProductsByQuery.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(searchProductsByQuery.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to search products";
      })
      .addCase(getSearchSuggestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSearchSuggestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.suggestions = action.payload;
      })
      .addCase(getSearchSuggestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to fetch suggestions";
      });
  },
});

export const { clearCurrentProduct, clearProducts } = productSlice.actions;
export default productSlice.reducer;
