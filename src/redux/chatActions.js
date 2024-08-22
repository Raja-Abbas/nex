// actions/chatActions.js
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const RESET_MESSAGES = 'RESET_MESSAGES';
export const TOGGLE_TYPING = 'TOGGLE_TYPING';
export const SET_CATEGORY = 'SET_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
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

export const deleteCategory = (categoryId) => ({
    type: DELETE_CATEGORY,
    payload: categoryId,
  });
