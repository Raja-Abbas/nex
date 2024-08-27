import { ADD_MESSAGE, RESET_MESSAGES, TOGGLE_TYPING, SET_CATEGORY, DELETE_CATEGORY, FETCH_MESSAGES_REQUEST, FETCH_MESSAGES_SUCCESS, FETCH_MESSAGES_FAILURE, SET_LOGS_COMPLETED } from './chatActions';

const initialState = {
  messages: [],
  isTyping: false,
  selectedCategory: "Today",
  inProgressRequests: new Set(), 
  logsCompleted: false,
  categories: [
    {
      id: 1,
      name: "Today",
      messages: [{ text: "Yes show me the logs", time: "just now" }],
    },
    {
      id: 2,
      name: "Last Week",
      messages: [{ text: "Make sure my app is secure", time: "jun 22" }],
    },
    {
      id: 3,
      name: "Past 30 Days",
      messages: [
        {
          text: "How do I make sure my app doesn’t crash if a lot of peop...",
          time: "jun 22",
        },
      ],
    },
    {
      id: 4,
      name: "Older",
      messages: [
        {
          text: "Help my configuration issues that caused deployment fai...",
          time: "jun 22",
        },
      ],
    },
  ],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGS_COMPLETED:
      return {
        ...state,
        logsCompleted: action.payload
      };

    case FETCH_MESSAGES_REQUEST:
      return {
        ...state,
        inProgressRequests: new Set(state.inProgressRequests).add(action.payload),
      };
    case FETCH_MESSAGES_SUCCESS:
    case FETCH_MESSAGES_FAILURE:
      const updatedRequests = new Set(state.inProgressRequests);
      updatedRequests.delete(action.payload);
      return {
        ...state,
        inProgressRequests: updatedRequests,
      };
    case ADD_MESSAGE:
      const newMessage = action.payload;
      const isDuplicate = state.messages.some(
        message => message.text === newMessage.text && message.time === newMessage.time
      );
      return {
        ...state,
        messages: isDuplicate ? state.messages : [...state.messages, newMessage]
      };
    case RESET_MESSAGES:
      return {
        ...state,
        messages: []
      };
    case TOGGLE_TYPING:
      return {
        ...state,
        isTyping: action.payload
      };
    case SET_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.payload)
      };
    default:
      return state;
  }
};

export default chatReducer;