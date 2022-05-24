import './admin-transactions-search.css'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setStateCustomer } from '../../redux/reducers/customer'
import axiosApiInstance from '../../services/axios-interceptor'
import SearchForm from '../../components/search-form/search-form'

// Material UI Components
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'

/**
 * Admin Transactions Search Component.
 * Represents the page for searching among the transactions of a specific user/customer.
 *
 * @returns {React.ReactElement} - Admin Transactions Search Component.
 */
const AdminTransactionsSearch = () => {
  const user = useSelector((state) => state.user)
  const [customerSelected, setCustomerSelected] = useState(false)
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
    } catch (error) {
      navigate('/dashboard')
    }
  }

  /**
   * Sets the customer to search transactions for.
   *
   * @param {object} event - An event object
   */
  const setSearchCustomer = (event) => {
    setCustomer(event.target.value)
    dispatch(
      setStateCustomer({
        customer: event.target.value.id,
        company: event.target.value.company
      })
    )
    setCustomerSelected(true)
  }

  useEffect(() => {
    getCustomers()
  }, [])

  return (
    <div>
      {loading ? (
        <div className="adminTransactionsSearchLoadingSpinner">
          <CircularProgress />
        </div>
      ) : (
        <div className="adminSearchFields">
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
              onChange={setSearchCustomer}
              select // tell TextField to render select
              label="Välj kund"
              sx={{ width: '100%' }}
              required
            >
              {customers.map((cust) => {
                return (
                  <MenuItem key={cust.id} value={cust}>
                    {cust.company}
                  </MenuItem>
                )
              })}
            </TextField>
          </Box>
        </div>
      )}
      {customerSelected && <SearchForm />}
    </div>
  )
}

export default AdminTransactionsSearch
