
import authReducer from "./authSlice";
import navigationReducer from "./navReducer";

export default configureStore({
    reducer:{
        auth:authReducer,
        nav:navigationReducer,
    },
})
import { configureStore, combineReducers } from "@reduxjs/toolkit";



import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ auth: authReducer, nav: navigationReducer });

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ['auth']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store);