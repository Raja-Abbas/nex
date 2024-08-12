import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch deployment data
export const fetchDeploymentData = createAsyncThunk(
  "/startTemplateDeployment/:templateID",
  async (templateID, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3003/startTemplateDeployment/${templateID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ templateID }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.namespace || !data.message) {
        throw new Error("Namespace or message is missing in the response.");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const SOCKET_SERVER_URL = "http://localhost:3003";

export const fetchLogsData = createAsyncThunk(
  `/getDeploymentLogs/:namespace/:templateID`,
  async ({ namespace, templateID }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${SOCKET_SERVER_URL}/getDeploymentLogs/${namespace}/${templateID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let streamData = "";
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value || new Uint8Array(), {
          stream: !done,
        });
        streamData += chunk;
      }

      console.log("Raw streamed data:", streamData);

      try {
        const data = JSON.parse(streamData);
        return data;
      } catch (error) {
        return streamData;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const deploymentSlice = createSlice({
  name: "deployment",
  initialState: {
    templateID: null,
    namespace: null,
    message: null,
    responseData: null,
    logsData: [],
    isLogsFetched: {},
    loading: false,
    error: null,
  },
  reducers: {
    resetDeploymentState: (state) => {
      state.templateID = null;
      state.namespace = null;
      state.message = null;
      state.logsData = [];
      state.isLogsFetched = {};
    },
    updateLogs: (state, action) => {
      console.log("Updating logs in the state:", action.payload);
      state.logsData.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeploymentData.pending, (state) => {
        console.log("Fetching deployment data...");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeploymentData.fulfilled, (state, action) => {
        console.log("Deployment data fetched successfully:", action.payload);
        state.loading = false;
        state.responseData = action.payload;
        state.namespace = action.payload.namespace;
        state.templateID = action.meta.arg;
        state.message = action.payload.message;
      })
      .addCase(fetchDeploymentData.rejected, (state, action) => {
        console.error("Failed to fetch deployment data:", action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLogsData.pending, (state) => {
        console.log("Fetching logs data...");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogsData.fulfilled, (state, action) => {
        if (action.payload !== null) {
          console.log("Logs data fetched successfully:", action.payload);
          state.loading = false;
          state.logsData = action.payload;
          state.isLogsFetched[state.namespace] = true;
        }
      })
      .addCase(fetchLogsData.rejected, (state, action) => {
        console.error("Failed to fetch logs data:", action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetDeploymentState, updateLogs } = deploymentSlice.actions;

export default deploymentSlice.reducer;
