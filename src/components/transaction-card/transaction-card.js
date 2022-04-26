import * as React from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from "dayjs";



const TransactionCard = ({transaction}) => {


    return (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 20 }} color="text" gutterBottom>
        Transaktion
      </Typography>

      <Typography sx={{ mb: 1.5 }} color="text.primary">
        Företag
      </Typography>



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
              {/* <TableCell align="right">{dayjs(transaction?.invoiceDate).format(
              "YYYY/MM/DD"
            )}</TableCell> */}
                          <TableCell align="right">{dayjs.unix(transaction?.invoiceDate).format(
              "YYYY/MM/DD"
            )}</TableCell>
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
              key="amount"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Belopp
              </TableCell>
              <TableCell align="right">{transaction?.ammout ? transaction.ammout : 0} SEK</TableCell>
            </TableRow>

            <TableRow
              key="status"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Status
              </TableCell>
              <TableCell align="right">{transaction?.done ? "Ja" : "Nej"}</TableCell>
            </TableRow>


        </TableBody>
      </Table>
    </TableContainer>

    </CardContent>
    <CardActions>
      <Button size="small">Skriv ut</Button>
    </CardActions>
  </React.Fragment>
    )
}

export default TransactionCard