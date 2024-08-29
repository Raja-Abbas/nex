import {
  START_TYPING_ANIMATION,
  COMPLETE_TYPING_ANIMATION,
  ADD_MESSAGE,
  RESET_MESSAGES,
  TOGGLE_TYPING,
  SET_CATEGORY,
  DELETE_CATEGORY,
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE,
  SET_LOGS_COMPLETED,
} from "./chatActions";

const initialState = {
  messages: [],
  isTyping: false,
  selectedCategory: "Today",
  inProgressRequests: [],
  logsCompleted: false,
  typingAnimationInProgress: false,
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
        logsCompleted: action.payload,
      };

    case FETCH_MESSAGES_REQUEST:
      return {
        ...state,
        inProgressRequests: state.inProgressRequests.includes(action.payload)
          ? state.inProgressRequests
          : [...state.inProgressRequests, action.payload],
      };

    case FETCH_MESSAGES_SUCCESS:
    case FETCH_MESSAGES_FAILURE:
      return {
        ...state,
        inProgressRequests: state.inProgressRequests.filter(
          (request) => request !== action.payload
        ),
      };

      case 'ADD_MESSAGE':
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };

    case RESET_MESSAGES:
      return {
        ...state,
        messages: [],
      };

    case TOGGLE_TYPING:
      return {
        ...state,
        isTyping: action.payload,
      };

    case SET_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
      };

    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default chatReducer;
