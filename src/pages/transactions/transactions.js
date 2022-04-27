import "./transactions.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axiosApiInstance from "../../services/axios-interceptor";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { setTransaction } from "../../redux/reducers/transaction";
import { setTransactions } from "../../redux/reducers/transactions";

import * as React from "react";
import Button from "@mui/material/Button";

import Accordion from "react-bootstrap/Accordion";
import CircularProgress from "@mui/material/CircularProgress";

const Transactions = ({ value }) => {
  const user = useSelector((state) => state.user);
  const transaction = useSelector((state) => state.transaction);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [allResources, setAllResources] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  let i = 0;
  let apiUrl = `${process.env.REACT_APP_RESOURCE_API}/resources`;

  switch (value) {
    case "done":
      apiUrl = `${process.env.REACT_APP_RESOURCE_API}/resources?done=true`;
      break;
    case "open":
      apiUrl = `${process.env.REACT_APP_RESOURCE_API}/resources?done=false`;
      break;
    default:
      apiUrl = `${process.env.REACT_APP_RESOURCE_API}/resources`;
  }

  // let { contextData } = useContext(AuthContext)
  let config = {
    headers: {
      Authorization: "Bearer " + user.accessToken,
    },
  };

  const getResources = async () => {
    try {
      setLoading(true);
      const { data } = await axiosApiInstance.get(apiUrl, config);
      console.log(data);
      setAllResources(data.reverse());
      setResources(data.reverse());
      dispatch(
        setTransactions({
          transactions: data,
          sub: user.user.sub,
        })
      );
      setLoading(false);
    } catch (error) {
      console.log("Error in transactions.js");
    }
  };

  const getId = () => {
    return i++;
  };

  const handleClick = (event) => {
    event.preventDefault();
    switch (event.target.getAttribute("eventKey")) {
      case "done":
        const done = [];
        allResources.map((resource) => {
          if (resource.done) {
            done.push(resource);
          }
          setResources(done.reverse());
          return undefined;
        });
        break;
      case "all":
        let all = [];
        allResources.map((resource) => {
          all.push(resource);
          return undefined;
        });
        setResources(all);
        break;
      default:
        const unhandled = [];
        allResources.map((resource) => {
          if (!resource.done) {
            unhandled.push(resource);
          }
          setResources(unhandled.reverse());
          return undefined;
        });
    }
  };
  useEffect(() => {
    getResources();
  }, []);

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

  return (
    <div className="resourceListContainer">
      <div className="transactionsTopbar">
        
        {value === "all" && <h2>Alla transaktioner</h2>}

        {value === "done" && <h2>Hanterade transaktioner</h2>}
        {value === "open" && <h2>Ohanterade transaktioner</h2>}

        {/* <Button
          onClick={handleClick}
          eventKey="all"
          id="basic-button"
          aria-haspopup="true"
        >
          Alla transaktioner
        </Button>
        <Button
          onClick={handleClick}
          eventKey="done"
          id="basic-button"
          aria-haspopup="true"
        >
          Hanterade
        </Button>
        <Button onClick={handleClick} id="basic-button" aria-haspopup="true">
          Ohanterade
        </Button> */}
      </div>
      {loading ? (
        <CircularProgress className="loadingSpinner" />
      ) : (
        <div className="resourceList">
          {resources.map((resource) => {
            let id = getId();

            return (
              <Accordion key={resource.id}>
                <Accordion.Item eventKey={id} data={resource.author}>
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
    </div>
  );
};

export default Transactions;
