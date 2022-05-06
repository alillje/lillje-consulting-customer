import "./admin-customer-transaction.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";



const AdminCustomerTransactions = () => {
  const user = useSelector((state) => state.user);
  const customer = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(false);



  return <div>Specific transaction</div>;
};

export default AdminCustomerTransactions;
