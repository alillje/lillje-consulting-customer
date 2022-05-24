import * as React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

/**
 * Admin Route Component.
 * Protects admin routes from unauthorized users.
 *
 * @returns {React.ReactElement} - Admin Route Component.
 */
const AdminRoute = () => {
  let notAdmin = false
  let admin = false

  const user = useSelector((state) => state.user)

  if (user?.auth && user?.admin) {
    admin = true
  } else if (user?.auth) {
    notAdmin = true
  }

  if (admin) {
    return <Outlet />
  } else if (notAdmin) {
    return <Navigate to="/dashboard" />
  } else {
    return <Navigate to="/login" />
  }
}

export default AdminRoute
