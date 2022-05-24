import * as React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

/**
 * Protected Route Component.
 * Protects routes from unauthorized users.
 *
 * @returns {React.ReactElement} - Admin Route Component.
 */
const ProtectedRoute = () => {
  let auth = false
  let admin = false

  const state = useSelector((state) => state)
  // Check user  customer/admin/unauthenticated
  if (state.user?.auth && !state.user.admin) {
    auth = true
  } else if (state.user?.auth && state.user?.admin) {
    admin = true
  }
  if (admin) {
    return <Navigate to="/admin/dashboard" />
  } else if (!auth) {
    return <Navigate to="/login" />
  } else {
    return <Outlet />
  }
}

export default ProtectedRoute
