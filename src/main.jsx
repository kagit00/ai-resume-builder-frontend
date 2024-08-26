import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Auth from '@/Pages/Auth/Auth.jsx'
import Home from '@/Pages/Home/Home.jsx'
import UserDashboard from '@/Pages/UserDashboard/UserDashboard.jsx'
import ResumeBuilder from '@/Pages/ResumeBuilder/ResumeBuilder.jsx'
import ProtectedRoutes from '@/Pages/Auth/ProtectedRoutes.jsx';
import './index.css'
import ResumeDownload from './Pages/ResumeDownload/ResumeDownload.jsx'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/user/dashboard',
        element: (
          <ProtectedRoutes>
            <UserDashboard />
          </ProtectedRoutes>
        )
      },
      {
        path: '/user/dashboard/resumebuilder',
        element: (
          <ProtectedRoutes>
            <ResumeBuilder />
          </ProtectedRoutes>
        )
      },
      {
        path: '/user/dashboard/resumebuilder/download',
        element: (
          <ProtectedRoutes>
            <ResumeDownload />
          </ProtectedRoutes>
        )
      }
    ]
  },
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/auth/sign-in',
    element: <Auth />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
