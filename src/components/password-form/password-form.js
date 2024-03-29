import './password-form.css'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import validator from 'validator'

// Material UI components
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import axiosApiInstance from '../../services/axios-interceptor'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

// TODO: Valitation of input
/**
 * Password Form Component.
 * Displays a form for the user to change their password, at submit, a request to change the password is sent.
 *
 * @returns {React.ReactElement} - Password Form Component.
 */
const PasswordForm = () => {
  const user = useSelector((state) => state.user)
  const [customer, setCustomer] = useState({})
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
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
      setCustomer(await data)
      setLoading(false)
    } catch (error) {}
  }

  /**
   * Changes the password of the user if all input is correct.
   *
   * @param {object} event - An event object.
   */
  const changePassword = async (event) => {
    event.preventDefault()
    const reqBody = {
      email: validator.escape(customer.email),
      password,
      newPassword,
      newPasswordConfirm
    }

    const reqHeaders = {
      headers: {
        Authorization: 'Bearer ' + user.accessToken
      }
    }
    // Only make request if all input is valid
    if (
      newPassword === newPasswordConfirm &&
      password.length > 0 &&
      newPassword.length >= 10 &&
      newPasswordConfirm.length >= 10
    ) {
      try {
        setLoading(true)
        await axiosApiInstance.patch(
          `${process.env.REACT_APP_AUTH_API}/password/${user.user.sub}`,
          reqBody,
          reqHeaders
        )
        setLoading(false)
        user.admin ? navigate('/admin/mina-uppgifter', {
          state: { message: 'Lösenordet uppdaterades' }
        }) : navigate('/mina-uppgifter', {
          state: { message: 'Lösenordet uppdaterades' }
        })
      } catch (err) {
        const error = JSON.parse(JSON.stringify(err))
        // Set error messages
        if (error.status === 400) {
          setErrorMessage('Felaktigt lösenord')
          setPassword('')
          setNewPassword('')
          setNewPasswordConfirm('')
          setLoading(false)
        } else {
          setErrorMessage('Ett oväntat fel inträffade')
          setPassword('')
          setNewPassword('')
          setNewPasswordConfirm('')
          setLoading(false)
        }
      }
    } else {
      setErrorMessage('Felaktigt lösenord')
      setPassword('')
      setNewPassword('')
      setNewPasswordConfirm('')
      setLoading(false)
    }
  }

  useEffect(() => {
    getCustomer()
  }, [])

  return loading ? (
    <div className="updatePasswordLoadingCircle">
      <CircularProgress />
    </div>
  ) : (
    <div>
      <div className="trasactionFormHeader">
        <h5>Ändra lösenord</h5>
      </div>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 3, width: '90%' }
        }}
        noValidate
        autoComplete="off"
        onSubmit={changePassword}
      >
        {errorMessage && (
          <Alert severity="warning" className="searchErrorMessage">
            <AlertTitle> {errorMessage}</AlertTitle>
          </Alert>
        )}

        <TextField
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          id="outlined-basic"
          label="Nuvarande lösenord"
          variant="outlined"
          type="password"
          required
        />

        <TextField
          helperText="Lösenordet måste bestå av minst 10 tecken"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          id="outlined-basic"
          label="Nytt lösenord"
          variant="outlined"
          type="password"
          required
        />
        <TextField
          helperText="Lösenordet måste bestå av minst 10 tecken"
          value={newPasswordConfirm}
          onChange={(event) => setNewPasswordConfirm(event.target.value)}
          id="outlined-basic"
          label="Bekräfta nytt lösenord"
          variant="outlined"
          type="password"
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

export default PasswordForm
