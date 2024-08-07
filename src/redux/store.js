import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import deploymentReducer from './deploymentSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, deploymentReducer);

// Store configuration
export const store = configureStore({
  reducer: {
    deployment: persistedReducer,
  },
});

// Persistor instance
export const persistor = persistStore(store);
