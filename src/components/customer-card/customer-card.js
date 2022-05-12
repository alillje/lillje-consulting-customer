import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./customer-card.css";

import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/user";
import { setCustomer } from "../../redux/reducers/customer";

import { useEffect, useState } from "react";
import axiosApiInstance from "../../services/axios-interceptor";

const CustomerCard = () => {
  const user = useSelector((state) => state.user);
  const admin = useSelector((state) => state.user.admin);

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
        `${process.env.REACT_APP_AUTH_API}/user/${user.user.sub}`,
        config
      );
      setLoading(false);
      setCustomer(await data);

    } catch (error) {
      dispatch(logout());
      console.log("Error in customer-card.js");
    }
  };

  const goToTransactions = () => {
      navigate("/transactions")
  }
  
  useEffect(() => {
      getCustomer()
  }, [])



  return (

      <div className="customerCardContainer">
    <Card className="customerCard" sx={{boxShadow: "none", width: '100%', maxWidth: 1500, padding: 2, margin: 3 }}>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {customer.company}
        </Typography>
        {!customer.admin && <Typography variant="body2" color="text.secondary">
          Organisationsnummer: {customer.orgNo}
        </Typography>}
        <Typography variant="body2" color="text.secondary">
          Email: {customer.email}
        </Typography>
      </CardContent>
      <CardActions>
        {!customer.admin && <Button size="small" onClick={goToTransactions}>Transaktioner</Button>}
        <Button size="small" component={Link} to="/mina-uppgifter/uppdatera">Ändra uppgifter</Button>
        <Button size="small" component={Link} to="/mina-uppgifter/password/uppdatera">Ändra lösenord</Button>
      </CardActions>
    </Card>
    </div>
  );
};

export default CustomerCard;
