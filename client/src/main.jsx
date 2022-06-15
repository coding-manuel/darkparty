import React from 'react'
import ReactDOM from 'react-dom/client'
import { NotificationsProvider } from '@mantine/notifications';
import { BrowserRouter } from "react-router-dom";

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <NotificationsProvider>
      <App />
    </NotificationsProvider>
  </BrowserRouter>
)
