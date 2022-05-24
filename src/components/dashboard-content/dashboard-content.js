import './dashboard-content.css'
import * as React from 'react'

// Material UI Components
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

/**
 * Dashboard Content Component.
 * Displays content and buttons in dashboard, depending on the user permisson level.
 *
 * @returns {React.ReactElement} - Dashboard Content Component.
 */
const DashboardContent = () => {
  const admin = useSelector((state) => state.user.admin)

  return admin ? (
    <div className="dashboardContainer">
      <div className="div1">
        <Link to="/admin/customers">
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: '#ffffff' }}
            >
              Visa alla kunder
            </Typography>
          </CardContent>
          <CardActions>
            <Button sx={{ color: '#ffffff' }} size="large">
              Alla kunder &#187;
            </Button>
          </CardActions>
        </Link>
      </div>

      <div className="div2">
        <Link to="/admin/transactions">
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: '#ffffff' }}
            >
              Visa alla transaktioner
            </Typography>
          </CardContent>
          <CardActions>
            <Button sx={{ color: '#ffffff' }} size="large">
              Alla transaktioner &#187;
            </Button>
          </CardActions>
        </Link>
      </div>

      <div className="div3">
        <Link to="/admin/transactions/search">
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: '#ffffff' }}
            >
              Sök efter transaktion
            </Typography>
          </CardContent>
          <CardActions>
            <Button sx={{ color: '#ffffff' }} size="large">
              Hitta transaktion &#187;
            </Button>
          </CardActions>
        </Link>
      </div>

      <div className="div4">
        <Link to="/admin/customers/register">
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: '#ffffff' }}
            >
              Registrera ny kund
            </Typography>
          </CardContent>
          <CardActions>
            <Button sx={{ color: '#ffffff' }} size="large">
              Registrera ny kund &#187;
            </Button>
          </CardActions>
        </Link>
      </div>
    </div>
  ) : (
    <div className="dashboardContainer">
      <div className="div1">
        <Link to="/transactions/register">
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: '#ffffff' }}
            >
              Registrera transaktion
            </Typography>
          </CardContent>
          <CardActions>
            <Button sx={{ color: '#ffffff' }} size="large">
              Ny transaktion &#187;
            </Button>
          </CardActions>
        </Link>
      </div>
      <div className="div2">
        <Link to="/transactions/">
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: '#ffffff' }}
            >
              Visa alla transaktioner
            </Typography>
          </CardContent>
          <CardActions>
            <Button sx={{ color: '#ffffff' }} size="large">
              Alla transaktioner &#187;
            </Button>
          </CardActions>
        </Link>
      </div>
      <div className="div3">
        <Link to="/transactions/search">
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: '#ffffff' }}
            >
              Sök efter transaktion
            </Typography>
          </CardContent>
          <CardActions>
            <Button sx={{ color: '#ffffff' }} size="large">
              Hitta transaktion &#187;
            </Button>
          </CardActions>
        </Link>
      </div>
      <div className="div4">
        <Link to="/mina-uppgifter/">
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: '#ffffff' }}
            >
              Mina uppgifter
            </Typography>
          </CardContent>
          <CardActions>
            <Button sx={{ color: '#ffffff' }} size="large">
              Mina uppgifter &#187;
            </Button>
          </CardActions>
        </Link>
      </div>
    </div>
  )
}
export default DashboardContent
