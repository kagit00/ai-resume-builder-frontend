import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SignInPage from './auth/sign-in/index.jsx'
import HomePage from './home/index.jsx'
import Dashboard from './dashboard/index.jsx'
import ResumeBuilder from './resumebuilder/index.jsx'
import ProtectedRoute from './routeprotection/index.jsx';
import './index.css'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/user/dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
      },
      {
        path: '/user/dashboard/resumebuilder',
        element: (
          <ProtectedRoute>
            <ResumeBuilder />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/auth/sign-in',
    element: <SignInPage />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
