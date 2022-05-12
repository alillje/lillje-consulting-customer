import "./transaction.css";
import { useState, useEffect } from "react"
import TransactionCard from "../../components/transaction-card/transaction-card"
import { useSelector } from "react-redux";
import axiosApiInstance from "../../services/axios-interceptor";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../redux/reducers/user";
import { useDispatch } from "react-redux";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';



import CircularProgress from "@mui/material/CircularProgress";



const Transaction = () => {
    const transaction = useSelector((state) => state.transaction);
    const user = useSelector((state) => state.user);
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    const location = useLocation();
    const dispatch = useDispatch();


    let config = {
        headers: {
          Authorization: "Bearer " + user.accessToken,
        },
      };

    const getTransaction = async () => {
        try {
          setLoading(true);
          const { data } = await axiosApiInstance.get(
            `${process.env.REACT_APP_RESOURCE_API}/resources/${transaction.id}`,
            config
          );
            setData(data)
          setLoading(false);
        } catch (error) {
          console.log("Error in transaction.js");

          if (error.status === 401) {
            dispatch(
              logout()
            );
          } else {
        user.auth ? navigate('/error') : navigate('/login')
          }
        }
      };
    

    useEffect(() => {
      console.log(location.state?.message)
        if (transaction) {
        getTransaction();
        } else {
            setLoading(false);
        }
      }, []);

    return (
        
        <div>
           {location.state?.message &&       <Alert severity="success">
        <AlertTitle>{location.state?.message}</AlertTitle>
      </Alert>}
        {loading ? <CircularProgress /> : <TransactionCard transaction={data} />}
        </div>

    )
  
};

export default Transaction;
