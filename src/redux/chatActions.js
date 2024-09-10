export const ADD_MESSAGE = "ADD_MESSAGE";
export const RESET_MESSAGES = "RESET_MESSAGES";
export const TOGGLE_TYPING = "TOGGLE_TYPING";
export const SET_CATEGORY = "SET_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const FETCH_MESSAGES_REQUEST = "FETCH_MESSAGES_REQUEST";
export const FETCH_MESSAGES_SUCCESS = "FETCH_MESSAGES_SUCCESS";
export const FETCH_MESSAGES_FAILURE = "FETCH_MESSAGES_FAILURE";
export const SET_LOGS_COMPLETED = "SET_LOGS_COMPLETED";

export const setLogsCompleted = (completed) => ({
  type: SET_LOGS_COMPLETED,
  payload: completed,
});

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: message,
});

export const resetMessages = () => ({
  type: RESET_MESSAGES,
});

export const toggleTyping = (isTyping) => ({
  type: TOGGLE_TYPING,
  payload: isTyping,
});

export const setCategory = (category) => ({
  type: SET_CATEGORY,
  payload: category,
});

export const deleteCategory = (id) => ({
  type: DELETE_CATEGORY,
  payload: id,
});
export const fetchLogsData = () => async (dispatch) => {
  dispatch({ type: "FETCH_LOGS_REQUEST" });
  try {
    const response = await fetch("/api/logs");
    const data = await response.json();
    dispatch({ type: "SET_LOGS_DATA", payload: data });

    const lines = Array.isArray(data) ? data : data.split("\n");
    const logsCompleted = lines.some((line) =>
      line.includes("Deployment Complete"),
    );
    dispatch(setLogsCompleted(logsCompleted));
  } catch (error) {
    dispatch({ type: "FETCH_LOGS_FAILURE", payload: error });
  }
};

export const fetchMessages =
  (input, namespace, cardTitle, requestId) => async (dispatch, getState) => {
    const { inProgressRequests } = getState().chat;
    if (inProgressRequests.includes(requestId)) {
      return;
    }

    dispatch({ type: FETCH_MESSAGES_REQUEST, payload: requestId });

    try {
      const response = await fetch(
        `/chat?prompt=${input}&namespace=${namespace}&deploymentName=${cardTitle}`,
      );
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
      }

      dispatch(
        addMessage({
          sender: "AI",
          text: result,
          timestamp: new Date().toISOString(),
        }),
      );
      dispatch({ type: FETCH_MESSAGES_SUCCESS, payload: requestId });
      dispatch(setLogsCompleted(true));
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      dispatch({ type: FETCH_MESSAGES_FAILURE, payload: requestId });
    }
  };
