import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const SOCKET_SERVER_URL = "http://localhost:3003";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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

export const fetchLogsData = createAsyncThunk(
  `/getDeploymentLogs/:namespace/:templateID`,
  async ({ namespace, templateID }, { rejectWithValue, dispatch }) => {
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

      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value || new Uint8Array(), {
          stream: !done,
        });

        await delay(2000);
        console.log("Chunk received:", chunk);

        dispatch(updateLogs({ namespace, chunk }));

      }

      return { namespace, completed: true };
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
      state.logsData.push(action.payload.chunk);
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
        state.templateID = action.meta.arg;
        state.message = action.payload.message;
      })
      .addCase(fetchDeploymentData.rejected, (state, action) => {
        console.error("Failed to fetch deployment data:", action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLogsData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.logsData = [];
      })
      .addCase(fetchLogsData.fulfilled, (state, action) => {
        if (action.payload.completed) {
          state.loading = false;
          state.isLogsFetched[action.meta.arg.namespace] = true;
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
