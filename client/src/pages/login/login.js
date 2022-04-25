import "./login.css";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";

import { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Topbar from "../../components/topbar/topbar";

// Import redux config
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login } from "../../redux/reducers/user";
import { loginHandler } from "../../services/login-service";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  /**
   * Handles login. Contacts auth service.
   * Set state i redux.
   *
   * @param {Object} event - an event Object
   */
  const handleLogin = async (event) => {
    event.preventDefault();

    const userData = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    try {
      if (await loginHandler(userData)) {
        navigate("/dashboard");

      }
      
      setUsername("");
      setPassword("");
    } catch (error) {

      console.log(error);
    }
  };
  const userLoggedIn = useSelector((state) => state.user.auth);

  return userLoggedIn ? (
    <Navigate to="/dashboard" />
  ) : (
    <div className="loginLayoutContainer">
      <div className="loginLayoutHeader">
        <Topbar />
      </div>
      <div className="loginLayoutLeft"></div>

      <div className="mainLogin">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary" }}>
            <LockTwoToneIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Logga in
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleLogin}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              type="text"
              name="username"
              label="Username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              name="password"
              label="Lösenord"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#000428" }}
            >
              Logga in
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
      </div>
      <div className="loginLayoutRight"></div>
    </div>
  );
};

export default Login;

// (
//   <div className="loginContainer">
//     <form onSubmit={handleLogin}>
//       <label htmlFor="username">Username{user}</label>
//       <input
//         value={username}
//         onChange={(event) => setUsername(event.target.value)}
//         type="text"
//         name="username"
//         className=""
//       ></input>
//       <label htmlFor="password">Password</label>

//       <input
//         value={password}
//         onChange={(event) => setPassword(event.target.value)}
//         type="password"
//         name="password"
//         className=""
//       ></input>
//       <button type="submit" name="submit" className="">
//         Logga in
//       </button>
//     </form>
//   </div>
// );

// let {loginUser} = useContext(AuthContext)}
// const [username, setUsername] = useState("");
// const [password, setPassword] = useState("");
// const [authToken, setAuthToken] = useState(null)
// const [user, setUser] = useState(null);
// const [error, setError] = useState(false);

// const loginHandler = async (event) => {
//     event.preventDefault();

//     const user = {
//       username: username,
//       password: password
//     }
//     // Request auth
//     try {
//       const response = await fetch("/api/v1/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(user),
//       });

//       const data = await response.json();
//       if (response === 200) {
//       localStorage.setItem("lc_ab_mb_token", data.access_token);
//       setAuthToken(data)
//       setUser(data.access_token)
//       }

//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

// return (
//   <div className="loginContainer">
//       <div className="loginTitle">
//       <h2>Logga in</h2>
//       </div>
//       <div className="loginFormContainer">
// <Form className="loginForm" onSubmit={loginHandler}>
// <Form.Group className="mb-3" controlId="formBasicEmail">
// <Form.Label>Användarnamn</Form.Label>
// <Form.Control
// type="username"
// placeholder="Användarnamn"
// value={username}
// onChange={(event) => setUsername(event.target.value)} />
// <Form.Text className="text-muted">
// </Form.Text>
// </Form.Group>

// <Form.Group className="mb-3" controlId="formBasicPassword">
// <Form.Label>Lösenord</Form.Label>
// <Form.Control
// type="password"
// placeholder="Lösenord"
// value={password}
// onChange={(event) => setPassword(event.target.value)} />
// </Form.Group>

// <Button variant="secondary" type="submit">
// Logga in
// </Button>
// </Form>
// </div>
// </div>
// )

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   let { contextData } = useContext(AuthContext)

//     return (
//         <div className="loginContainer">
//             <div className="loginTitle">
//             <h2>Logga in</h2>
//             </div>
//             <div className="loginFormContainer">
//     <Form className="loginForm" onSubmit={contextData.loginUser}>
//   <Form.Group className="mb-3" controlId="formBasicEmail">
//     <Form.Label>Användarnamn</Form.Label>
//     <Form.Control
// value={username} name="username"
// onChange={(event) => setUsername(event.target.value)}
//     type="username"
//     placeholder="Användarnamn" />
//     <Form.Text className="text-muted">
//     </Form.Text>
//   </Form.Group>

//   <Form.Group className="mb-3" controlId="formBasicPassword">
//     <Form.Label>Lösenord</Form.Label>
//     <Form.Control
//     name="password"
// value={password}
// onChange={(event) => setPassword(event.target.value)}
//     type="password"
//     placeholder="Lösenord" />
//   </Form.Group>

//   <Button variant="secondary" type="submit">
//     Logga in
//   </Button>
// </Form>
// </div>
// </div>
//     )
// }
