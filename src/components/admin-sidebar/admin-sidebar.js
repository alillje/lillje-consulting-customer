import { useState } from "react";
import "./admin-sidebar.css";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

// Icons
import AddBoxSharpIcon from "@mui/icons-material/AddBoxSharp";
import PeopleSharpIcon from '@mui/icons-material/PeopleSharp';
import ArticleSharpIcon from '@mui/icons-material/ArticleSharp';
import PersonSearchSharpIcon from '@mui/icons-material/PersonSearchSharp';
import FindInPageSharpIcon from '@mui/icons-material/FindInPageSharp';
import ViewListSharpIcon from "@mui/icons-material/ViewListSharp";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import ManageSearchSharpIcon from "@mui/icons-material/ManageSearchSharp";
import KeyboardDoubleArrowRightSharpIcon from '@mui/icons-material/KeyboardDoubleArrowRightSharp';
import { useSelector } from "react-redux";
import { logoutHandler } from "../../services/logout-service";

/**
 * Component
 *
 * @param {*} props
 * @return {*}
 */
const AdminSidebar = () => {
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    logoutHandler(user);
  };

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const drawerWidth = 250;
  return (
    <Drawer
      className="adminsidebarDrawer"
      variant="permanent"
      sx={{
        width: drawerWidth,
        m: 0,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      {" "}
      <Box sx={{ overflow: "auto" }}>
        <Toolbar />
        <List>
          <ListItem button component={Link} to="/admin/transactions">
            <ListItemIcon>
              <ArticleSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Transaktioner" />
          </ListItem>

          <ListItem button component={Link} to="/admin/customers">
            <ListItemIcon>
              <PeopleSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Kunder" />
          </ListItem>

          <ListItem button component={Link} to="/admin/customers/search">
            <ListItemIcon>
              <PersonSearchSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Hitta kund" />
          </ListItem>

          <ListItem button component={Link} to="/admin/transactions/search">
            <ListItemIcon>
              <FindInPageSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Hitta transaktion" />
          </ListItem>
 


          <Divider />
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Logga ut" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;
