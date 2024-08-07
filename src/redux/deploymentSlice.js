import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDeploymentData = createAsyncThunk(
  'deployment/fetchDeploymentData',
  async (templateID, { rejectWithValue }) => {
    const authToken = "QW4gZWxlZ2FudCBzd2VldCBwb3RhdG8gbWUgZ29vZA==";
    try {
      const response = await fetch(
        "https://service.api.nexlayer.ai/startdeployment/0001",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ templateID }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // Save the data to localStorage
      localStorage.setItem('deploymentData', JSON.stringify(data));
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
    responseData: JSON.parse(localStorage.getItem('deploymentData')) || null,
    loading: false,
    error: null,
  },
  reducers: {},
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
        // Update localStorage with the new data
        localStorage.setItem('deploymentData', JSON.stringify(action.payload));
      })
      .addCase(fetchDeploymentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default deploymentSlice.reducer;
