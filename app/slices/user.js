import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const URL = 'https://e-comerce-api-a37q.vercel.app'

export const logIn = createAsyncThunk("user/logIn", async (info, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const response = await fetch(`${URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(info),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    rejectWithValue(error);
  }
});

export const register = createAsyncThunk(
  "user/register",
  async (info, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await fetch(`${URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(info),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: false,
    loading: null,
    error: null,
  },
  // Login method
  extraReducers: (builder) => {
    builder.addCase(logIn.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    // rigister method
    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default userSlice.reducer;
