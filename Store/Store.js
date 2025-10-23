import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import rootReducer from "./Reducer/combineReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["savedData"],
};
const persistedReducer = persistReducer(
  //   { key: "root", storage: AsyncStorage, whitelist: ["savedData"] },
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
