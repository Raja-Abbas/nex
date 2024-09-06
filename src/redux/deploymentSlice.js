import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setLogsCompleted } from "./chatActions";
import Cookies from "js-cookie";
import { cardsData } from "../constants/Framework";

const SOCKET_SERVER_URL = "http://localhost:3003";

const getSlugByTemplateID = (templateID) => {
  const card = cardsData.find(card => card.templateID === templateID);
  return card ? card.slug : null;
};

const fetchWithRetry = async (url, options, retries = 3, delayMs = 1000) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  } catch (error) {
    if (error.message.includes('ERR_QUIC_PROTOCOL_ERROR') && retries > 0) {
      console.warn(`Fetch failed with ERR_QUIC_PROTOCOL_ERROR. Retrying in ${delayMs}ms...`, error);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      return fetchWithRetry(url, options, retries - 1, delayMs);
    } else {
      throw error;
    }
  }
};

// Fetch deployment data
export const fetchDeploymentData = createAsyncThunk(
  "/startTemplateDeployment/:templateID",
  async (templateID, { rejectWithValue, dispatch, getState }) => {
    const { deployment } = getState();
    if (deployment.isFetching) return;

    try {
      dispatch(setFetching(true));
      
      const startTime = new Date().toISOString();

      const response = await fetchWithRetry(
        `/startTemplateDeployment/${templateID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ templateID }),
        }
      );

      const data = await response.json();

      if (!data.namespace || !data.message) {
        throw new Error("Namespace or message is missing in the response.");
      }

      if (data.url) {
        console.log("Deployment URL:", data.url);
      }

      dispatch(setNamespace(data.namespace));
      await new Promise((resolve) => setTimeout(resolve, 2000));

      dispatch(fetchLogsData({ namespace: data.namespace, templateID, startTime }));
      return data;
    } catch (error) {
      console.error("Error in fetchDeploymentData:", error);
      return rejectWithValue(error.message);
    } finally {
      dispatch(setFetching(false));
    }
  }
);

// Fetch logs data
export const fetchLogsData = createAsyncThunk(
  "/getDeploymentLogs/:namespace/:templateID",
  async ({ namespace, templateID, startTime }, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await fetchWithRetry(
        `/getDeploymentLogs/${namespace}/${templateID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let done = false;
      let deploymentComplete = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value || new Uint8Array(), {
          stream: !done,
        });

        console.log("Chunk received:", chunk);

        if (chunk) {
          dispatch(updateLogs({ namespace, chunk }));

          if (chunk.includes("Deployment Complete")) {
            deploymentComplete = true;

            const endTime = new Date().toISOString();

            const slug = getSlugByTemplateID(templateID);

            Cookies.set("templateID", templateID, { expires: 7 });
            Cookies.set("namespace", namespace, { expires: 7 });
            Cookies.set("startTime", startTime, { expires: 7 });
            Cookies.set("endTime", endTime, { expires: 7 });
            Cookies.set("slug", slug, { expires: 7 });
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
    url: null,
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
        state.url = action.payload.url;
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

export const { resetDeploymentState, updateLogs, setFetching, setNamespace } = deploymentSlice.actions;

export default deploymentSlice.reducer;
