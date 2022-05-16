import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./admin-customer-card.css";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/user";

import { useEffect, useState } from "react";
import axiosApiInstance from "../../services/axios-interceptor";

const AdminCustomerCard = ({ customerId }) => {
  const user = useSelector((state) => state.user);
  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let config = {
    headers: {
      Authorization: "Bearer " + user.accessToken,
    },
  };

  const getCustomer = async () => {
    try {
      setLoading(true);
      const { data } = await axiosApiInstance.get(
        `${process.env.REACT_APP_AUTH_API}/users/${customerId}`,
        config
      );
      setLoading(false);
      setCustomer(await data);
    } catch (error) {
      dispatch(logout());
      console.log("Error in admin-tranasctions.js");
    }
  };

  const goToTransactions = () => {
    navigate(`/admin/customers/${customer.id}/transactions`);
  };

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <div className="adminCustomerCardContainer">
      <Card
        className="adminCustomerCard"
        sx={{
          boxShadow: "none",
          width: "100%",
          maxWidth: 1500,
          padding: 2,
          margin: 3,
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {customer.company}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Organisationsnummer: {customer.orgNo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: {customer.email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={goToTransactions}>
            Transaktioner
          </Button>
          <Button size="small">Ändra epostadress</Button>

          <Button size="small">Återställ lösenord</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default AdminCustomerCard;
