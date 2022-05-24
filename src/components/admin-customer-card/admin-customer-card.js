import './admin-customer-card.css'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axiosApiInstance from '../../services/axios-interceptor'

// Material UI components
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

/**
 * Admin Customer Card Component.
 * Views detailed information about a specific customer, and displays the admin options.
 *
 * @param {string} customerId - The ID of the customer to display info about.
 * @returns {React.ReactElement} - Admin Customer Card Component.
 */
const AdminCustomerCard = ({ customerId }) => {
  const user = useSelector((state) => state.user)
  const [customer, setCustomer] = useState({})
  const location = useLocation()
  const navigate = useNavigate()

  /**
   * Makes request to API and get a specific customer.
   */
  const getCustomer = async () => {
    // Set axios config
    const config = {
      headers: {
        Authorization: 'Bearer ' + user.accessToken
      }
    }
    try {
      const { data } = await axiosApiInstance.get(
        `${process.env.REACT_APP_AUTH_API}/users/${customerId}`,
        config
      )
      setCustomer(await data)
    } catch (error) {}
  }

  /**
   * Navigates to transactions for a specific customer.
   */
  const goToTransactions = () => {
    navigate(`/admin/customers/${customer.id}/transactions`)
  }

  /**
   * Navigates to the page for changing/updating a password.
   */
  const changePassword = () => {
    navigate('/admin/customer/losenord/uppdatera', {
      state: { customerId: customer.id, customerCompany: customer.company }
    })
  }

  useEffect(() => {
    getCustomer()
  }, [])

  return (
    <>
                {location.state?.message && (
        <Alert severity="success">
          <AlertTitle>{location.state?.message}</AlertTitle>
        </Alert>
                )}
    <div className="adminCustomerCardContainer">
      <Card
        className="adminCustomerCard"
        sx={{
          boxShadow: 'none',
          width: '100%',
          maxWidth: 1500,
          padding: 2,
          margin: 3
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {customer.company}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Organisationsnummer: {customer.orgNo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: {customer.email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={goToTransactions}>
            Transaktioner
          </Button>
          <Button size="small" onClick={changePassword}>Återställ lösenord</Button>
        </CardActions>
      </Card>
    </div>
    </>
  )
}

export default AdminCustomerCard
