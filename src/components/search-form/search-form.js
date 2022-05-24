import './search-form.css'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setTransaction } from '../../redux/reducers/transaction'
import axiosApiInstance from '../../services/axios-interceptor'
import dayjs from 'dayjs'
import validator from 'validator'

// Bootstrap Component
import Accordion from 'react-bootstrap/Accordion'

// Material UI Components
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

/**
 * Search Form Component.
 * Displays a form to set search parameters and performs a search.
 *
 * @returns {React.ReactElement} - Search Form Component.
 */
export default function SearchForm () {
  const user = useSelector((state) => state.user)
  const stateCustomer = useSelector((state) => state.customer)
  const [errorMessage, setErrorMessage] = useState('')
  const [transactions, setTransactions] = useState([])
  const [company, setCompany] = useState('')
  const [date, setDate] = useState('')
  const [minParams, setMinParams] = useState(false)
  const [loading, setLoading] = useState(false)
  const [completeSearch, setCompleteSearch] = useState(false)
  const [transactionType, setTransactionType] = useState('')
  const transactionTypes = ['Leverantörsfaktura', 'Kundfaktura', 'Utlägg']
  const [pages, setPages] = useState(0)
  const [page, setPage] = useState(1)
  const limit = 10
  let apiUrl = `${process.env.REACT_APP_RESOURCE_API}/resources`

  const dispatch = useDispatch()
  const navigate = useNavigate()

  /**
   * Takes strings as arguments and constructs a query url.
   *
   * @param {string} companySanitized - Company name to use for construction of url.
   * @param {string} dateSanitized - Date string in unix to use for construction of url.
   * @param {string} transactionTypeSanitized - Transaction type to use for construction of url.
   * @returns {string} - A string representing a query URL.
   */
  const setUrl = (
    companySanitized,
    dateSanitized,
    transactionTypeSanitized
  ) => {
    let url
    if (
      companySanitized.length > 0 &&
      dateSanitized.length > 0 &&
      transactionTypeSanitized.length > 0
    ) {
      url = `${apiUrl}?company=${companySanitized.replace(
        ' ',
        '+'
      )}&invoiceDate=${
        new Date(dateSanitized).getTime() / 1000
      }&transactionType=${transactionTypeSanitized}`
      setMinParams(true)
    } else if (companySanitized.length > 0) {
      url = `${apiUrl}?company=${companySanitized.replace(' ', '+')}`
    } else if (dateSanitized.length > 0) {
      url = `${apiUrl}?invoiceDate=${new Date(dateSanitized).getTime() / 1000}`
    } else if (transactionType.length > 0) {
      url = `${apiUrl}?transactionType=${transactionTypeSanitized}`
    }
    if (user.admin) {
      url = `${url}&author=${stateCustomer.id}`
    }

    return url
  }

  /**
   * Performs a search based on given search parameters.
   *
   * @param {object} event - An event object
   */
  const performSearch = async (event) => {
    event.preventDefault()
    // Sanitize html and set search params
    const companySanitized = validator.escape(company)
    const dateSanitized = validator.escape(date)
    const transactionTypeSantized = validator.escape(transactionType)

    const url = setUrl(
      companySanitized,
      dateSanitized,
      transactionTypeSantized
    )

    if (url) {
      apiUrl = `${url}&limit=${limit}`
      setMinParams(true)
    }
    if (minParams) {
      const reqHeaders = {
        headers: {
          Authorization: 'Bearer ' + user.accessToken
        }
      }
      try {
        setLoading(true)
        const { data } = await axiosApiInstance.get(apiUrl, reqHeaders)
        setTransactions(data.resources)
        setPages(data.pages)
        setErrorMessage('')
        setDate('')
        setCompany('')
        setCompleteSearch(true)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setErrorMessage('Ett oväntat fel inträffade')
      }
    } else {
      setErrorMessage('Minst en sökparameter måste anges')
    }
  }

  /**
   * Navigates to a specific transaction.
   *
   * @param {object} event - An event object
   */
  const goToTransaction = (event) => {
    event.preventDefault()
    // Sets the state transaction sub to the user owning the transaction
    // If admin, set state transaction sub to the state customer
    if (!user.admin) {
      dispatch(
        setTransaction({
          id: event.target.getAttribute('data'),
          sub: user.user.sub
        })
      )
    } else {
      dispatch(
        setTransaction({
          id: event.target.getAttribute('data'),
          sub: stateCustomer.id
        })
      )
    }
    user.admin ? navigate(`/admin/transactions/${event.target.getAttribute('data')}`) : navigate(`/transactions/${event.target.getAttribute('data')}`)
  }

  /**
   * Sets the state to complete search.
   */
  const newSearch = () => {
    setCompleteSearch(false)
    setMinParams(false)
    setCompany('')
  }

  /**
   * Sets the next and previous page buttons depending on current page number.
   *
   * @param {object} event - An event object.
   */
  const setPagination = (event) => {
    if (event.target.getAttribute('data-testid') === 'NavigateBeforeIcon') {
      const prevPage = page - 1
      setPage(prevPage)
    } else if (event.target.getAttribute('aria-label') === 'Go to next page') {
      const prevPage = page - 1
      setPage(prevPage)
    } else if (
      event.target.getAttribute('data-testid') === 'NavigateNextIcon'
    ) {
      const prevPage = page + 1
      setPage(prevPage)
    } else if (
      event.target.getAttribute('aria-label') === 'Go to previous page'
    ) {
      const prevPage = page - 1
      setPage(prevPage)
    } else {
      setPage(parseInt(event.target.textContent))
    }
  }

  useEffect(() => {
    if (company.length > 0) {
      setMinParams(true)
    }
    if (date.length > 0) {
      setMinParams(true)
    }
    if (transactionType.length > 0) {
      setMinParams(true)
    }
  }, [minParams, company, date, page, transactionType])

  if (loading) {
    return (
      <div className="searchTransactionsLoadingSpinner">
        <CircularProgress />
      </div>
    )
  } else if (completeSearch && minParams) {
    return (
      <div className="searchTransactionListContainer">
        <div className="searchFormHeaderGrid">
          <h5>Sök Transaktion</h5>
        </div>

        <div className="searchTransactionList">
          {transactions?.length ? (
            transactions.map((transaction) => {
              return (
                <Accordion key={transaction.id}>
                  <Accordion.Item
                    eventKey={transaction.id}
                    data={transaction.author}
                  >
                    <Accordion.Header>
                      {user.admin && `${stateCustomer?.company} - `}
                      {dayjs
                        .unix(transaction?.invoiceDate)
                        .format('YYYY/MM/DD')}
                      {!user.admin && ` - ${transaction?.company}`}

                    </Accordion.Header>
                    <Accordion.Body>
                      Företag: {transaction?.company}
                    </Accordion.Body>
                    <Accordion.Body>
                      Typ: {transaction?.transactionType}
                    </Accordion.Body>
                    <Accordion.Body>
                      Fakturadatum:{' '}
                      {dayjs
                        .unix(transaction?.invoiceDate)
                        .format('YYYY/MM/DD')}
                    </Accordion.Body>
                    <Accordion.Body>
                      <Button data={transaction.id} onClick={goToTransaction}>
                        Visa detaljer
                      </Button>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              )
            })
          ) : (
            <div className="searchNoResults">Inget resultat</div>
          )}
        </div>
        <div className="searchResPagination">
          <Stack spacing={2}>
            <Pagination onChange={setPagination} count={pages} size="large" />
          </Stack>
        </div>
        <div className="newSearch">
          <Button variant="text" onClick={newSearch} sx={{ color: '#000000' }}>
            &#171; Ny sökning
          </Button>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div className="searchFormHeader">
          <h5>Sök Transaktion</h5>
        </div>
        {errorMessage && (
          <Alert severity="info" className="searchErrorMessage">
            <AlertTitle>Ett fel inträffade</AlertTitle>
            {errorMessage}
          </Alert>
        )}
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 3, width: '90%' }
          }}
          noValidate
          autoComplete="off"
          onSubmit={performSearch}
        >
          <TextField
            id="outlined-basic"
            label="Företag"
            variant="outlined"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />

          <TextField
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            select // tell TextField to render select
            label="Typ av transaktion"
          >
            {transactionTypes.map((type) => {
              return (
                <MenuItem key={type} value={type}>
                  {type}
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
          <Button type="submit">Sök</Button>
        </Box>
      </div>
    )
  }
}
