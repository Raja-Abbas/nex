import { ADD_MESSAGE, RESET_MESSAGES, TOGGLE_TYPING, SET_CATEGORY, DELETE_CATEGORY } from './chatActions';

const initialState = {
  messages: [
    {
      sender: 'Liz',
      text: "Hey there, I'm Liz―your AI deployment and scaling assistant. I'm still in alpha, which means I'm like a toddler with superpowers: But don't worry, I've got this. We're almost there just adding the finishing touches. Hang tight, your app will be live in no time!",
      timestamp: new Date().toISOString(),
    },
  ],
  isTyping: false,
  selectedCategory: "Today",
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
    case ADD_MESSAGE:
   return {
     ...state,
     messages: [...state.messages, action.payload]
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
