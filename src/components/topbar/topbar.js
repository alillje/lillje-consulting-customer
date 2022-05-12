import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";

import "./topbar.css"
import { useSelector, useDispatch } from "react-redux";
import { showSidemenu, hideSidemenu } from "../../redux/reducers/sidemenu";

import { logoutHandler } from "../../services/logout-service";

import { Link } from "react-router-dom";

const TopBar = () => {
  const user = useSelector((state) => state.user);
  const sidemenu = useSelector((state) => state.sidemenu);
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [showSideMenu, setShowSideMenu] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    if (sidemenu.show) {
      dispatch(hideSidemenu())
    } else {
      dispatch(showSidemenu())
    }
    // setAnchorElNav(event.currentTarget);
    // console.log(showSideMenu)
    console.log(sidemenu)

  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    console.log('navmenu')
    // console.log(showSideMenu)


  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logoutHandler(user);
  };

  return (
    <AppBar
      className="topBar"
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#161b37",
      }}
    >
      <Container maxWidth="100%">
        <Toolbar disableGutters>
          <Typography
            component={Link}
            to="/dashboard"
            variant="h6"
            noWrap
            sx={{ mr: 1, display: { xs: "none", md: "flex" } }}
            className="topbarHomeButton"
          >
            LILLJE CONSULTING
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >

            </Menu>
          </Box>
          <Typography
            component={Link}
            to="/dashboard"
            variant="h6"
            noWrap
            className="topbarHomeButtonMobile"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LILLJE CONSULTING
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
 
          </Box>
          {user.auth &&

          <Box sx={{ flexGrow: 0 }}>
                 {user.auth && <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
Inloggad som: {user.admin ? 'Administratör' : user.user.company}
 </Box>}
            <AccountCircleSharpIcon
              onClick={handleOpenUserMenu}
              sx={{ p: 0 }}
            ></AccountCircleSharpIcon>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="logout" onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>

            </Menu>
          </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default TopBar;
