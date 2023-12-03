import authReducer from './authSlice'
export default configureStore({
    reducer:{
        auth:authReducer,
    }
})

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
    persistStore, 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
}
from 'redux-persist'

import storage from 'redux-persist/lib/storage';
const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const rootReducer = combineReducers({ auth: authReducer});
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

export let persister = persistStore(store);