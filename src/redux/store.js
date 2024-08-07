import { configureStore } from '@reduxjs/toolkit';
import deploymentReducer from './deploymentSlice';

export const store = configureStore({
  reducer: {
    deployment: deploymentReducer,
  },
});
