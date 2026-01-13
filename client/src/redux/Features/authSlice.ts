import { getMe, LoginUser, LogoutUser, RegisterUser } from "@/api/auth";
import type { authLogin, authRegister, User } from "@/types/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (data: authRegister) => {
    const res = await RegisterUser(data);
    return res.data;
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: authLogin) => {
    const res = await LoginUser(data);
    return res.data;
  }
);

export const findMe = createAsyncThunk("auth/findMe", async () => {
  const res = await getMe();
  return res.data;
});

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  await LogoutUser();
});


interface authSlice {
  user: User | null;
  isLoading: boolean;
  error: string;
  checkAuth: boolean;
}

const initials: authSlice = {
  user: null,
  checkAuth: false,
  error: "",
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initials,
  reducers: {},
  extraReducers: (builder) => {
    // register cases
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Register Failed";
    });

    // login cases
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Login Failed";
    });

    //getme case
    builder.addCase(findMe.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.checkAuth = true;
    });
    builder.addCase(findMe.pending, (state) => {
      state.isLoading = true;
      state.checkAuth = false;
    });
    builder.addCase(findMe.rejected, (state) => {
      state.user = null;
      state.isLoading = false;
      state.checkAuth = true;
    });

    //logout case
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLoading = false;
      state.user = null;
      state.checkAuth = true;
    });
  },
});

export default authSlice.reducer;
