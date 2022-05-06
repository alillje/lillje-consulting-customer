import "./admin-customers.css";
import CustomersList from "../../components/customers-list/customers-list"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosApiInstance from "../../services/axios-interceptor";


import * as React from "react";


const AdminCustomers = () => {
  const user = useSelector((state) => state.user);


  return (
    <CustomersList />
  );
};

export default AdminCustomers;
