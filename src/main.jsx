import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from "./router/router"
import { CommonProvider } from './context/CommonContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CommonProvider>
      <main className="container mx-auto px-4">
        <RouterProvider router={router} />
      </main>
    </CommonProvider>
  </React.StrictMode>,
)
