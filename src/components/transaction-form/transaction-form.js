import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import "./transaction-form.css";
import axiosApiInstance from "../../services/axios-interceptor";
import axios from "axios";

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
  const [transactionCategory, setTransactionCategory] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [viewCategories, setViewCategories] = useState(true);
  const [file, setFile] = useState();

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [minParams, setMinParams] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const transactionTypes = ["Leverantörsfaktura", "Kundfaktura", "Utlägg"];
  const transactionCategories = [
    "Bensin",
    "Material",
    "Mobil",
    "Internet",
    "Försäkring",
    "Övrigt"
    ];


  const handleSubmit = async (event) => {
    event.preventDefault();
    let fileUrl = ""
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
      const dataRes = await axios.post(
        process.env.REACT_APP_CLOUDINARY_UPLOAD,
        formData
      );
      fileUrl = dataRes.data.url;
    }



    const reqBody = {
      description: validator.escape(description),
      authorName: user.company,
      company: validator.escape(company),
      transactionType: validator.escape(transactionType),
      transactionCategory: transactionType !== "Leverantörsfaktura" ? validator.escape(transactionCategory) : "Försäljning",
      amount: validator.escape(amount),
      author: validator.escape(user.user.sub),
      date: new Date(date).getTime() / 1000,
      documentUrl: fileUrl
    };
    let reqHeaders = {
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
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
        navigate(`/transactions/${data.id}`, { state: {message: "Transaktionen har registrerats"} });
      } catch (error) {
        console.log(error);
        console.log("Error in transaction/register");
        setLoading(false);
        setErrorMessage("Ett oväntat fel inträffade");
      }
    } else {
      setErrorMessage(
        "Alla fält måste fyllas i för att kunna registrera en ny transaktion"
      );
    }
  };

  useEffect(() => {
    if (transactionType === "Leverantörsfaktura") {
      setViewCategories(true);
    } else if (transactionType !== "Leverantörsfaktura") {
      setViewCategories(false);
    }

    if (
      company.length > 0 &&
      date.length > 0 &&
      amount.length > 0 &&
      description.length > 0
    ) {
      setMinParams(true);
    } else {
      setMinParams(false);
    }
  }, [minParams, company, date, amount, description, transactionType, viewCategories]);

  return loading ? (
    <CircularProgress />
  ) : (
    <div>
              {errorMessage && (
          <Alert severity="info" className="searchErrorMessage">
            <AlertTitle>Ett fel inträffade</AlertTitle>
            {errorMessage}
          </Alert>
        )}
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
          value={transactionType}
          onChange={(event) => setTransactionType(event.target.value)}
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
        {viewCategories && (
          <TextField
            value={transactionCategory}
            onChange={(event) => setTransactionCategory(event.target.value)}
            select // tell TextField to render select
            label="Kategori"
          >
            {transactionCategories.map((category) => {
              return (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ) 
            })}
          </TextField>
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
                  <TextField
                  type="file"
                    className="position-relative mt-2"
                    name="file"
                    accept="image/png, image.jpg, application/pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    id="validationFormik107"
                    feedbackTooltip
                  />

        <Button type="submit">Registrera transaktion</Button>
      </Box>
    </div>
  );
};

export default TransactionForm;
