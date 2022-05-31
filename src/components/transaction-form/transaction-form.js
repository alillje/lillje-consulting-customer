import './transaction-form.css'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import validator from 'validator'

// Material UI components
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import axiosApiInstance from '../../services/axios-interceptor'
import CircularProgress from '@mui/material/CircularProgress'
import { setTransaction } from '../../redux/reducers/transaction'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { setVatRate } from './helper-functions/calculate-vat'

/**
 * Transaction Form Component.
 * Displays a form and the options to create a new transaction.
 *
 * @returns {React.ReactElement} - Transaction Form Component.
 */
const TransactionForm = () => {
  const user = useSelector((state) => state.user)
  const [description, setDescription] = useState('')
  const [company, setCompany] = useState('')
  const [date, setDate] = useState('')
  const [amountExVat, setAmountExVat] = useState('')
  const [transactionCategory, setTransactionCategory] = useState('')
  const [transactionType, setTransactionType] = useState('')
  const [viewCategories, setViewCategories] = useState(true)
  const [vat, setVat] = useState('')
  const [file, setFile] = useState()
  const [loading, setLoading] = useState(false)
  const [minParams, setMinParams] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  // Set fixed options
  const vatRates = ['0%', '6%', '12%', '25%']
  const transactionTypes = ['Leverantörsfaktura', 'Kundfaktura', 'Utlägg']
  const transactionCategories = [
    'Bensin',
    'Material',
    'Mobil',
    'Internet',
    'Försäkring',
    'Övrigt'
  ]
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // This code snippet was found at https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript
  // Specific comment: https://stackoverflow.com/a/70106512
  /**
   * Encodes a file to base64.
   *
   * @param {object} file - The file to be encoded.
   * @returns {Promise} - Promise representing the base64 encoded string.
   */
  const getBase64 = (file) => {
    return new Promise(function (resolve, reject) {
      const reader = new window.FileReader()
      /**
       * Resolves the promise on File Reader load.
       */
      reader.onload = function () {
        resolve(reader.result.substr(reader.result.indexOf(',') + 1))
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  /**
   * Checks input and creates a new transaction by sending a post request to API.
   *
   * @param {object} event - An event object.
   */
  const registerTranasction = async (event) => {
    event.preventDefault()
    setLoading(true)
    // let fileUrl = "";
    let validFileFormat = false
    let validFileSize = false
    let amountIsNumber = false

    // Check filetype and file size
    if (file) {
      if (file.type === 'application/pdf') {
        validFileFormat = true
      }
      if (file.size <= 2000000) {
        validFileSize = true
        // Check if amount is number
      }
      if (!isNaN(parseInt(amountExVat))) {
        amountIsNumber = true
      }
    }
    // Only send request if input is valid
    if (minParams && validFileFormat && validFileSize && amountIsNumber) {
      const reqBody = {
        description: validator.escape(description),
        authorName: user.company,
        company: validator.escape(company),
        transactionType: validator.escape(transactionType),
        transactionCategory:
          transactionType === 'Leverantörsfaktura' ? validator.escape(transactionCategory) : 'Försäljning',
        vat: setVatRate(vat),
        amountExVat: parseInt(validator.escape(amountExVat)),
        author: validator.escape(user.user.sub),
        date: new Date(date).getTime() / 1000,
        documentUrl: await getBase64(file)
      }
      const reqHeaders = {
        headers: {
          Authorization: 'Bearer ' + user.accessToken
        }
      }

      try {
        const { data } = await axiosApiInstance.post(
          `${process.env.REACT_APP_RESOURCE_API}/resources`,
          reqBody,
          reqHeaders
        )
        setLoading(false)
        dispatch(
          setTransaction({
            id: data.id,
            sub: user.user.sub
          })
        )
        navigate(`/transactions/${data.id}`, {
          state: { message: 'Transaktionen har registrerats' }
        })
      } catch (error) {
        setLoading(false)
        setErrorMessage('Ett oväntat fel inträffade')
      }
    }
    // Set error messages
    if (!minParams) {
      setErrorMessage(
        'Alla fält måste fyllas i för att kunna registrera en ny transaktion'
      )
      setLoading(false)
    } else if (!amountIsNumber) {
      setErrorMessage('Belopp får bara innehålla siffror')
      setLoading(false)
    } else if (!validFileFormat) {
      setErrorMessage('Tillåtet filformat är .pdf')
      setLoading(false)
    } else if (!validFileSize) {
      setErrorMessage('Maxstorlek för bifogad fil är 2MB')
      setLoading(false)
    } else {
      setErrorMessage(
        'Alla fält måste fyllas i för att kunna registrera en ny transaktion'
      )
      setLoading(false)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (transactionType === 'Leverantörsfaktura') {
      setViewCategories(true)
    } else if (transactionType !== 'Leverantörsfaktura') {
      setViewCategories(false)
    }

    if (
      company.length > 0 &&
      date.length > 0 &&
      amountExVat.length > 0 &&
      description.length > 0 &&
      file &&
      vat.length > 0
    ) {
      setMinParams(true)
    } else {
      setMinParams(false)
    }
  }, [
    minParams,
    company,
    date,
    amountExVat,
    description,
    transactionType,
    transactionCategory,
    viewCategories,
    file,
    vat
  ])

  return loading ? (
    <div className="transactionFormLoadingSpinner">
  <CircularProgress />
  </div>
  ) : (
    <div>
      {errorMessage && (
        <Alert severity="warning" className="searchErrorMessage">
          <AlertTitle>{errorMessage}</AlertTitle>
        </Alert>
      )}
      <div className="trasactionFormHeader">
        <h5> Registrera ny transaktion</h5>
      </div>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 3, width: '90%' }
        }}
        noValidate
        autoComplete="off"
        onSubmit={registerTranasction}
      >
        <TextField
          value={transactionType}
          onChange={(event) => setTransactionType(event.target.value)}
          select // tell TextField to render select
          label="Typ av transaktion"
          required
        >
          {transactionTypes.map((type) => {
            return (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            )
          })}
        </TextField>
        {viewCategories && (
          <TextField
            value={transactionCategory}
            onChange={(event) => setTransactionCategory(event.target.value)}
            select // tell TextField to render select
            label="Kategori"
          >
            {transactionCategories.map((category) => {
              return (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              )
            })}
          </TextField>
        )}

        <TextField
          helperText="Företagsnamn. Är kunden en privatperson anger du namnet här."
          id="outlined-basic"
          label="Företag / Namn"
          variant="outlined"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          required
        />
        <TextField
          helperText="En kort beskrivning av transaktionen."
          id="outlined-basic"
          label="Beskrivning"
          variant="outlined"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
        <TextField
          value={amountExVat}
          onChange={(event) =>
            setAmountExVat(event.target.value.replaceAll(' ', ''))
          }
          id="outlined-basic"
          label="Belopp Exkl. Moms"
          variant="outlined"
          required
        />

        <TextField
          value={vat}
          onChange={(event) => setVat(event.target.value)}
          select // tell TextField to render select
          label="Momssats"
          required
        >
          {vatRates.map((vatRate) => {
            return (
              <MenuItem key={vatRate} value={vatRate}>
                {vatRate}
              </MenuItem>
            )
          })}
        </TextField>

        <TextField
          onChange={(event) => setDate(event.target.value)}
          id="date"
          label="Fakturadatum"
          type="date"
          name="date"
          required
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
         helperText="En verifikation måste bifogas till transaktionen. Tillåtet format är .pdf och max filstorlek är 2MB."
          type="file"
          className="position-relative mt-2"
          name="file"
          label=" "
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          id="validationFormik107"
          required
        />

        <Button type="submit">Registrera transaktion</Button>
      </Box>
    </div>
  )
}

export default TransactionForm
