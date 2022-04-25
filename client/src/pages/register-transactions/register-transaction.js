import "./register-transaction.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosApiInstance from "../../services/axios-interceptor";

import TransactionForm from "../../components/transaction-form/transaction-form";


const RegisterTransaction = () => {


  return (

    <TransactionForm />

  );
};

export default RegisterTransaction;


/* <h1>Welcome to registrera transaktion, {user.user?.username}</h1>
<form onSubmit={registerTransaction}>
  <input
    placeholder="Beskrivning"
    type="text"
    name="description"
    value={description}
    onChange={(event) => setDescription(event.target.value)}
    required
  ></input>
          <input
    placeholder="Företag"
    type="text"
    name="company"
    value={company}
    onChange={(event) => setCompany(event.target.value)}
    required
  ></input>
  <input placeholder="Datum" type="date" name="date" required></input>
  <button type="submit">Registrera transaktion</button>
</form>
</div> */