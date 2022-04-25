import "./transaction.css";
import { useState, useEffect } from "react"
import TransactionCard from "../../components/transaction-card/transaction-card"
import { useSelector, useDispatch } from "react-redux";
import axiosApiInstance from "../../services/axios-interceptor";
import { useNavigate } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";



const Transaction = () => {
    const transaction = useSelector((state) => state.transaction);
    const user = useSelector((state) => state.user);
    const [data, setData] = useState(null)
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);


    let config = {
        headers: {
          Authorization: "Bearer " + user.accessToken,
        },
      };

    const getTransaction = async () => {
        try {
          setLoading(true);
          const { data } = await axiosApiInstance.get(
            `http://localhost:9000/api/v1/resources/${transaction.id}`,
            config
          );
            setData(data)
          setLoading(false);
        } catch (error) {

        user.auth ? navigate('/error') : navigate('/login')
          console.log("Error in transaction.js");
        }
      };
    

    useEffect(() => {
        if (transaction) {
        getTransaction();
        } else {
            setLoading(false);
        }
      }, []);

    return (
        
        <div>
        {loading ? <CircularProgress /> : <TransactionCard transaction={data} />}
        </div>

    )
  
};

export default Transaction;
