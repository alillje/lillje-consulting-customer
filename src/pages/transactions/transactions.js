import './transactions.css'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setTransaction } from '../../redux/reducers/transaction'
import { setTransactions } from '../../redux/reducers/transactions'
import axiosApiInstance from '../../services/axios-interceptor'
import dayjs from 'dayjs'

// Material UI Components
import Button from '@mui/material/Button'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'

// Bootstrap Components
import Accordion from 'react-bootstrap/Accordion'

/**
 * Transactions Component.
 * Represents the transactions page.
 *
 * @param {string} props - React props object.
 * @returns {React.ReactElement} - Transactions Component.
 */
const Transactions = (props) => {
  const user = useSelector((state) => state.user)
  const customer = useSelector((state) => state.customer)
  const { value, initPage } = props
  const [status, setStatus] = useState('')
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(false)
  const [pages, setPages] = useState(0)
  const [page, setPage] = useState(initPage)
  const limit = 10
  const apiUrl = `${process.env.REACT_APP_RESOURCE_API}/resources?page=${page}&limit=${limit}`
  const dispatch = useDispatch()
  const navigate = useNavigate()

  /**
   * Makes request to API and get transactions/resources.
   */
  const getResources = async () => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + user.accessToken
      }
    }
    let url = apiUrl
    // If user is admin, allow search by transaction author/creator
    if (user.admin) {
      url = `${apiUrl}&author=${customer.id}`
    }
    if (user.admin && status !== 'all' && status.length > 0) {
      url = `${apiUrl}&author=${customer.id}&done=${status}`
    } else if (value && value === 'done') {
      url = `${apiUrl}&done=true`
    } else if (value && value === 'open') {
      url = `${apiUrl}&done=false`
    } else if (value && value === 'leverantorsfakturor') {
      url = `${apiUrl}&transactionType=Leverantörsfaktura`
    } else if (value && value === 'kundfakturor') {
      url = `${apiUrl}&transactionType=Kundfaktura`
    } else if (value && value === 'utlagg') {
      url = `${apiUrl}&transactionType=Utlägg`
    }
    // Get resources/transactions based on url params/queries
    try {
      setLoading(true)
      const { data } = await axiosApiInstance.get(url, config)

      setResources(data.resources)
      setPages(data.pages)
      dispatch(
        setTransactions({
          transactions: data.resources,
          sub: user.user.sub
        })
      )
      setLoading(false)
    } catch (error) {
      navigate('/dashboard')
    }
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

  /**
   * Navigates to a specific transaction.
   *
   * @param {object} event - An event object.
   */
  const goToTransaction = (event) => {
    event.preventDefault()
    dispatch(
      setTransaction({
        id: event.target.getAttribute('data'),
        sub: user.user.sub
      })
    )
    user.admin ? navigate(`/admin/transactions/${event.target.getAttribute('data')}`) : navigate(`/transactions/${event.target.getAttribute('data')}`)
  }

  /**
   * Sets the status of the transactions to display.
   *
   * @param {object} event - An event object.
   */
  const setValue = (event) => {
    switch (event.target.value) {
      case 'done':
        setStatus('true')
        setPage(1)
        break
      case 'open':
        setStatus('false')
        setPage(1)
        break
      default:
        setStatus('')
        setPage(1)
    }
  }

  useEffect(() => {
    setPage(initPage || page)
    getResources()
  }, [props, initPage, page, value, status])

  return (
    <div className="resourceListContainer">
      <div className="transactionsHeader">
        {user.admin && <h3>Transaktioner för {customer.company}</h3>}
      </div>

      {customer && (
        <div className="transactionsHeader">
          {value === 'all' && <h2>Alla transaktioner</h2>}
          {value === 'done' && <h2>Hanterade transaktioner</h2>}
          {value === 'open' && <h2>Ohanterade transaktioner</h2>}
          {value === 'leverantorsfakturor' && <h2>Leveranörsfakturor</h2>}
          {value === 'kundfakturor' && <h2>Kundfakturor</h2>}
          {value === 'utlagg' && <h2>Utlägg</h2>}
        </div>
      )}
      {user.admin && (
        <div className="transactionsTopbar">
          <Button
            onClick={setValue}
            value="all"
            id="basic-button"
            aria-haspopup="true"
          >
            Alla transaktioner
          </Button>
          <Button
            onClick={setValue}
            value="done"
            id="basic-button"
            aria-haspopup="true"
          >
            Hanterade
          </Button>
          <Button
            onClick={setValue}
            value="open"
            id="basic-button"
            aria-haspopup="true"
          >
            Ohanterade
          </Button>
        </div>
      )}
      {loading ? (
        <div className="loadingSpinnerTransactions">
          <CircularProgress />
        </div>
      ) : (
        <div className="resourceList">
          {resources.length < 1 && <div className="noTransactionsToView">Inga transaktioner hittades</div>}
          {resources.map((resource) => {
            return (
              <Accordion key={resource.id}>
                <Accordion.Item eventKey={resource.id} data={resource.author}>
                  <Accordion.Header>
                    {dayjs.unix(resource?.invoiceDate).format('YYYY/MM/DD')} -{' '}
                    {resource?.company}
                  </Accordion.Header>
                  <Accordion.Body>Företag: {resource?.company}</Accordion.Body>
                  <Accordion.Body>
                    Beskrivning: {resource.description}
                  </Accordion.Body>
                  <Accordion.Body>
                    Fakturadatum:{' '}
                    {dayjs.unix(resource?.invoiceDate).format('YYYY/MM/DD')}
                  </Accordion.Body>
                  <Accordion.Body>
                    <Button data={resource.id} onClick={goToTransaction}>
                      Visa detaljer
                    </Button>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            )
          })}
        </div>
      )}

      {pages > 0 && (
        <div className="transactionsPagination">
          <Stack spacing={2}>
            <Pagination onChange={setPagination} count={pages} size="large" />
          </Stack>
        </div>
      )}
    </div>
  )
}

export default Transactions
