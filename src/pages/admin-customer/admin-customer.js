import "./admin-customer.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/user";

import { useEffect, useState } from "react";
import axiosApiInstance from "../../services/axios-interceptor";
import CustomerCard from "../../components/customer-card/customer-card";

import * as React from "react";

const AdminCustomer = () => {
  const user = useSelector((state) => state.user);
  const customer = useSelector((state) => state.customer);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  return <CustomerCard customerId={customer.id} />;
};

export default AdminCustomer;
