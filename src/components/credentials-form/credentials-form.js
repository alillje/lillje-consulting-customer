import './credentials-form.css'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import validator from 'validator'

// Material UI components
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import axiosApiInstance from '../../services/axios-interceptor'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

/**
 * Credentials Form Component.
 * Displays a form to update user credentials.
 *
 * @returns {React.ReactElement} - Credentials Form Component.
 */
const CredentialsForm = () => {
  const user = useSelector((state) => state.user)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

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
      setLoading(true)
      const { data } = await axiosApiInstance.get(
        `${process.env.REACT_APP_AUTH_API}/user/${user.user.sub}`,
        config
      )
      setEmail(data.email)
      setLoading(false)
    } catch (error) {
      navigate('/dashboard')
    }
  }

  /**
   * Sends a patch request to update the email of a specific user.
   *
   * @param {object} event - An event object.
   */
  const updateEmail = async (event) => {
    event.preventDefault()
    if (validator.isEmail(email)) {
      const reqBody = {
        email: validator.escape(email)
      }

      const reqHeaders = {
        headers: {
          Authorization: 'Bearer ' + user.accessToken
        }
      }

      try {
        setLoading(true)
        await axiosApiInstance.patch(
          `${process.env.REACT_APP_AUTH_API}/${user.user.sub}`,
          reqBody,
          reqHeaders
        )
        setLoading(false)
        user.admin ? navigate('/admin/mina-uppgifter', {
          state: { message: 'Epostaddressen uppdaterades' }
        }) : navigate('/mina-uppgifter', {
          state: { message: 'Epostaddressen uppdaterades' }
        })
      } catch (error) {
        setLoading(false)
        setErrorMessage('Ett oväntat fel inträffade')
      }
    } else {
      setErrorMessage('Vänligen ange en korrekt epostadress')
    }
  }

  useEffect(() => {
    getCustomer()
  }, [])

  return loading ? (
    <div className="credentialsFormLoadingCircle">
      <CircularProgress />
    </div>
  ) : (
    <div>
      <div className="trasactionFormHeader">
        <h5>Ändra uppgifter</h5>
      </div>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 3, width: '90%' }
        }}
        noValidate
        autoComplete="off"
        onSubmit={updateEmail}
      >
        {errorMessage && (
          <Alert severity="info" className="searchErrorMessage">
            <AlertTitle>{errorMessage}</AlertTitle>
          </Alert>
        )}

        <TextField
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          required
        />

        <Button type="submit">Uppdatera</Button>
        <Button component={Link} to="/mina-uppgifter">
          Avbryt
        </Button>
      </Box>
    </div>
  )
}

export default CredentialsForm
