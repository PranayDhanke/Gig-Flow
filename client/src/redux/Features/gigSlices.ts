import { CreateGig, GetAllGigs, GetGig, GetMyGigs } from "@/api/gig";
import type { Gig } from "@/types/gig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createGig = createAsyncThunk(
  "gig/create",
  async (data: Partial<Gig>) => {
    const res = await CreateGig(data);
    return res.data;
  }
);

export const getGigs = createAsyncThunk("gig/getAll", async () => {
  const res = await GetAllGigs();
  return res.data;
});

export const getGig = createAsyncThunk("gig/get", async (id: string) => {
  const res = await GetGig(id);
  return res.data;
});

export const getmyGig = createAsyncThunk(
  "gig/getMyGigs",
  async (id: string) => {
    const res = await GetMyGigs(id);
    return res.data;
  }
);

interface gigSlices {
  gigs: Gig[];
  gig: Gig | null;
  myGigs: Gig[];
  isloading: boolean;
  error: string | null;
}

const initialSlice: gigSlices = {
  gigs: [],
  gig: null,
  myGigs: [],
  isloading: false,
  error: null,
};

export const gigSlice = createSlice({
  name: "gig",
  initialState: initialSlice,
  reducers: {},
  extraReducers: (builder) => {
    //create gig
    builder.addCase(createGig.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(createGig.fulfilled, (state, action) => {
      state.isloading = false;
      state.gigs.unshift(action.payload);
    });
    builder.addCase(createGig.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.error.message || "Cretion gig failed";
    });

    //get gigs
    builder.addCase(getGigs.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(getGigs.fulfilled, (state, action) => {
      state.isloading = false;
      state.gigs = action.payload;
    });
    builder.addCase(getGigs.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.error.message || "getting gig failed";
    });

    //get gig
    builder.addCase(getGig.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(getGig.fulfilled, (state, action) => {
      state.isloading = false;
      state.gig = action.payload;
    });
    builder.addCase(getGig.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.error.message || "getting gigs failed";
    });

    //my gig
    builder.addCase(getmyGig.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(getmyGig.fulfilled, (state, action) => {
      state.isloading = false;
      state.myGigs = action.payload;
    });
    builder.addCase(getmyGig.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.error.message || "getting my gig failed";
    });
  },
});

export default gigSlice.reducer;
