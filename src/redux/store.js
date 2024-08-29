import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import deploymentReducer from "./deploymentSlice";
import chatReducer from "./chatReducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, deploymentReducer);

export const store = configureStore({
  reducer: {
    deployment: persistedReducer,
    chat: chatReducer,
  },
});

export const persistor = persistStore(store);
