import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import "./transaction-form.css";
import axiosApiInstance from "../../services/axios-interceptor";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { setTransaction } from "../../redux/reducers/transaction";

import { useSelector, useDispatch } from "react-redux";
import validator from "validator";

// Alert
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";



// TODO: Valitation of input
const TransactionForm = () => {
  const user = useSelector((state) => state.user);

  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [minParams, setMinParams] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    const reqBody = {
      description: validator.escape(description),
      company: validator.escape(company),
      type: validator.escape(type),
      amount: validator.escape(amount),
      author: validator.escape(user.user.sub),
      date: new Date(date).getTime() / 1000
    };
    let reqHeaders = {
      headers: {
        Authorization: "Bearer " + user.accessToken,
      }
    };


    if (minParams) {
    try {
      setLoading(true);
      const { data } = await axiosApiInstance.post(
        `${process.env.REACT_APP_RESOURCE_API}/resources`,
        reqBody,
        reqHeaders
      );
      setLoading(false);
      dispatch(
        setTransaction({
          id: data.id,
          sub: user.user.sub,
        })
      );
      navigate(`/transactions/${data.id}`);
    } catch (error) {
      console.log(error);
      console.log("Error in transaction/register");
      setLoading(false);
      setErrorMessage("Ett oväntat fel inträffade");
    }
  } else {
    setErrorMessage("Alla fält måste fyllas i för att kunna registrera en ny transaktion");

}
  }

  useEffect(() => {
    if (company.length > 0 && date.length > 0 && amount.length > 0 && description.length > 0) {
      setMinParams(true)
    } else {
      setMinParams(false)

    }
    console.log(minParams)
  }, [minParams, company, date, amount, description]);



  return loading ? (
    <CircularProgress />
  ) : (
    <div>
      <div className="trasactionFormHeader">
        <h5> Registrera ny transaktion</h5>
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
          id="outlined-basic"
          label="Företag"
          variant="outlined"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          required
        />
        <TextField
          id="outlined-basic"
          label="Beskrivning"
          variant="outlined"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
        <TextField
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          id="outlined-basic"
          label="Belopp"
          variant="outlined"
          required
        />
        <TextField
          value={type}
          onChange={(event) => setType(event.target.value)}
          select // tell TextField to render select
          label="Typ av transaktion"
        >
          <MenuItem key={1} value="test">
            Test 1
          </MenuItem>
          <MenuItem key={2} value="test2">
            Test 2
          </MenuItem>
        </TextField>
        <TextField
          onChange={(event) => setDate(event.target.value)}
          id="date"
          label="Fakturadatum"
          type="date"
          name="date"
          required
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit">Registrera</Button>
      </Box>
    </div>
  );
};


export default TransactionForm;
