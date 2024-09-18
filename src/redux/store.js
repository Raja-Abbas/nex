import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import deploymentReducer from "./deploymentSlice";
import chatReducer from "./chatReducer";
import Cookies from "js-cookie";

const generateRandom13DigitNumber = (length = 16) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  console.log("Generated password:", password);
  return password;
};

let sessionID = Cookies.get("sessionID");
if (!sessionID) {
  sessionID = generateRandom13DigitNumber();
  Cookies.set("sessionID", sessionID, { expires: 60 });
}

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
