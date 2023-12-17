import { Navigate } from 'react-router-dom'
import Login from 'components/Login'
import Layout from 'components/Layout'

const publicRoutes = () => ({
    element: <Layout />,
    children: [
        { path: '/login', element: <Login /> },
        { path: '*', element: <Navigate to="/login" replace /> },
    ],
})

export default publicRoutes
