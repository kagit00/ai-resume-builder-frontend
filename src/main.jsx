import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SignInPage from './Pages/Auth/SignInPage.jsx'
import Home from '@/Pages/Home/Home.jsx'
import UserDashboard from '@/Pages/UserDashboard/UserDashboard.jsx'
import ResumeBuilder from '@/Pages/ResumeBuilder/ResumeBuilder.jsx'
import ProtectedRoutes from '@/Pages/Auth/ProtectedRoutes.jsx';
import './index.css'

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
      }
    ]
  },
  {
    path: '/',
    element: <Home />
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
