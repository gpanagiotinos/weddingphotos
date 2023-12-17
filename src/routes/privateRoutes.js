import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Layout from 'components/Layout'
import ProtectedRoute from './ProtectedRoute'

const Library = lazy(() => import('../components/Library'))

const privateRoutes = () => ({
    element: <Layout />,
    children: [
        {
            path: '/',
            element: <ProtectedRoute />,
            children: [
                { path: 'library', element: <Library /> },
                { path: '*', element: <Navigate to="/library" replace /> },
            ],
        },
    ],
})

export default privateRoutes
