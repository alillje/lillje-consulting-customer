import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import "./register-form.css";
import axiosApiInstance from "../../services/axios-interceptor";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { setStateCustomer } from "../../redux/reducers/customer";

import { useSelector, useDispatch } from "react-redux";
import validator from "validator";

// Alert
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

// TODO: Valitation of input
const RegisterForm = () => {
  const user = useSelector((state) => state.user);
  const customer = useSelector((state) => state.customer);

  const [company, setCompany] = useState("");
  const [orgNo, setOrgNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [allFieldsInput, setAllFieldsInput] = useState(false);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const checkFields = () => {
    if (
      company.length < 1 ||
      orgNo.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      confirmPassword.length < 1
    ) {
      setErrorMessage(
        "Alla fält måste fyllas i för att kunna registrera en ny kund"
      );
    }
    if (password.length < 10) {
      setErrorMessage("Lösenordet måste bestå av minst 10 tecken");
      setPassword("");
      setConfirmPassword("");
    }

    if (password !== confirmPassword) {
      setErrorMessage("Lösenorden stämmer inte överrens");
      setPassword("");
      setConfirmPassword("");
    } else {
      setAllFieldsInput(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    checkFields();
    const reqBody = {
      company: validator.escape(company),
      orgNo: validator.escape(orgNo),
      email: validator.escape(email),
      password: validator.escape(password),
    };

    let reqHeaders = {
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    };

    if (allFieldsInput) {
      try {
        setLoading(true);
        const { data } = await axiosApiInstance.post(
          `${process.env.REACT_APP_AUTH_API}/users/register`,
          reqBody,
          reqHeaders
        );
        setLoading(false);
        dispatch(
          setStateCustomer({
            id: data.id,
          })
        );
        console.log(data.id);
        navigate(`/admin/customers/${data.id}`, { state: { id: data.id } });
      } catch (err) {
        let error = JSON.parse(JSON.stringify(err));
        if (error.status === 409) {
          setErrorMessage(
            "Företagets namn eller organisationsnummer finns redan registrerat"
          );
        } else {
          setErrorMessage("Ett oväntat fel inträffade");
        }
        setLoading(false);
      }
    }
  };

  return loading ? (
    <CircularProgress />
  ) : (
    <div>
      {errorMessage && (
        <Alert severity="warning" className="searchErrorMessage">
          <AlertTitle>Ett fel inträffade</AlertTitle>
          {errorMessage}
        </Alert>
      )}
      <div className="trasactionFormHeader">
        <h5> Registrera ny kund</h5>
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
        <TextField
          id="outlined-basic"
          label="Företag"
          variant="outlined"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          required
        />

        <TextField
          id="outlined-basic"
          label="OrgNo"
          variant="outlined"
          value={orgNo}
          onChange={(event) => setOrgNo(event.target.value)}
          required
        />
        <TextField
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          required
        />

        <TextField
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          id="outlined-basic"
          label="Lösenord"
          variant="outlined"
          type="password"
          required
        />

        <TextField
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          id="outlined-basic"
          label="Bekräfta lösenord"
          variant="outlined"
          type="password"
          required
        />

        <Button type="submit">Registrera</Button>
      </Box>
    </div>
  );
};

export default RegisterForm;
