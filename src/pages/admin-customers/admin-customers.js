import './admin-customers.css'
import * as React from 'react'
import CustomersList from '../../components/customers-list/customers-list'

/**
 * Admin Customers Component.
 * Represents the page for viewing a all customers when authenticated as an admin user.
 *
 * @returns {React.ReactElement} - Admin Customers Component.
 */
const AdminCustomers = () => {
  return <CustomersList />
}

export default AdminCustomers
