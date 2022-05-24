import './admin-reset-customer-password'
import * as React from 'react'
import { useLocation } from 'react-router-dom'
import AdminPasswordForm from '../../components/admin-password-form/admin-password-form.js'

/**
 * Admin Reset Customer Password Component.
 * Represents the page for resetting the password of a specific user/customer.
 *
 * @returns {React.ReactElement} - Admin Reset Customer Password Component.
 */
const AdminResetCustomerPassword = () => {
  const location = useLocation()
  return <AdminPasswordForm customerId={location.state?.customerId} customerCompany={location.state?.customerCompany} />
}

export default AdminResetCustomerPassword
