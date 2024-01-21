import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { pdfjs } from 'react-pdf';
//Test noti
import Noti from './components/notification.jsx'
// Test noti

import { Provider } from 'react-redux';


 import { store } from '../redux/store';

 pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
     {/* <Noti/>  */}
      <App />
  </Provider>,
  </React.StrictMode>,
)
