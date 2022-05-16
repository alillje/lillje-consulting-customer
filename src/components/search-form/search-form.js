import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
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
import validator from "validator";
// Alert
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

// TODO: Validate input
export default function SearchForm () {
  const user = useSelector((state) => state.user);
  const stateCustomer = useSelector((state) => state.customer);

  const [errorMessage, setErrorMessage] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [company, setCompany] = useState("");
  const [date, setDate] = useState("");
  const [minParams, setMinParams] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completeSearch, setCompleteSearch] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const transactionTypes = ["Leverantörsfaktura", "Kundfaktura", "Utlägg"];
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);
  let limit = 10;
  let apiUrl = `${process.env.REACT_APP_RESOURCE_API}/resources`;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Construct url from params
  const setUrl = (
    companySanitized,
    dateSanitized,
    transactionTypeSanitized
  ) => {
    let url;
    if (
      companySanitized.length > 0 &&
      dateSanitized.length > 0 &&
      transactionTypeSanitized.length > 0
    ) {
      url = `${apiUrl}?company=${companySanitized.replace(
        " ",
        "+"
      )}&invoiceDate=${
        new Date(dateSanitized).getTime() / 1000
      }&transactionType=${transactionTypeSanitized}`;
      setMinParams(true);
    } else if (companySanitized.length > 0) {
      url = `${apiUrl}?company=${companySanitized.replace(" ", "+")}`;
    } else if (dateSanitized.length > 0) {
      url = `${apiUrl}?invoiceDate=${new Date(dateSanitized).getTime() / 1000}`;
    } else if (transactionType.length > 0) {
      url = `${apiUrl}?transactionType=${transactionTypeSanitized}`;
    }
    if (user.admin) {
      url = `${url}&author=${stateCustomer.id}`;
    }

    return url;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Sanitize html and set search params
    const companySanitized = validator.escape(company);
    const dateSanitized = validator.escape(date);
    const transactionTypeSantized = validator.escape(transactionType);

    let url = setUrl(companySanitized, dateSanitized, transactionTypeSantized);

    if (url) {
      apiUrl = `${url}&limit=${limit}`;
      setMinParams(true);
    }
    console.log(url);
    if (minParams) {
      let reqHeaders = {
        headers: {
          Authorization: "Bearer " + user.accessToken,
        },
      };
      try {
        setLoading(true);
        const { data } = await axiosApiInstance.get(apiUrl, reqHeaders);
        setTransactions(data.resources);
        setPages(data.pages);
        setErrorMessage("");
        setDate("");
        setCompany("");
        setCompleteSearch(true);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setErrorMessage("Ett oväntat fel inträffade");
      }
    } else {
      setErrorMessage("Minst en sökparameter måste anges");
    }
  };

  const goToTransaction = (event) => {
    event.preventDefault();
    console.log(stateCustomer);
    if (!user.admin) {
      dispatch(
        setTransaction({
          id: event.target.getAttribute("data"),
          sub: user.user.sub,
        })
      );
    } else {
      dispatch(
        setTransaction({
          id: event.target.getAttribute("data"),
          sub: stateCustomer.id,
        })
      );
    }
    console.log(user.admin);
    user.admin
      ? navigate(`/admin/transactions/${event.target.getAttribute("data")}`)
      : navigate(`/transactions/${event.target.getAttribute("data")}`);
  };

  const newSearch = () => {
    setCompleteSearch(false);
    setMinParams(false);
    setCompany("");
  };

  const handleChange = (event) => {
    if (event.target.getAttribute("data-testid") === "NavigateBeforeIcon") {
      let prevPage = page - 1;
      setPage(prevPage);
    } else if (event.target.getAttribute("aria-label") === "Go to next page") {
      let prevPage = page - 1;
      setPage(prevPage);
    } else if (
      event.target.getAttribute("data-testid") === "NavigateNextIcon"
    ) {
      let prevPage = page + 1;
      setPage(prevPage);
    } else if (
      event.target.getAttribute("aria-label") === "Go to previous page"
    ) {
      let prevPage = page - 1;
      setPage(prevPage);
    } else {
      setPage(parseInt(event.target.textContent));
    }
  };

  useEffect(() => {
    if (company.length > 0) {
      setMinParams(true);
    }
    if (date.length > 0) {
      setMinParams(true);
    }
    if (transactionType.length > 0) {
      setMinParams(true);
    }
  }, [minParams, company, date, page, transactionType]);

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
              return (
                <Accordion key={transaction.id}>
                  <Accordion.Item
                    eventKey={transaction.id}
                    data={transaction.author}
                  >
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
        <div className="searchResPagination">
          <Stack spacing={2}>
            <Pagination onChange={handleChange} count={pages} size="large" />
          </Stack>
        </div>
        <div className="newSearch">
          <Button variant="text" onClick={newSearch} sx={{ color: "#000000" }}>
            &#171; Ny sökning
          </Button>
        </div>
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
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            select // tell TextField to render select
            label="Typ av transaktion"
          >
            {transactionTypes.map((type) => {
              return (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              );
            })}
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
          <Button type="submit">Sök</Button>
        </Box>
      </div>
    );
  }
};
