import "./admin-transactions.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axiosApiInstance from "../../services/axios-interceptor";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/reducers/user";

import { setTransaction } from "../../redux/reducers/transaction";
import { setTransactions } from "../../redux/reducers/transactions";
import { setStateCustomer } from "../../redux/reducers/customer";

import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import Accordion from "react-bootstrap/Accordion";
import CircularProgress from "@mui/material/CircularProgress";

const AdminTransactions = () => {
  const user = useSelector((state) => state.user);
  const stateCustomer = useSelector((state) => state.customer);


  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({});
  const [companyName, setCompanyName] = useState("");
  // const transaction = useSelector((state) => state.transaction);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  // let { contextData } = useContext(AuthContext)
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
      setCustomers(await data.users);
    } catch (error) {
      if (error.status === 401) {
      dispatch(logout());
      }
      console.log("Error in admin-tranasctions.js");
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const goToTransactions = (event) => {
    event.preventDefault();
    dispatch(
      setStateCustomer({
        customer: customer.id,
        company: customer.company
      })
    );
    navigate(`/admin/customers/${customer.id}/transactions`);
  };

  return (
    <div>
      {loading ? (
        <CircularProgress className="loadingSpinner" />
      ) : (
        <div className="customersList">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 3, width: "90%" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              value={customer}
              onChange={event => (setCustomer(event.target.value))}
              select // tell TextField to render select
              label="Välj kund"
              sx={ { width: "100%" } }
            >
              {customers.map((cust) => {
                return (
                  <MenuItem key={cust.id} value={cust} >
                    {cust.company}
                  </MenuItem>
                );
              })}
            </TextField>
            {customer?.id && <Button onClick={goToTransactions}>Visa transaktioner</Button>}
          </Box>
        </div>
      )}
    </div>
  );
};

export default AdminTransactions;
