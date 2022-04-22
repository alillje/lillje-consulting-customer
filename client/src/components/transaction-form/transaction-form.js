import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import "./transaction-form.css"

const TransactionForm = () => {
  const [value, setValue] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <div className="trasactionFormHeader">
          <h5>        Registrera ny transaktion
</h5>
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
          required
        />
        <TextField
          id="outlined-basic"
          label="Beskrivning"
          variant="outlined"
          required
        />
        <TextField
          id="outlined-basic"
          label="Belopp"
          variant="outlined"
          required
        />
        <TextField
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
          required
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit">Registrera</Button>
      </Box>
    </>
  );
};

export default TransactionForm;
