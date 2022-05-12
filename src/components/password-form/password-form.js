import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import "./password-form.css";
import axiosApiInstance from "../../services/axios-interceptor";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import { setTransaction } from "../../redux/reducers/transaction";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/user";

import validator from "validator";

// Alert
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

// TODO: Valitation of input
const PasswordForm = () => {
  const user = useSelector((state) => state.user);
  const [customer, setCustomer] = useState({})
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("")

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

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
      setCustomer(await data)
      setLoading(false);
    } catch (error) {
      dispatch(logout());
      console.log("Error in customer-card.js");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const reqBody = {
      email: validator.escape(customer.email),
      password: password,
      newPassword: newPassword,
      newPasswordConfirm: newPasswordConfirm
    };
    console.log(reqBody)

    let reqHeaders = {
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    };

      try {
        setLoading(true);
        await axiosApiInstance.patch(
          `${process.env.REACT_APP_AUTH_API}/password/${user.user.sub}`,
          reqBody,
          reqHeaders
        );
        setLoading(false);
        navigate("/mina-sidor")
      } catch (error) {
        console.log(error);
        console.log("Error in passwordform");
        setLoading(false);
        setErrorMessage("Ett oväntat fel inträffade");
      }
    }
  
    useEffect(() => {
        getCustomer()
    }, [])
  

  return loading ? (
    <CircularProgress />
  ) : (
    <div>
      <div className="trasactionFormHeader">
        <h5>Ändra lösenord</h5>
      </div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 3, width: "90%" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {errorMessage && (
          <Alert severity="info" className="searchErrorMessage">
            <AlertTitle>Ett fel inträffade</AlertTitle>
            {errorMessage}
          </Alert>
        )}




        <TextField
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          id="outlined-basic"
          label="Nuvarande Lösenord"
          variant="outlined"
          type="password"
          required
        />

<TextField
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          id="outlined-basic"
          label="Nytt Lösenord"
          variant="outlined"
          type="password"
          required
        />
<TextField
          value={newPasswordConfirm}
          onChange={(event) => setNewPasswordConfirm(event.target.value)}
          id="outlined-basic"
          label="Bekräfta nytt Lösenord"
          variant="outlined"
          type="password"
          required
        />




        <Button type="submit">Uppdatera</Button>
        <Button component={Link} to="/mina-uppgifter">Avbryt</Button>

      </Box>
    </div>
    
  );
        }

export default PasswordForm;
