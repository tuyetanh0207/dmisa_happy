import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux';
//import {persistor, store} from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { createStoreHook } from 'react-redux';
import {persistedReducer } from '../redux/store'
const store = createStoreHook(persistedReducer)
const persistor = persistStore(store); // Initialize the persistor

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}> */}
      <App />
    {/* </PersistGate>
  </Provider>, */}
  </React.StrictMode>,
)
