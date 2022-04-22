import "./transactions.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axiosApiInstance from "../../services/axios-interceptor";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import { setTransaction } from "../../redux/reducers/transaction";
import { setTransactions } from "../../redux/reducers/transactions";


import * as React from "react";
import Button from "@mui/material/Button";

import Accordion from "react-bootstrap/Accordion";
import CircularProgress from "@mui/material/CircularProgress";

const Transactions = () => {
  const user = useSelector((state) => state.user);
  const transaction = useSelector((state) => state.transaction);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [allResources, setAllResources] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  let i = 0;

  // let { contextData } = useContext(AuthContext)
  let config = {
    headers: {
      Authorization: "Bearer " + user.accessToken,
    },
  };

  const getResources = async () => {
    try {
      setLoading(true);
      const { data } = await axiosApiInstance.get(
        "http://localhost:9000/api/v1/resources",
        config
      );
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
      console.log("Error in transaction.js");
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
        let all = []
        allResources.map((resource) => {
            all.push(resource);
            return undefined;
        })
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
        <Button
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
        </Button>
      </div>
      {loading ? (
        <CircularProgress className="loadingSpinner" />
      ) : (
        <div className="resourceList">
          {resources.map((resource) => {
            let id = getId();
            let resourceDate = dayjs(resource?.invoiceDate).format(
              "YYYY/MM/DD"
            );
            return (
              <Accordion key={resource.id}>
                <Accordion.Item eventKey={id} data={resource.author}>
                  <Accordion.Header>
                    {resource?.company} - {resourceDate}
                  </Accordion.Header>
                  <Accordion.Body>Företag: {resource?.company}</Accordion.Body>
                  <Accordion.Body>
                    Beskrivning: {resource.description}
                  </Accordion.Body>
                  <Accordion.Body>Fakturadatum: {resourceDate}</Accordion.Body>
                  <Accordion.Body>
                    <Button data={resource.id} onClick={goToTransaction}>
                      Visa detaljer
                    </Button>

                    <Link to={`/transactions/${resource.id}`}>
                      Visa detaljer
                    </Link>
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
