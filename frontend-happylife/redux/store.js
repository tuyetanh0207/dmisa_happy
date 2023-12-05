import authReducer from './authSlice'
// export default configureStore({
//     reducer:{
//         auth:authReducer,
//     }
// })

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
    persistStore, 
    persistReducer,
    // FLUSH,
    // REHYDRATE,
    // PAUSE,
    // PERSIST,
    // PURGE,
    // REGISTER,
}
from 'redux-persist'
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const rootReducer = combineReducers({ auth: authReducer});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;

// export const store = configureStore({
//     reducer: persistedReducer,
//     middleware: [thunk]
// })

// export let persistor = persistStore(store);