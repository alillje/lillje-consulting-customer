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
