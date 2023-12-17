import React from 'react'
import { Navigate, useOutlet } from 'react-router-dom'
import { useAuth } from 'routes/AuthProvider'

const ProtectedRoute = () => {
    const { user } = useAuth()
    const outlet = useOutlet()

    if (!user) {
        return <Navigate to="/login" />
    }

    return <div>{outlet}</div>
}

export default ProtectedRoute
