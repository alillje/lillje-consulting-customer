import './admin-transactions.css'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setStateCustomer } from '../../redux/reducers/customer'
import axiosApiInstance from '../../services/axios-interceptor'

// Material UI Components
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'

/**
 * Admin Transactions Component.
 * Represents the page for viewing all transactions of a specific user/customer.
 *
 * @returns {React.ReactElement} - Admin Transactions Component.
 */
const AdminTransactions = () => {
  const user = useSelector((state) => state.user)
  const [customers, setCustomers] = useState([])
  const [customer, setCustomer] = useState({})
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  /**
   * Makes request to API and get a specific customer.
   */
  const getCustomers = async () => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + user.accessToken
      }
    }
    try {
      setLoading(true)
      const { data } = await axiosApiInstance.get(
        `${process.env.REACT_APP_AUTH_API}/users`,
        config
      )
      setLoading(false)
      setCustomers(await data.users)
    } catch (error) {}
  }

  /**
   * Navigates to the transactions page of a specific user/customer.
   *
   * @param {object} event - An event object.
   */
  const goToTransactions = (event) => {
    event.preventDefault()
    dispatch(
      setStateCustomer({
        customer: customer.id,
        company: customer.company
      })
    )
    navigate(`/admin/customers/${customer.id}/transactions`)
  }

  useEffect(() => {
    getCustomers()
  }, [])

  return (
    <div>
      {loading ? (
        <div className="adminTransactionsLoadingSpinner">
          <CircularProgress />
        </div>
      ) : (
        <div className="customersList">
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 3, width: '90%', minWidth: '300px' }
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              value={customer}
              onChange={(event) => setCustomer(event.target.value)}
              select // tell TextField to render select
              label="Välj kund"
              sx={{ width: '100%' }}
            >
              {customers.map((cust) => {
                return (
                  <MenuItem key={cust.id} value={cust}>
                    {cust.company}
                  </MenuItem>
                )
              })}
            </TextField>
            {customer?.id && (
              <Button onClick={goToTransactions}>Visa transaktioner</Button>
            )}
          </Box>
        </div>
      )}
    </div>
  )
}

export default AdminTransactions
