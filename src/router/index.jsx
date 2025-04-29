import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import WeatherPage from '../weather/WeatherPage'
import CampingPage from '@/camping/CampingPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <div>에러</div>,
    children: [
      {
        index: true,
        element: <WeatherPage />,
      },
      {
        path: '/camping',
        element: <CampingPage />,
      },
    ],
  },
])
