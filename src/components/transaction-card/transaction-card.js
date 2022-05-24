import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axiosApiInstance from '../../services/axios-interceptor'
import dayjs from 'dayjs'

// Material UI Components
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

/**
 * Transaction Card Component.
 * Displays a card containing information about a specific transaction.
 *
 * @param {string} transaction - The ID of the transaction to display information about.
 * @returns {React.ReactElement} - Transaction Card Component.
 */
const TransactionCard = ({ transaction }) => {
  const user = useSelector((state) => state.user)
  const customer = useSelector((state) => state.customer)

  const [handled, setHandled] = useState(transaction?.done)
  // const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  /**
   * Sets the status of a transaction to true or false.
   */
  const handleStatus = async () => {
    // setLoading(true)
    const configBody = JSON.stringify({
      done: handled ? 'false' : 'true'
    })
    try {
      await axiosApiInstance.patch(
        `${process.env.REACT_APP_RESOURCE_API}/resources/${transaction.id}`,
        configBody,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.accessToken
          }
        }
      )
      handled ? setHandled(false) : setHandled(true)
      // setLoading(false)
    } catch (error) {
      navigate('/dashboard')
    }
  }

  /**
   * Prints a transaction card.
   */
  const print = () => {
    window.print()
  }

  /**
   * Navigates to the document view page.
   *
   * @param {object} event - An event object.
   */
  const viewDocument = (event) => {
    user.admin ? navigate(`/admin/documents/${transaction?.id}`, { state: { src: transaction?.documentUrl } }) : navigate(`/documents/${transaction?.id}`, { state: { src: transaction?.documentUrl } })
  }
  useEffect(() => {}, [handled])

  return (
    <React.Fragment>
      <CardContent className="print">
        {user.admin && (
          <Typography sx={{ fontSize: 20 }} color="text" gutterBottom>
            {customer?.company}
          </Typography>
        )}

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Transaktion</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key="company"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Företag
                </TableCell>
                <TableCell align="right">{transaction?.company}</TableCell>
              </TableRow>

              <TableRow
                key="date"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Fakturadatum
                </TableCell>
                <TableCell align="right">
                  {dayjs.unix(transaction?.invoiceDate).format('YYYY/MM/DD')}
                </TableCell>
              </TableRow>

              <TableRow
                key="description"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Beskrivning
                </TableCell>
                <TableCell align="right">{transaction?.description}</TableCell>
              </TableRow>

              <TableRow
                key="type"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Typ
                </TableCell>
                <TableCell align="right">
                  {transaction?.transactionType}
                </TableCell>
              </TableRow>

              {transaction?.transactionType === 'Leverantörsfaktura' && (
                <TableRow
                  key="category"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Kategori
                  </TableCell>
                  <TableCell align="right">
                    {transaction?.transactionCategory}
                  </TableCell>
                </TableRow>
              )}

              <TableRow
                key="amountIncVat"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Belopp inkl. Moms
                </TableCell>
                <TableCell align="right">
                  SEK {transaction?.amountIncVat}
                </TableCell>
              </TableRow>

              <TableRow
                key="amountExVat"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  sx={{ fontWeight: 'bold' }}
                  component="th"
                  scope="row"
                >
                  Belopp exkl. Moms
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">
                  SEK {transaction?.amountExVat}
                </TableCell>
              </TableRow>

              {user.admin && (
                <TableRow
                  key="account"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    sx={{ fontWeight: 'bold' }}
                    component="th"
                    scope="row"
                  >
                    Bokas på konto
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="right">
                    {transaction?.account}
                  </TableCell>
                </TableRow>
              )}

              <TableRow
                key="status"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  sx={{ fontWeight: 'bold' }}
                  component="th"
                  scope="row"
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    color: handled ? '#156a0b' : '#9f0909'
                  }}
                  align="right"
                >
                  {handled ? 'Hanterad' : 'Ohanterad'}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {user.admin && (
          <CardActions>
            {handled ? (
              <Button onClick={handleStatus} data="done" size="small">
                Markera som ohanterat
              </Button>
            ) : (
              <Button onClick={handleStatus} data="open" size="small">
                Markera som hanterat
              </Button>
            )}
          </CardActions>
        )}
        <CardActions>
          {transaction?.documentUrl && (
            <Button
              size="small"
              onClick={viewDocument}
            >
              Visa verifikation
            </Button>
          )}
          <CardActions>
            <Button size="small" onClick={print}>
              Skriv ut
            </Button>
          </CardActions>
        </CardActions>
      </CardContent>
    </React.Fragment>
  )
}

export default TransactionCard
