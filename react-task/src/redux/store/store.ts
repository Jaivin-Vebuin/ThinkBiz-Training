import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "../features/slices/languages/languageSlice";
import authTokenReducer from "../features/slices/auth/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import logger from "redux-logger";

const middleware = (getDefaultMiddleware: any) => {
  return getDefaultMiddleware({
    serializableCheck: false,
  }).concat(logger);
};

const persistConfig = {
  key: "current_lang",
  storage,
};

const rootReducer = combineReducers({
  lang: languageReducer,
  auth: authTokenReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware:middleware
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
export default store;
