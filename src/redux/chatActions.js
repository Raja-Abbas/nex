// Action Types
export const ADD_MESSAGE = "ADD_MESSAGE";
export const RESET_MESSAGES = "RESET_MESSAGES";
export const TOGGLE_TYPING = "TOGGLE_TYPING";
export const SET_CATEGORY = "SET_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";

// Action Creators
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

export const fetchMessages =
  (input, namespace, cardTitle) => async (dispatch) => {
    try {
      const response = await fetch(
        `http://34.111.99.46/chat?prompt=${input}&namespace=${namespace}&deploymentName=${cardTitle}`
      );
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let result = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
        console.log("Dispatching message:", result);
      }
      dispatch(
        addMessage({
          sender: "AI",
          text: result,
          timestamp: new Date().toISOString(),
        })
      );
      console.log("Final dispatched result:", result);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };
