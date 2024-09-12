import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setLogsCompleted } from "./chatActions";
import Cookies from "js-cookie";
import { cardsData } from "../constants/Framework";

const SOCKET_SERVER_URL = "http://localhost:3003";
const API_SERVER_URL = "http://app.nexlayer.io";
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
        error
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
    { namespace, templateID, deploymentName, startTime, url },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await fetch(
        `${API_SERVER_URL}/checkSiteStatus/${namespace}/${deploymentName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Error fetching deployment status. Status: ${response.status}`
        );
      }
      const startTime = new Date().toISOString();
      const deploymentData = await response.json();
      let deploymentComplete = false;
      if (deploymentData.message === "ready") {
        const endTime = new Date().toISOString();
        const slug = getSlugByTemplateID(templateID);
        const URL = url || "";
        deploymentComplete = true;
        Cookies.set("templateID", templateID);
        Cookies.set("namespace", namespace);
        Cookies.set("startTime", startTime);
        Cookies.set("endTime", endTime);
        Cookies.set("slug", slug);
        Cookies.set("deploymentSuccess", deploymentComplete);
        Cookies.set("deploymentUrl", URL);

        return { deploymentStatus: "complete" };
      }

      return { deploymentStatus: "in_progress" };
    } catch (error) {
      console.error("Error in fetchDeploymentStatus:", error);
      return rejectWithValue(error.message);
    }
  }
);

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
        `${SOCKET_SERVER_URL}/startTemplateDeployment/${templateID}`,
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

      dispatch(
        fetchLogsData({
          namespace: data.namespace,
          templateID,
          startTime,
          url: data.url,
        })
      );
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
  async (
    { namespace, templateID, startTime, url },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const previousNamespace = Cookies.get("namespace");
      const previousSlug = Cookies.get("slug");
      const previousTemplateID = Cookies.get("templateID");

      if (
        previousNamespace !== namespace ||
        previousSlug !== getSlugByTemplateID(templateID) ||
        previousTemplateID !== templateID
      ) {
        Cookies.set("namespace", null);
        Cookies.set("slug", null);
        Cookies.set("templateID", null);
        Cookies.set("deploymentSuccess", false);
        Cookies.set("startTime", null);
        Cookies.set("endTime", null);
        Cookies.set("deploymentUrl", null);
      }


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
        throw new Error(
          `Error fetching deployment logs. Status: ${response.status}`
        );
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;

        const chunk = decoder.decode(value || new Uint8Array(), {
          stream: !done,
        });

        if (chunk) {
          dispatch(updateLogs({ namespace, chunk }));
        }
      }

      const deploymentCompleteStatus = await dispatch(
        fetchDeploymentStatus({
          namespace,
          templateID,
          deploymentName: getSlugByTemplateID(templateID),
          url,
        })
      );

      if (!deploymentCompleteStatus) {
        throw new Error("Deployment is not complete yet.");
      }

      dispatch(setLogsCompleted(true));

      return { namespace, completed: true, logsData: true };
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

export const { resetDeploymentState, updateLogs, setFetching, setNamespace } =
  deploymentSlice.actions;

export default deploymentSlice.reducer;
