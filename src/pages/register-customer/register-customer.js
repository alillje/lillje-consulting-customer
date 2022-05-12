import "./register-customer.css";
import RegisterForm from "../../components/register-form/register-form"
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosApiInstance from "../../services/axios-interceptor";

import TransactionForm from "../../components/transaction-form/transaction-form";


const RegisterCustomer = () => {


  return (

    <RegisterForm />

  );
};

export default RegisterCustomer;