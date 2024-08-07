// src/slices/deploymentSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch deployment data
export const fetchDeploymentData = createAsyncThunk(
  'deployment/fetchDeploymentData',
  async (templateID, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/startTemplateDeployment/${templateID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ templateID }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLogsData = createAsyncThunk(
  'deployment/fetchLogsData',
  async ({ namespace, templateID }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/getDeploymentLogs/${namespace}/${templateID}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.text();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const deploymentSlice = createSlice({
  name: 'deployment',
  initialState: {
    namespace: null,
    message: null,
    responseData: null,
    logsData: null,
    isLogsFetched: {},
    loading: false,
    error: null,
  },
  reducers: {
    resetDeploymentState: (state) => {
      state.namespace = null;
      state.message = null;
      state.logsData = null;
      state.isLogsFetched = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeploymentData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeploymentData.fulfilled, (state, action) => {
        state.loading = false;
        state.responseData = action.payload;
        state.namespace = action.payload.namespace;
        state.message = action.payload.message;
      })
      .addCase(fetchDeploymentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLogsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogsData.fulfilled, (state, action) => {
        state.loading = false;
        state.logsData = action.payload;
        state.isLogsFetched[state.namespace] = true;
      })
      .addCase(fetchLogsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetDeploymentState } = deploymentSlice.actions;

export default deploymentSlice.reducer;
