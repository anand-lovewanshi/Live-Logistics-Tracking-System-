import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await axiosInstance.get(`/products?${query}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch");
    }
  }
);

export const fetchFilterMeta = createAsyncThunk(
  "products/meta",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/products/meta/filters");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/products", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/products/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    total: 0,
    page: 1,
    pages: 1,
    loading: false,
    error: null,
    meta: { categories: [], brands: [], priceRange: { min: 0, max: 100000 } },
    filters: {
      search: "",
      category: [],
      brand: [],
      minPrice: "",
      maxPrice: "",
      rating: "",
      inStock: false,
      sort: "newest",
      page: 1,
      limit: 12
    }
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload, page: 1 };
    },
    setPage: (state, action) => {
      state.filters.page = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {
        search: "",
        category: [],
        brand: [],
        minPrice: "",
        maxPrice: "",
        rating: "",
        inStock: false,
        sort: "newest",
        page: 1,
        limit: 12
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchProducts.fulfilled, (s, a) => {
        s.loading = false;
        s.items = a.payload.products;
        s.total = a.payload.total;
        s.page = a.payload.page;
        s.pages = a.payload.pages;
      })
      .addCase(fetchProducts.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(fetchFilterMeta.fulfilled, (s, a) => {
        s.meta = a.payload;
      })
      .addCase(deleteProduct.fulfilled, (s, a) => {
        s.items = s.items.filter((p) => p._id !== a.payload);
      });
  }
});

export const { setFilters, setPage, resetFilters } = productSlice.actions;
export default productSlice.reducer;
