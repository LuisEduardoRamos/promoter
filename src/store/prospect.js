import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

export const getProspects = createAsyncThunk(
  "prospect/getProspects",
  async () => {
    const response = await api("GET", "prospects");
    return response;
  }
);

export const getProspect = createAsyncThunk(
  "prospect/getProspect",
  async (id) => {
    const response = await api("GET", `prospect/${id}`);
    return response;
  }
);

export const updateProspect = createAsyncThunk(
  "prospect/updateProspect",
  async ({ id, data }) => {
    const response = await api("PUT", `prospect/${id}`, data);
    return response;
  }
);

const prospectReducer = createSlice({
  name: "prospect",
  initialState: {
    prospects: [],
    prospect: {},
    status: "idle",
    prospectStatus: "idle",
    filterTerm: "",
    error: null,
  },
  reducers: {
    filterProspects: (state, action) => {
      state.filterTerm = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProspects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProspects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.prospects = action.payload;
      })
      .addCase(getProspects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(getProspect.pending, (state) => {
        state.prospectStatus = "loading";
      })
      .addCase(getProspect.fulfilled, (state, action) => {
        state.prospectStatus = "succeeded";
        state.prospect = action.payload;
      })
      .addCase(getProspect.rejected, (state, action) => {
        state.prospectStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(updateProspect.pending, (state) => {
        state.prospectStatus = "loading";
      })
      .addCase(updateProspect.fulfilled, (state, action) => {
        state.prospectStatus = "succeeded";
        state.prospect = action.payload;
      })
      .addCase(updateProspect.rejected, (state, action) => {
        state.prospectStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const { filterProspects } = prospectReducer.actions;
export default prospectReducer.reducer;
