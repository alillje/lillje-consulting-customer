import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import IconButton from "@mui/material/IconButton";
import "./customers-list.css";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/user";
import { setStateCustomer } from "../../redux/reducers/customer";

import { useEffect, useState } from "react";
import axiosApiInstance from "../../services/axios-interceptor";

const CustomersList = () => {
  const user = useSelector((state) => state.user);
  const stateCustomer = useSelector((state) => state.customer);

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let config = {
    headers: {
      Authorization: "Bearer " + user.accessToken,
    },
  };

  const getCustomers = async () => {
    try {
      setLoading(true);
      const { data } = await axiosApiInstance.get(
        `${process.env.REACT_APP_AUTH_API}/users`,
        config
      );
      setLoading(false);
      setCustomers(await data);
    } catch (error) {
      dispatch(logout());
      console.log("Error in admin-tranasctions.js");
    }
  };

  const goToCustomer = (event) => {
    event.preventDefault();
    console.log(event.target.getAttribute("value"))
    dispatch(
      setStateCustomer({
        customer: `${event.target.getAttribute("value")}`
      })
    );
      console.log(stateCustomer)
    navigate(`/admin/customers/${event.target.getAttribute("value")}`);
  };

  useEffect(() => {
    getCustomers();
    console.log(customers);

    // getResources();
  }, []);

  return (
    <>
      <div className="allCustomersHeader">
        <h1>Alla kunder</h1>
      </div>
      <div className="customersList">
        <List
          sx={{
            width: "100%",
            maxWidth: 1200,
            bgcolor: "background.paper",
            fontSize: 50,
          }}
        >
          {customers.map((cust) => {
            return (
              <ListItem
                key={cust.id}
                onClick={goToCustomer}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments">
                    <ArrowForwardIosSharpIcon value={cust.id} />
                  </IconButton>
                }
                disablePadding
                sx={{ height: 100 }}
              >
                <ListItemButton
                  role={undefined}
                  sx={{ height: "100%" }}
                  value={cust.id}
                  dense
                >
                  <ListItemIcon></ListItemIcon>
                  <ListItemText
                    data={cust.id}
                    value={cust.id}
                    sx={{ fontSize: 25 }}
                    id={cust.id}
                    primary={cust.username}
                    disableTypography
                  />
                  <ListItemText
                    sx={{ fontSize: 15 }}
                    value={cust.id}
                    id={cust.id}
                    secondary={`Org. nr:  ${cust.username}`}
                    disableTypography
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </div>
    </>
  );
};

export default CustomersList;
