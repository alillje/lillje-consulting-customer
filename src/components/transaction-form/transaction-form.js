import * as React from "react";
import { useState } from "react";
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

// TODO: Valitation of input
const TransactionForm = () => {
  const user = useSelector((state) => state.user);

  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [ammount, setAmmount] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const reqBody = {
      description: description,
      company: company,
      type: type,
      ammount: ammount,
      author: user.user.sub,
      date: new Date(event.target.date.value).getTime() / 1000,
    };
    let reqHeaders = {
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    };
    try {
      setLoading(true);
      const { data } = await axiosApiInstance.post(
        "http://localhost:9000/api/v1/resources",
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
    }
  };
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
          value={ammount}
          onChange={(e) => setAmmount(e.target.value)}
          id="outlined-basic"
          label="Belopp"
          variant="outlined"
          required
        />
        <TextField
          value={type}
          onChange={(e) => setType(e.target.value)}
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
