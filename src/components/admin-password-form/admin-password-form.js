import './admin-password-form.css'
import * as React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axiosApiInstance from '../../services/axios-interceptor'

// Material UI components
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

// TODO: Valitation of input
/**
 * Admin Password Form Component.
 * Displays a form and changes a specific user's password.
 *
 * @param {string} customerId - The ID of the customer to change password for.
 * @param {string} customerCompany - The name of the customer company to display info about.
 * @returns {React.ReactElement} - Admin Password Form Component.
 */
const AdminPasswordForm = ({ customerId = undefined }, { customerCompany = undefined }) => {
  const user = useSelector((state) => state.user)
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  /**
   * Sends a patch request to update the password of a specific user.
   *
   * @param {object} event - An event object.
   */
  const updateCustomerPassword = async (event) => {
    event.preventDefault()
    const reqBody = {
      customer: customerId,
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
      newPassword.length > 0 &&
      newPassword.length >= 10 &&
      newPasswordConfirm.length >= 10
    ) {
      try {
        setLoading(true)
        await axiosApiInstance.patch(
          `${process.env.REACT_APP_AUTH_API}/users/password/reset`,
          reqBody,
          reqHeaders
        )
        setLoading(false)
        navigate(`/admin/customers/${customerId}`, {
          state: { message: 'Lösenordet har uppdaterats' }
        })
      } catch (err) {
        // Set error messages
        const error = JSON.parse(JSON.stringify(err))
        if (error.status === 400) {
          setErrorMessage('Felaktigt lösenord')
          setNewPassword('')
          setNewPasswordConfirm('')
          setLoading(false)
        } else {
          setErrorMessage('Ett oväntat fel inträffade')
          setNewPassword('')
          setNewPasswordConfirm('')
        }
      }
    } else {
      setErrorMessage('Felaktigt lösenord')
      setNewPassword('')
      setNewPasswordConfirm('')
      setLoading(false)
    }
  }

  return loading ? (
    <div className="updatePasswordLoadingCircle">
      <CircularProgress />
    </div>
  ) : (
    <div>
      <div className="trasactionFormHeader">
        <h5>Ändra lösenord för {customerCompany}</h5>
      </div>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 3, width: '90%' }
        }}
        noValidate
        autoComplete="off"
        onSubmit={updateCustomerPassword}
      >
        {errorMessage && (
          <Alert severity="warning" className="searchErrorMessage">
            <AlertTitle> {errorMessage}</AlertTitle>
          </Alert>
        )}

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

export default AdminPasswordForm
