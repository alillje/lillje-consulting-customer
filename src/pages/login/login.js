/* eslint-disable camelcase */
import './login.css'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import Topbar from '../../components/topbar/topbar'
import { loginHandler } from '../../services/login-service'

// Material UI components
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

/**
 * Login Component.
 * Represents the login page.
 *
 * @returns {React.ReactElement} - Login Component.
 */
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [customer, setCustomer] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  /**
   * Handles login.
   *
   * @param {object} event - an event Object
   */
  const handleLogin = async (event) => {
    event.preventDefault()
    const userData = {
      email: event.target.email.value,
      password: event.target.password.value
    }
    try {
      const authUser = await loginHandler(userData)

      if (jwt_decode(authUser?.access_token).admin) {
        setAdmin(true)
      } else {
        setCustomer(true)
      }
      setEmail('')
      setPassword('')
      setErrorMessage('')
    } catch (error) {
      setErrorMessage('Ogiltigt användarnamn eller lösenord')
    }
  }

  useEffect(() => {
    if (admin) {
      navigate('/admin/dashboard')
    } else if (customer) {
      navigate('/dashboard')
    }
  }, [admin, customer, navigate])

  return (
    <div className="loginLayoutContainer">
      <div className="loginLayoutHeader">
        <Topbar />
      </div>
      <div className="loginLayoutLeft"></div>

      <div className="mainLogin">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary' }}>
            <LockTwoToneIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Logga in
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleLogin}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="text"
              name="email"
              label="Email"
              autoFocus
              autoComplete="current-email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              name="password"
              label="Lösenord"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#000428' }}
            >
              Logga in
            </Button>
            {errorMessage && (
              <div className="loginErrorContainer">
                <Alert className="loginError" severity="error">
                  <AlertTitle>{errorMessage}</AlertTitle>
                </Alert>
              </div>
            )}
            <Grid container>
              <Grid item xs></Grid>
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
      </div>
      <div className="loginLayoutRight"></div>
    </div>
  )
}

export default Login
