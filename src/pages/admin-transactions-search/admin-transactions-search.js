import "./admin-transactions-search.css";
import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import axiosApiInstance from "../../services/axios-interceptor";
import { setStateCustomer } from "../../redux/reducers/customer";

import SearchForm from "../../components/search-form/search-form"

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { logout } from "../../redux/reducers/user";

import CircularProgress from "@mui/material/CircularProgress";



const AdminTransactionsSearch = () => {
    const user = useSelector((state) => state.user);
    const stateCustomer = useSelector((state) => state.customer);
  
    const [customerSelected, setCustomerSelected] = useState(false)
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

    const setSearchCustomer = (event) => {
        setCustomer(event.target.value)
        dispatch(
            setStateCustomer({
              customer: event.target.value.id,
              company: event.target.value.company
            }))
            console.log(stateCustomer)
        setCustomerSelected(true)
    }
  
    useEffect(() => {
      getCustomers();
    }, []);
  

  
    return (
      <div>
        {loading ? (
          <CircularProgress className="loadingSpinner" />
        ) : (
          <div className="adminSearchFields">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 3, width: "90%", minWidth: '300px' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                value={customer}
                onChange={setSearchCustomer}
                select // tell TextField to render select
                label="Välj kund"
                sx={ { width: "100%" } }
                required
              >
                {customers.map((cust) => {
                  return (
                    <MenuItem key={cust.id} value={cust} >
                      {cust.company}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Box>
          </div>
        )}
        {customerSelected && <SearchForm />}

      </div>
      
      )
};

export default AdminTransactionsSearch;
