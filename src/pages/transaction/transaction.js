import './transaction.css'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axiosApiInstance from '../../services/axios-interceptor'
import TransactionCard from '../../components/transaction-card/transaction-card'

// Material UI Components
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import CircularProgress from '@mui/material/CircularProgress'

/**
 * Transaction Component.
 * Represents the transaction page.
 *
 * @returns {React.ReactElement} - Transaction Component.
 */
const Transaction = () => {
  const transaction = useSelector((state) => state.transaction)
  const user = useSelector((state) => state.user)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  /**
   * Makes request to API and get a specific transaction.
   */
  const getTransaction = async () => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + user.accessToken
      }
    }
    try {
      setLoading(true)
      const { data } = await axiosApiInstance.get(
        `${process.env.REACT_APP_RESOURCE_API}/resources/${transaction.id}`,
        config
      )
      setData(data)
      setLoading(false)
    } catch (error) {
      user.auth ? navigate('/error') : navigate('/login')
    }
  }

  useEffect(() => {
    if (transaction) {
      getTransaction()
    } else {
      setLoading(false)
    }
  }, [])

  return (
    <div>
      {location.state?.message && (
        <Alert severity="success">
          <AlertTitle>{location.state?.message}</AlertTitle>
        </Alert>
      )}
      {loading ? <CircularProgress /> : <TransactionCard transaction={data} />}
    </div>
  )
}

export default Transaction
