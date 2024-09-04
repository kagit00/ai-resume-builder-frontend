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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserDashboardError from './Pages/UserDashboard/UserDashboardError.jsx'

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
        path: '/user/dashboarderror',
        element: (
          <UserDashboardError />
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

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
