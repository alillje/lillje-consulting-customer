import "./admin-customer-transactions.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/user";
import { setTransaction } from "../../redux/reducers/transaction";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import axiosApiInstance from "../../services/axios-interceptor";

import Accordion from "react-bootstrap/Accordion";
import Button from "@mui/material/Button";
import dayjs from "dayjs";


import * as React from "react";

const AdminCustomerTransactions = () => {
  const user = useSelector((state) => state.user);
  const customer = useSelector((state) => state.customer);
  const transaction = useSelector((state) => state.transaction);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([])

  const [loading, setLoading] = useState(false);

  let config = {
    headers: {
      Authorization: "Bearer " + user.accessToken,
    },
  };

  const getTransactions = async () => {
    try {
      setLoading(true);
      const { data } = await axiosApiInstance.get(`${process.env.REACT_APP_RESOURCE_API}/resources?author=${customer.id}`, config);
      setTransactions(data);
      setLoading(false);
      console.log(transactions);
    } catch (error) {
      dispatch(logout());
      console.log("Error in transactions.js");
    }
  };

  const goToTransaction = (event) => {
    event.preventDefault();
    event.target.getAttribute("data")
    dispatch(
      setTransaction({
        id: event.target.getAttribute("data"),
        sub: user.user.sub,
      })
    );
    console.log(event.target.getAttribute("data"));
    navigate(`/admin/transactions/${event.target.getAttribute("data")}`)
  };

  useEffect(() => {
    getTransactions();
    console.log(customer)
  }, []);

  return ( <div>
          {transactions.map((transaction) => {

            return (
              <Accordion key={transaction.id}>
                <Accordion.Item eventKey={transaction.id} data={transaction.author}>
                  <Accordion.Header>
                    {transaction?.company} -{" "}
                    {dayjs.unix(transaction?.invoiceDate).format("YYYY/MM/DD")}
                  </Accordion.Header>
                  <Accordion.Body>Företag: {transaction?.company}</Accordion.Body>
                  <Accordion.Body>
                    Beskrivning: {transaction.description}
                  </Accordion.Body>
                  <Accordion.Body>
                    Fakturadatum:{" "}
                    {dayjs.unix(transaction?.invoiceDate).format("YYYY/MM/DD")}
                  </Accordion.Body>
                  <Accordion.Body>
                    <Button data={transaction.id} onClick={goToTransaction}>
                      Visa detaljer
                    </Button>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            );
          })}

  </div>)
};

export default AdminCustomerTransactions;
