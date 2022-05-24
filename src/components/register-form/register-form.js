import './register-form.css'
import * as React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import validator from 'validator'

// Material UI components
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import axiosApiInstance from '../../services/axios-interceptor'
import CircularProgress from '@mui/material/CircularProgress'
import { setStateCustomer } from '../../redux/reducers/customer'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

/**
 * Register Form Component.
 * Displays a form and registers a new customer/user.
 *
 * @returns {React.ReactElement} - Register Form Component.
 */
const RegisterForm = () => {
  const user = useSelector((state) => state.user)

  const [company, setCompany] = useState('')
  const [orgNo, setOrgNo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [allFieldsInput, setAllFieldsInput] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  /**
   * Checks if all input is valid.
   * Sets the state allFieldsInput(true), if all input is correct.
   */
  const checkFields = () => {
    if (password.length < 10) {
      setErrorMessage('Lösenordet måste bestå av minst 10 tecken')
      setPassword('')
      setConfirmPassword('')
    }

    if (password !== confirmPassword) {
      setErrorMessage('Lösenorden stämmer inte överrens')
      setPassword('')
      setConfirmPassword('')
    }
    if (/(\d{6}[-]\d{4})/.test(orgNo) === false) {
      setErrorMessage('Korrekt format på organisationsnummer är XXXXXX-XXXX')
    }
    if (!validator.isEmail(email)) {
      setErrorMessage('Ange en korrekt mailadress')
      setPassword('')
      setConfirmPassword('')
    }

    if (
      company.length < 1 ||
      orgNo.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      confirmPassword.length < 1
    ) {
      setErrorMessage(
        'Alla fält måste fyllas i för att kunna registrera en ny kund'
      )
    } else {
      setAllFieldsInput(true)
    }
  }

  /**
   * Registers a new user.
   *
   * @param {object} event - An event object.
   */
  const registerUser = async (event) => {
    event.preventDefault()
    checkFields()
    const reqBody = {
      company: validator.escape(company),
      orgNo: validator.escape(orgNo),
      email: validator.escape(email),
      password: validator.escape(password)
    }

    const reqHeaders = {
      headers: {
        Authorization: 'Bearer ' + user.accessToken
      }
    }

    // Only send request if all field input is valid.
    if (allFieldsInput) {
      try {
        setLoading(true)
        const { data } = await axiosApiInstance.post(
          `${process.env.REACT_APP_AUTH_API}/users/register`,
          reqBody,
          reqHeaders
        )
        setLoading(false)
        dispatch(
          setStateCustomer({
            id: data.id
          })
        )
        navigate(`/admin/customers/${data.id}`, { state: { id: data.id, message: 'Registreringen lyckades! OBS! Kunden måste byta lösenord vid första inloggningen' } })
      } catch (err) {
        const error = JSON.parse(JSON.stringify(err))
        // Set error messages
        if (error.status === 409) {
          setErrorMessage(
            'Företagets namn eller organisationsnummer finns redan registrerat'
          )
        } else {
          setErrorMessage('Ett oväntat fel inträffade')
        }
        setLoading(false)
      }
    }
  }

  return loading ? (
    <CircularProgress />
  ) : (
    <div>
      {errorMessage && (
        <Alert severity="warning" className="searchErrorMessage">
          <AlertTitle>Ett fel inträffade</AlertTitle>
          {errorMessage}
        </Alert>
      )}
      <div className="trasactionFormHeader">
        <h5> Registrera ny kund</h5>
      </div>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 3, width: '90%' }
        }}
        noValidate
        autoComplete="off"
        onSubmit={registerUser}
      >
        <TextField
          helperText="Företagets namn"
          id="outlined-basic"
          label="Företag"
          variant="outlined"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          required
        />

        <TextField
          helperText="Företagets organisationsnummer, måste anges i formatet XXXXXX-XXXX"
          id="outlined-basic"
          label="OrgNo"
          variant="outlined"
          value={orgNo}
          onChange={(event) => setOrgNo(event.target.value)}
          required
        />
        <TextField
          helperText="Företagets epostaddress"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          required
        />

        <TextField
          value={password}
          helperText="Lösenordet måste bestå av minst 10 tecken"
          onChange={(event) => setPassword(event.target.value)}
          id="outlined-basic"
          label="Lösenord"
          variant="outlined"
          type="password"
          required
        />

        <TextField
          helperText="OBS! Kund måste informeras om att denne måste byta lösenord vid första inloggning"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          id="outlined-basic"
          label="Bekräfta lösenord"
          variant="outlined"
          type="password"
          required
        />

        <Button type="submit">Registrera</Button>
      </Box>
    </div>
  )
}

export default RegisterForm
