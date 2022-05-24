import './admin-sidebar.css'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutHandler } from '../../services/logout-service'
import { hideSidemenu } from '../../redux/reducers/sidemenu'

// Material UI Components
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

// Material UI Icons
import PeopleSharpIcon from '@mui/icons-material/PeopleSharp'
import ArticleSharpIcon from '@mui/icons-material/ArticleSharp'
import FindInPageSharpIcon from '@mui/icons-material/FindInPageSharp'
import PeopleOutlineSharpIcon from '@mui/icons-material/PeopleOutlineSharp'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp'

/**
 * Admin Sidebar Component.
 * Displays a sidebar with buttons and links. Displayed for admin users only.
 *
 * @param {string} width - The width to set for the sidebar.
 * @returns {React.ReactElement} - Admin Sidebar Component.
 */
const AdminSidebar = ({ width = undefined }) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  /**
   * Logs a user out.
   */
  const handleLogout = () => {
    logoutHandler(user)
  }

  /**
   * Hides the sidebar, if media screen is less than 700px.
   */
  const hideMobileSidebar = () => {
    dispatch(hideSidemenu())
  }

  const drawerWidth = width || 250
  return (
    <Drawer
      className="adminsidebarDrawer"
      variant="permanent"
      sx={{
        width: drawerWidth,
        m: 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' }
      }}
    >
      {' '}
      <Box sx={{ overflow: 'auto' }}>
        <Toolbar />
        <List>
          <ListItem
            button
            onClick={hideMobileSidebar}
            component={Link}
            to="/admin/transactions"
          >
            <ListItemIcon>
              <ArticleSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Transaktioner" />
          </ListItem>

          <ListItem
            button
            onClick={hideMobileSidebar}
            component={Link}
            to="/admin/customers"
          >
            <ListItemIcon>
              <PeopleSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Kunder" />
          </ListItem>

          <ListItem
            button
            onClick={hideMobileSidebar}
            component={Link}
            to="/admin/transactions/search"
          >
            <ListItemIcon>
              <FindInPageSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Hitta transaktion" />
          </ListItem>

          <ListItem
            button
            onClick={hideMobileSidebar}
            component={Link}
            to="/admin/customers/register"
          >
            <ListItemIcon>
              <GroupAddIcon />
            </ListItemIcon>
            <ListItemText primary="Registrera ny kund" />
          </ListItem>

          <Divider />

          <ListItem
            button
            onClick={hideMobileSidebar}
            component={Link}
            to="/admin/mina-uppgifter"
          >
            <ListItemIcon>
              <PeopleOutlineSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Mina uppgifter" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Logga ut" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}

export default AdminSidebar
