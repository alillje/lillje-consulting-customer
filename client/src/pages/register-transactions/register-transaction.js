import "./register-transaction.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosApiInstance from "../../services/axios-interceptor";

import TransactionForm from "../../components/transaction-form/transaction-form";


const RegisterTransaction = () => {
  const [date, setDate] = useState(null);
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");


  // let { contextData } = useContext(AuthContext)
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const registerTransaction = async (event) => {
    event.preventDefault();
    const reqBody = {
      description: description,
      company: company,
      author: user.user.sub,
      date: new Date(event.target.date.value),
    };

    let reqHeaders = {
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    };
    try {
      const { data } = await axiosApiInstance.post(
        "http://localhost:9000/api/v1/resources",
        reqBody,
        reqHeaders
      );
      setDescription("")
    } catch (error) {
      console.log(error);
      console.log("Error in transaction/register");
    }
  };

  return (

    <TransactionForm />

  );
};

export default RegisterTransaction;


/* <h1>Welcome to registrera transaktion, {user.user?.username}</h1>
<form onSubmit={registerTransaction}>
  <input
    placeholder="Beskrivning"
    type="text"
    name="description"
    value={description}
    onChange={(event) => setDescription(event.target.value)}
    required
  ></input>
          <input
    placeholder="Företag"
    type="text"
    name="company"
    value={company}
    onChange={(event) => setCompany(event.target.value)}
    required
  ></input>
  <input placeholder="Datum" type="date" name="date" required></input>
  <button type="submit">Registrera transaktion</button>
</form>
</div> */