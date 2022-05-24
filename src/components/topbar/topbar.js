import './topbar.css'
import * as React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { showSidemenu, hideSidemenu } from '../../redux/reducers/sidemenu'
import { logoutHandler } from '../../services/logout-service'

// Material UI Components
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp'

/**
 * Topbar Component.
 * Displays a topbar with icons and links.
 *
 * @returns {React.ReactElement} - Sidebar Component.
 */
const TopBar = () => {
  const user = useSelector((state) => state.user)
  const sidemenu = useSelector((state) => state.sidemenu)
  const dispatch = useDispatch()
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  /**
   * Opens/closes the nav menu.
   *
   */
  const handleOpenNavMenu = () => {
    if (sidemenu.show) {
      dispatch(hideSidemenu())
    } else {
      dispatch(showSidemenu())
    }
  }

  /**
   * Opens the menu and displays the logout button.
   *
   * @param {object} event - An event object
   */
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  /**
   *
   */
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  /**
   * Opens the menu and displays the logout button.
   *
   */
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  /**
   * Logs a user out.
   */
  const handleLogout = () => {
    logoutHandler(user)
  }

  /**
   * Hides the menu.
   */
  const hideMenu = () => {
    dispatch(hideSidemenu())
  }

  return (
    <AppBar
      className="topBar"
      position="fixed"
      sx={{
        /**
         * Sets the zIndex and the background color of the top bar.
         *
         * @param {object} theme - The material UI theme object to use zIndex from.
         * @returns {string} - The background color to use.
         */
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#161b37'
      }}
    >
      <Container maxWidth="100%">
        <Toolbar disableGutters>
          <Typography
            onClick={hideMenu}
            component={Link}
            to="/dashboard"
            variant="h6"
            noWrap
            sx={{ mr: 1, display: { xs: 'none', md: 'flex' } }}
            className="topbarHomeButton"
          >
            LILLJE CONSULTING
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            ></Menu>
          </Box>
          <Typography
            component={Link}
            onClick={hideMenu}
            to="/dashboard"
            variant="h6"
            noWrap
            className="topbarHomeButtonMobile"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LILLJE CONSULTING
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
          {user.auth && (
            <Box sx={{ flexGrow: 0 }}>
              {user.auth && (
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  Inloggad som:{' '}
                  {user.admin ? 'Administratör' : user.user.company}
                </Box>
              )}
              <AccountCircleSharpIcon
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              ></AccountCircleSharpIcon>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key="logout" onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default TopBar
