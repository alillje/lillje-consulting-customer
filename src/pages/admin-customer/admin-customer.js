import './admin-customer.css'
import * as React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import AdminCustomerCard from '../../components/admin-customer-card/admin-customer-card'

/**
 * Admin Customer Component.
 * Represents the page for viewing a specific customer when authenticated as an admin user.
 *
 * @returns {React.ReactElement} - Admin Customer Component.
 */
const AdminCustomer = () => {
  const customer = useSelector((state) => state.customer)
  const location = useLocation()

  return (
    <AdminCustomerCard
      customerId={customer.id ? customer.id : location.state.id}
    />
  )
}

export default AdminCustomer
