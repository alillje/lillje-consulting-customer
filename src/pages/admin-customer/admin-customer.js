import "./admin-customer.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import AdminCustomerCard from "../../components/admin-customer-card/admin-customer-card";

import * as React from "react";

const AdminCustomer = () => {
  const user = useSelector((state) => state.user);
  const customer = useSelector((state) => state.customer);
  const location = useLocation();

  return (
    <AdminCustomerCard
      customerId={customer.id ? customer.id : location.state.id}
    />
  );
};

export default AdminCustomer;
