import "./transactions.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axiosApiInstance from "../../services/axios-interceptor";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/reducers/user";

import { setTransaction } from "../../redux/reducers/transaction";
import { setTransactions } from "../../redux/reducers/transactions";

import * as React from "react";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import Accordion from "react-bootstrap/Accordion";
import CircularProgress from "@mui/material/CircularProgress";

const Transactions = (props) => {
  const user = useSelector((state) => state.user);
  const customer = useSelector((state) => state.customer);
  let value = props.value ? props.value : null;
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);
  let limit = 10;
  let apiUrl = `${process.env.REACT_APP_RESOURCE_API}/resources?page=${page}&limit=${limit}`;

  let config = {
    headers: {
      Authorization: "Bearer " + user.accessToken,
    },
  };

  const getResources = async () => {
    let url = apiUrl;
    if (user.admin) {
      url = `${apiUrl}&author=${customer.id}`;
    }
    if (user.admin && status !== "all" && status.length > 0) {
      url = `${apiUrl}&author=${customer.id}&done=${status}`;
    } else if (value && value === "done") {
      url = `${apiUrl}&done=true`;
    } else if (value && value === "open") {
      url = `${apiUrl}&done=false`;
    } else if (value && value === "leverantorsfakturor") {
      url = `${apiUrl}&transactionType=Leverantörsfaktura`;
    } else if (value && value === "kundfakturor") {
      url = `${apiUrl}&transactionType=Kundfaktura`;
    } else if (value && value === "utlagg") {
      url = `${apiUrl}&transactionType=Utlägg`;
    }
    try {
      setLoading(true);
      const { data } = await axiosApiInstance.get(url, config);

      setResources(data.resources);
      setPages(data.pages);
      dispatch(
        setTransactions({
          transactions: data.resources,
          sub: user.user.sub,
        })
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      dispatch(logout());
      console.log("Error in transactions.js");
    }
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

  const goToTransaction = (event) => {
    event.preventDefault();
    dispatch(
      setTransaction({
        id: event.target.getAttribute("data"),
        sub: user.user.sub,
      })
    );
    user.admin
      ? navigate(`/admin/transactions/${event.target.getAttribute("data")}`)
      : navigate(`/transactions/${event.target.getAttribute("data")}`);
  };

  const setValue = (event) => {
    switch (event.target.value) {
      case "done":
        setStatus("true");
        break;
      case "open":
        setStatus("false");
        break;
      default:
        setStatus("");
    }
  };

  useEffect(() => {
    getResources();
  }, [page, value, status]);

  return (
    <div className="resourceListContainer">
      <div className="transactionsHeader">
        {user.admin && <h3>Transaktioner för {customer.company}</h3>}
      </div>

      {customer && (
        <div className="transactionsHeader">
          {value === "all" && <h2>Alla transaktioner</h2>}

          {value === "done" && <h2>Hanterade transaktioner</h2>}
          {value === "open" && <h2>Ohanterade transaktioner</h2>}
          {value === "leverantorsfakturor" && <h2>Leveranörsfakturor</h2>}
          {value === "kundfakturor" && <h2>Kundfakturor</h2>}
          {value === "utlagg" && <h2>Utlägg</h2>}


        </div>
      )}
      {user.admin && (
        <div className="transactionsTopbar">
          <Button
            onClick={setValue}
            value="all"
            id="basic-button"
            aria-haspopup="true"
          >
            Alla transaktioner
          </Button>
          <Button
            onClick={setValue}
            value="done"
            id="basic-button"
            aria-haspopup="true"
          >
            Hanterade
          </Button>
          <Button
            onClick={setValue}
            value="open"
            id="basic-button"
            aria-haspopup="true"
          >
            Ohanterade
          </Button>
        </div>
      )}
      {loading ? (
        <CircularProgress className="loadingSpinner" />
      ) : (
        <div className="resourceList">
          {resources.map((resource) => {
            return (
              <Accordion key={resource.id}>
                <Accordion.Item eventKey={resource.id} data={resource.author}>
                  <Accordion.Header>
                    {resource?.company} -{" "}
                    {dayjs.unix(resource?.invoiceDate).format("YYYY/MM/DD")}
                  </Accordion.Header>
                  <Accordion.Body>Företag: {resource?.company}</Accordion.Body>
                  <Accordion.Body>
                    Beskrivning: {resource.description}
                  </Accordion.Body>
                  <Accordion.Body>
                    Fakturadatum:{" "}
                    {dayjs.unix(resource?.invoiceDate).format("YYYY/MM/DD")}
                  </Accordion.Body>
                  <Accordion.Body>
                    <Button data={resource.id} onClick={goToTransaction}>
                      Visa detaljer
                    </Button>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            );
          })}
        </div>
      )}

      {pages > 0 && (
        <div className="transactionsPagination">
          <Stack spacing={2}>
            <Pagination onChange={handleChange} count={pages} size="large" />
          </Stack>
        </div>
      )}
    </div>
  );
};

export default Transactions;
