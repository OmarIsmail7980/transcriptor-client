import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { VideoContextProvider } from './context/VideoContext.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <VideoContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </VideoContextProvider>
  </React.StrictMode>
);
