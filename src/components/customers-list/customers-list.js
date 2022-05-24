import './customers-list.css'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setStateCustomer } from '../../redux/reducers/customer'
import axiosApiInstance from '../../services/axios-interceptor'

// Material UI Components
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import useMediaQuery from '@mui/material/useMediaQuery'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

/**
 * Customer List Component.
 * Displays information about all registered customers.
 * Displays 10 customers at a time and implements pagination.
 *
 * @returns {React.ReactElement} - Customer List Component.
 */
const CustomersList = () => {
  const user = useSelector((state) => state.user)
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(false)
  const [pages, setPages] = useState(0)
  const [page, setPage] = useState(1)
  const limit = 10
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // This media query hides the organization number at 700px
  const matches = useMediaQuery('(min-width:700px)')

  /**
   * Makes request to API and gets customers.
   * Gets a limited number of customers when called.
   */
  const getCustomers = async () => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + user.accessToken
      }
    }
    const apiUrl = `${process.env.REACT_APP_AUTH_API}/users?page=${page}&limit=${limit}`
    try {
      setLoading(true)
      const { data } = await axiosApiInstance.get(apiUrl, config)
      setCustomers(await data.users)
      setPages(data.pages)
      setLoading(false)
    } catch (error) {}
  }

  /**
   * Sets the state customer and navigates to a specific customer page.
   *
   * @param {object} event - An event object.
   */
  const goToCustomer = (event) => {
    event.preventDefault()
    dispatch(
      setStateCustomer({
        customer: `${event.target.getAttribute('value')}`,
        company: `${event.target.getAttribute('name')}`
      })
    )
    navigate(`/admin/customers/${event.target.getAttribute('value')}`)
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
    getCustomers()
  }, [page])

  return (
    <>
      <div className="allCustomersHeader">
        <h2>Alla kunder</h2>
      </div>
      {loading ? (
        <div className="customerListLoadingSpinner">
          <CircularProgress />
        </div>
      ) : (
        <div className="customersList">
          <List
            sx={{
              width: '100%',
              maxWidth: 1200,
              bgcolor: 'background.paper',
              fontSize: 50
            }}
          >
            {customers.map((cust) => {
              return (
                <ListItem
                  key={cust.id}
                  onClick={goToCustomer}
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                      <ArrowForwardIosSharpIcon
                        value={cust.id}
                        name={cust.company}
                      />
                    </IconButton>
                  }
                  disablePadding
                  sx={{ height: 100 }}
                >
                  <ListItemButton
                    role={undefined}
                    sx={{ height: '100%' }}
                    value={cust.id}
                    name={cust.company}
                    dense
                  >
                    <ListItemIcon></ListItemIcon>
                    <ListItemText
                      data={cust.id}
                      value={cust.id}
                      sx={{ fontSize: 25, width: '50%' }}
                      id={cust.id}
                      name={cust.company}
                      primary={cust.company}
                      disableTypography
                    />
                    {matches && (
                      <ListItemText
                        sx={{ fontSize: 15 }}
                        value={cust.id}
                        id={cust.id}
                        name={cust.company}
                        secondary={`Org. nr:  ${cust.orgNo}`}
                        disableTypography
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </div>
      )}
      {pages > 0 && (
        <div className="customersPagination">
          <Stack spacing={2}>
            <Pagination onChange={setPagination} count={pages} size="large" />
          </Stack>
        </div>
      )}
    </>
  )
}

export default CustomersList
