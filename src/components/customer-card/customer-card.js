import './customer-card.css'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
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
 * Customer Card Component.
 * Displays information about a specific customer.
 * Also displays buttons with certain options.
 *
 * @returns {React.ReactElement} - Customer Card Component.
 */
const CustomerCard = () => {
  const user = useSelector((state) => state.user)
  const [customer, setCustomer] = useState({})
  const navigate = useNavigate()
  const location = useLocation()

  /**
   * Makes request to API and get a specific customer.
   */
  const getCustomer = async () => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + user.accessToken
      }
    }
    try {
      // setLoading(true)
      const { data } = await axiosApiInstance.get(
        `${process.env.REACT_APP_AUTH_API}/user/${user.user.sub}`,
        config
      )
      // setLoading(false)
      setCustomer(await data)
    } catch (error) {}
  }

  /**
   * Navigates to the transactions page.
   */
  const goToTransactions = () => {
    navigate('/transactions')
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
      <div className="customerCardContainer">
        <Card
          className="customerCard"
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
            {!customer.admin && (
              <Typography variant="body2" color="text.secondary">
                Organisationsnummer: {customer.orgNo}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              Email: {customer.email}
            </Typography>
          </CardContent>
          <CardActions>
            {!customer.admin && (
              <Button size="small" onClick={goToTransactions}>
                Transaktioner
              </Button>
            )}
            {!customer.admin && (
            <Button
              size="small"
              component={Link}
              to="/mina-uppgifter/uppdatera"
            >
              Ändra epostaddress
            </Button>)}
            {!customer.admin && (

            <Button
              size="small"
              component={Link}
              to="/mina-uppgifter/losenord/uppdatera"
            >
              Ändra lösenord
            </Button>)}

            {customer.admin && (
            <Button
            size="small"
            component={Link}
            to="/admin/mina-uppgifter/uppdatera"
          >
            Ändra epostaddress
          </Button>)}

          {customer.admin && (
            <Button
            size="small"
            component={Link}
            to="/admin/mina-uppgifter/losenord/uppdatera"
          >
            Ändra lösenord
          </Button>)}
          </CardActions>
        </Card>
      </div>
    </>
  )
}

export default CustomerCard
