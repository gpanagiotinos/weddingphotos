import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import CustomLoader from 'components/CustomLoader'
import EditProvider from 'components/EditProvider'
import AuthProvider from 'routes/AuthProvider'

const Layout = () => {
    return (
        <AuthProvider>
            <EditProvider>
                <Suspense fallback={CustomLoader}>
                    <Outlet />
                </Suspense>
            </EditProvider>
        </AuthProvider>
    )
}

export default Layout
