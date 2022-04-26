import { useState } from "react";
import "./sidebar.css";
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
const Sidebar = () => {
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
      className="sidebarDrawer"
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
          <ListItem button component={Link} to="/transactions/register">
            <ListItemIcon>
              <AddBoxSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Ny transaktion" />
          </ListItem>

          <ListItem onClick={handleClick}>
            <ListItemIcon>
              <ViewListSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Transaktioner" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/transactions"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                <KeyboardDoubleArrowRightSharpIcon fontSize="xs" />
                </ListItemIcon>
                <ListItemText primary="Alla transaktioner" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/transactions"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                <KeyboardDoubleArrowRightSharpIcon fontSize="xs" />

                </ListItemIcon>
                <ListItemText primary="Hanterade transaktioner" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/transactions"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                <KeyboardDoubleArrowRightSharpIcon fontSize="xs" />

                </ListItemIcon>
                <ListItemText primary="Ohanterade transaktioner" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/transactions"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                <KeyboardDoubleArrowRightSharpIcon fontSize="xs" />

                </ListItemIcon>
                <ListItemText primary="Leverantörsfakturor" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/transactions"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                <KeyboardDoubleArrowRightSharpIcon fontSize="xs" />

                </ListItemIcon>
                <ListItemText primary="Kundfakturor" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/transactions"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                <KeyboardDoubleArrowRightSharpIcon fontSize="xs" />

                </ListItemIcon>
                <ListItemText primary="Utlägg" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button component={Link} to="/transactions">
            <ListItemIcon>
              <ManageSearchSharpIcon />
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

export default Sidebar;