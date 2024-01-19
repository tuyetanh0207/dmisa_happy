import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//Test noti
import Noti from './components/notification.jsx'
// Test noti

import { Provider } from 'react-redux';


 import { store } from '../redux/store';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
     {/* <Noti/>  */}
      <App />
  </Provider>,
  </React.StrictMode>,
)
