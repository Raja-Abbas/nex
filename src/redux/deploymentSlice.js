import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import io from 'socket.io-client';

// Fetch deployment data
export const fetchDeploymentData = createAsyncThunk(
  '/startTemplateDeployment/:templateID',
  async (templateID, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://service.api.nexlayer.ai/startDeployment/${templateID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer QW4gZWxlZ2FudCBzd2VldCBwb3RhdG8gbWUgZ29vZA==`
          },
          body: JSON.stringify({ templateID }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.namespace || !data.message) {
        throw new Error('Namespace or message is missing in the response.');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const SOCKET_SERVER_URL = 'https://service.api.nexlayer.ai';

export const fetchLogsData = createAsyncThunk(
  '/getDeploymentLogs/:namespace/:templateID',
  async (_, { getState, rejectWithValue }) => {
    const state = getState().deployment;
    const { namespace, templateID, isLogsFetched } = state;

    if (!namespace || !templateID) {
      console.log("Namespace or TemplateID is missing.");
      return rejectWithValue("Namespace or TemplateID is missing.");
    }

    if (isLogsFetched[namespace]) {
      console.log(`Logs already fetched for namespace: ${namespace}`);
      return null;
    }

    console.log("Connecting to Socket.IO server...");
    const socket = io(SOCKET_SERVER_URL, {
      transports: ['websocket'],
      query: {
        namespace,
        templateID
      }
    });

    return new Promise((resolve, reject) => {
      socket.on('connect', () => {
        console.log("Connected to Socket.IO server");
      });

      socket.on('connect_error', (error) => {
        console.error(`Socket connection error: ${error.message}`);
        reject(rejectWithValue(`Socket connection error: ${error.message}`));
      });

      socket.on('logs', (data) => {
        console.log("Received logs data:", data);
        resolve(data);
      });

      socket.on('error', (error) => {
        console.error(`Socket error: ${error.message}`);
        reject(rejectWithValue(`Socket error: ${error.message}`));
        socket.disconnect();
      });

      socket.on('disconnect', () => {
        console.warn('Socket disconnected unexpectedly.');
        reject(rejectWithValue('Socket disconnected unexpectedly.'));
      });
    });
  }
);

const deploymentSlice = createSlice({
  name: 'deployment',
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
