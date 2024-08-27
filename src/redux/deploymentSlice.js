import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setLogsCompleted } from "./chatActions";
const SOCKET_SERVER_URL = "http://localhost:3003";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch deployment data
export const fetchDeploymentData = createAsyncThunk(
  "/startTemplateDeployment/:templateID",
  async (templateID, { rejectWithValue, dispatch, getState }) => {
    const { deployment } = getState();
    if (deployment.isFetching) return;

    try {
      dispatch(setFetching(true));

      const response = await fetch(
        `${SOCKET_SERVER_URL}/startTemplateDeployment/${templateID}`,
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

      dispatch(setNamespace(data.namespace));
      await delay(2000);

      dispatch(fetchLogsData({ namespace: data.namespace, templateID }));
      return data;
    } catch (error) {
      console.error("Error in fetchDeploymentData:", error);
      return rejectWithValue(error.message);
    } finally {
      dispatch(setFetching(false));
    }
  }
);

export const fetchLogsData = createAsyncThunk(
  "/getDeploymentLogs/:namespace/:templateID",
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
      let previousChunks = new Set();
      let deploymentComplete = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value || new Uint8Array(), {
          stream: !done,
        });

        if (!previousChunks.has(chunk)) {
          previousChunks.add(chunk);
          await delay(1000);
          console.log("Chunk received:", chunk);
          dispatch(updateLogs({ namespace, chunk }));

          // Check if the chunk indicates that the deployment is complete
          if (chunk.includes("Deployment Complete")) {
            deploymentComplete = true;
          }
        }
      }

      if (deploymentComplete) {
        dispatch(setLogsCompleted(true));
      } else {
        dispatch(setLogsCompleted(false));
      }

      return { namespace, completed: deploymentComplete };
    } catch (error) {
      console.error("Error in fetchLogsData:", error);
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
    isFetching: false,
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
      if (!state.logsData.includes(action.payload.chunk)) {
        state.logsData.push(action.payload.chunk);
      }
    },
    setNamespace(state, action) {
      state.namespace = action.payload;
    },
    setFetching: (state, action) => {
      state.isFetching = action.payload;
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

export const { resetDeploymentState, updateLogs, setFetching, setNamespace } =
  deploymentSlice.actions;

export default deploymentSlice.reducer;
