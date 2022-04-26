import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import "./search-form.css";
import axiosApiInstance from "../../services/axios-interceptor";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { setTransaction } from "../../redux/reducers/transaction";

import { useSelector, useDispatch } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import dayjs from "dayjs";

// Alert
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

// TODO: Valitation of input
const SearchForm = () => {
  const user = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [company, setCompany] = useState("");
  const [minParams, setMinParams] = useState(false);
  const [ammount, setAmmount] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [completeSearch, setCompleteSearch] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let i = 0;

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Set search params
    let apiUrl = `${process.env.REACT_APP_RESOURCE_API}/resources`;
    if (company.length > 0 && event.target.date.value.length > 0) {
      apiUrl = `${apiUrl}?company=${company.replace(" ", "+")}&invoiceDate=${
        new Date(event.target.date.value).getTime() / 1000
      }`;
      setMinParams(true);
    } else if (company.length > 0) {
      apiUrl = `${apiUrl}?company=${company.replace(" ", "+")}`;
      setMinParams(true);
    } else if (event.target.date.value.length > 0) {
      apiUrl = `${apiUrl}?invoiceDate=${
        new Date(event.target.date.value).getTime() / 1000
      }`;
      setMinParams(true);
    }
    let reqHeaders = {
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    };
    if (minParams) {
      try {
        setLoading(true);
        const { data } = await axiosApiInstance.get(apiUrl, reqHeaders);
        setCompleteSearch(true);

        setLoading(false);
        setTransactions(data.reverse());
        setErrorMessage("");

        console.log(data);
      } catch (error) {
        console.log(error);
        console.log("Error in transaction/search");
        return (
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            This is an info alert — <strong>check it out!</strong>
          </Alert>
        );
      }
    } else {
      setErrorMessage("Minst en sökparameter måste anges");
    }
  };

  const goToTransaction = (event) => {
    event.preventDefault();
    dispatch(
      setTransaction({
        id: event.target.getAttribute("data"),
        sub: user.user.sub,
      })
    );
    navigate(`/transactions/${event.target.getAttribute("data")}`);
  };

  const getId = () => {
    return i++;
  };

  const newSearch = () => {
    setCompleteSearch(false);
    setCompany("");
  };

  if (loading) {
    return (
      <div className="searchLoadingSpinner">
        <CircularProgress />
      </div>
    );
  } else if (completeSearch && minParams) {
    return (
      <div className="searchTransactionListContainer">
        <div className="searchFormHeaderGrid">
          <h5>Sök Transaktion</h5>
        </div>

        <div className="searchTransactionList">
          {transactions?.length ? (
            transactions.map((transaction) => {
              let id = getId();

              return (
                <Accordion key={transaction.id}>
                  <Accordion.Item eventKey={id} data={transaction.author}>
                    <Accordion.Header>
                      {transaction?.company} -{" "}
                      {dayjs
                        .unix(transaction?.invoiceDate)
                        .format("YYYY/MM/DD")}
                    </Accordion.Header>
                    <Accordion.Body>
                      Företag: {transaction?.company}
                    </Accordion.Body>
                    <Accordion.Body>
                      Beskrivning: {transaction.description}
                    </Accordion.Body>
                    <Accordion.Body>
                      Fakturadatum:{" "}
                      {dayjs
                        .unix(transaction?.invoiceDate)
                        .format("YYYY/MM/DD")}
                    </Accordion.Body>
                    <Accordion.Body>
                      <Button data={transaction.id} onClick={goToTransaction}>
                        Visa detaljer
                      </Button>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              );
            })
          ) : (
            <div className="searchNoResults">Inget resultat</div>
          )}
        </div>
        <Button variant="text" onClick={newSearch} sx={{ color: "#000000" }}>
          &#171; Ny sökning
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        <div className="searchFormHeader">
          <h5>Sök Transaktion</h5>
        </div>
        {errorMessage && (
            <Alert severity="info" className="searchErrorMessage">
              <AlertTitle>Ett fel inträffade</AlertTitle>
              {errorMessage}
            </Alert>
          )}
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
          <Button type="submit">Sök</Button>
        </Box>
      </div>
    );
  }
};

export default SearchForm;
