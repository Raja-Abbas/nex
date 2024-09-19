import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { cardsData } from "../constants/Framework";

const SOCKET_SERVER_URL = "http://localhost:3003";
const API_SERVER_URL = "https://app.nexlayer.io";
const getSlugByTemplateID = (templateID) => {
  const card = cardsData.find((card) => card.templateID === templateID);
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
    if (error.message.includes("ERR_QUIC_PROTOCOL_ERROR") && retries > 0) {
      console.warn(
        `Fetch failed with ERR_QUIC_PROTOCOL_ERROR. Retrying in ${delayMs}ms...`,
        error,
      );
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      return fetchWithRetry(url, options, retries - 1, delayMs);
    } else {
      throw error;
    }
  }
};
export const fetchDeploymentStatus = createAsyncThunk(
  "deployment/fetchStatus",
  async (
    { namespace, templateID, deploymentName, url },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await fetch(
        `${API_SERVER_URL}/checkSiteStatus/${namespace}/${deploymentName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          `Error fetching deployment status. Status: ${response.status}`,
        );
      }

      const deploymentData = await response.json();
      const startTime = new Date().toISOString();
      let deploymentComplete = false;
      if (deploymentData.message === "ready") {
        dispatch(setDeploymentMessage(deploymentData.message));
        const endTime = new Date().toISOString();
        const slug = getSlugByTemplateID(templateID);
        deploymentComplete = true;
        Cookies.set("templateID", templateID);
        Cookies.set("namespace", namespace);
        Cookies.set("startTime", startTime);
        Cookies.set("endTime", endTime);
        Cookies.set("slug", slug);
        Cookies.set("deploymentSuccess", deploymentComplete);
        Cookies.set("deploymentUrl", url);
      }

      return deploymentData;
    } catch (error) {
      console.error("Error in fetchDeploymentStatus:", error);
      return rejectWithValue(error.message);
    }
  },
);

// Fetch deployment data
export const fetchDeploymentData = createAsyncThunk(
  "/startTemplateDeployment/:templateID",
  async (templateID, { rejectWithValue, dispatch, getState }) => {
    const { deployment } = getState();
    if (deployment.isFetching) return;

    try {
      dispatch(setFetching(true));

      const response = await fetchWithRetry(
        `${SOCKET_SERVER_URL}/startTemplateDeployment/${templateID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ templateID }),
        },
      );

      const data = await response.json();

      if (!data.namespace || !data.message) {
        throw new Error("Namespace or message is missing in the response.");
      }
      dispatch(setNamespace(data.namespace));
      dispatch(setDeploymentMessage("ready"));
      dispatch(setUrl(data.url));
      return data;
    } catch (error) {
      console.error("Error in fetchDeploymentData:", error);
      return rejectWithValue(error.message);
    } finally {
      dispatch(setFetching(false));
    }
  },
);

// Fetch logs data
export const fetchLogsData = createAsyncThunk(
  "/getDeploymentLogs/:namespace/:templateID",
  async (
    { namespace, templateID, startTime, url },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await fetch(
        `${SOCKET_SERVER_URL}/getDeploymentLogs/${namespace}/${templateID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          `Error fetching deployment logs. Status: ${response.status}`,
        );
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      let logsBuffer = "";
      const allLogs = [];

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;

        const chunk = decoder.decode(value || new Uint8Array(), {
          stream: !done,
        });

        if (chunk) {
          logsBuffer += chunk;
          if (chunk.includes("Deployment Complete")) {
            allLogs.push(logsBuffer);
            localStorage.setItem("deploymentLogs", JSON.stringify(allLogs));
            logsBuffer = "";
          } else {
            dispatch(updateLogs({ namespace, chunk: logsBuffer }));
            logsBuffer = "";
          }
        }
      }

      dispatch(setLogsCompleted(true));
      return { namespace, completed: true, logsData: true };
    } catch (error) {
      console.error("Error in fetchLogsData:", error);
      return rejectWithValue(error.message);
    }
  },
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
    logsCompleted: false,
    slug: null,
  },
  reducers: {
    resetDeploymentState: (state) => {
      state.templateID = null;
      state.namespace = null;
      state.message = null;
      state.url = null;
      state.logsData = [];
      state.isLogsFetched = {};
      state.logsCompleted = false;
      state.slug = null;
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
    setDeploymentMessage(state, action) {
      state.message = action.payload;
    },
    setLogsCompleted: (state) => {
      state.logsCompleted = true;
    },
    setUrl(state, action) {
      state.url = action.payload;
    },
    setSlug(state, action) {
      state.slug = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogsData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.logsData = [];
      })
      .addCase(fetchLogsData.fulfilled, (state, action) => {
        if (action.payload.completed) {
          state.loading = false;
          state.isLogsFetched[action.meta.arg.namespace] = true;
          state.logsCompleted = true;
        }
      })
      .addCase(fetchLogsData.rejected, (state, action) => {
        console.error("Failed to fetch logs data:", action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  resetDeploymentState,
  updateLogs,
  setFetching,
  setNamespace,
  setDeploymentMessage,
  setUrl,
  setSlug,
  setLogsCompleted,
} = deploymentSlice.actions;

export default deploymentSlice.reducer;

