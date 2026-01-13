import { CreateBid, GetBids, GetMyBids, HireFreelancer } from "@/api/bid";
import type { Bid } from "@/types/bid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createBid = createAsyncThunk(
  "bid/create",
  async (data: Partial<Bid>) => {
    const res = await CreateBid(data);
    return res.data;
  }
);

export const getGigBid = createAsyncThunk(
  "bid/getforGig",
  async (id: string) => {
    const res = await GetBids(id);
    return res.data;
  }
);

export const getMyBids = createAsyncThunk(
  "bid/getMyBids",
  async (id: string) => {
    const res = await GetMyBids(id);
    return res.data;
  }
);

export const hireFreelancer = createAsyncThunk(
  "bid/hireFreelancer",
  async (bidId: string) => {
    const res = await HireFreelancer(bidId);
    return res.data;
  }
);

interface bidInterface {
  bids: Bid[];
  mybids: Bid[];
  loading: boolean;
  error: string;
}

const initialBid: bidInterface = {
  bids: [],
  mybids: [],
  loading: false,
  error: "",
};
export const bidSlices = createSlice({
  name: "bid",
  initialState: initialBid,
  reducers: {},
  extraReducers: (builder) => {
    //create bid
    builder.addCase(createBid.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBid.fulfilled, (state, action) => {
      state.loading = false;
      state.mybids.unshift(action.payload);
    });
    builder.addCase(createBid.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Cretion bid failed";
    });

    //get bid gig
    builder.addCase(getGigBid.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getGigBid.fulfilled, (state, action) => {
      state.loading = false;
      state.bids = action.payload;
    });
    builder.addCase(getGigBid.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "getting bids failed";
    });

    // get bid
    builder.addCase(getMyBids.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMyBids.fulfilled, (state, action) => {
      state.loading = false;
      state.mybids = action.payload;
    });
    builder.addCase(getMyBids.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "getting bids failed";
    });

    //hire
    builder.addCase(hireFreelancer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(hireFreelancer.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(hireFreelancer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "hiring freelancer failed";
    });
  },
});

export default bidSlices.reducer;
