import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './pages/Home'
import Enroll from './pages/Enroll'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/enroll', element: <Enroll /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)