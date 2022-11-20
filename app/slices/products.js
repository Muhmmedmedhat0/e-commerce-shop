import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const URL = 'https://e-comerce-api-a37q.vercel.app'

// get products from server and store them in the store
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (category, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch(
        category
          ? `${URL}/api/products?category=${category}`
          : `${URL}/api/products`,
      );
      const data = await response.json();
      return data.products;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);
// get product by id
export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch(
        `${URL}/api/products/find/${id}`,
      );
      const data = await response.json();
      // console.log(data.product);
      return data.product;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

// create slice for products
const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    // get al products
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // get single product
    builder.addCase(fetchProduct.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
// export reducer
export default productsSlice.reducer;
