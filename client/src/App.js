import "./App.css";


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/protected-route";
import Header from "./components/header/header";

// Pages
import Layout from "./components/layout/layout";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Dashboard from "./pages/dashboard/dashboard";
import Transaction from "./pages/transaction/transaction";
import Transactions from "./pages/transactions/transactions";
import RegisterTransaction from "./pages/register-transactions/register-transaction";


function App() {

  return (
    <Router>

          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route
                exact
                path="/dashboard"
                element={<Layout children={<Dashboard />} />}
              />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route
                path="/transactions/:id"
                element={<Layout children={<Transaction />} />}
              />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route
                exact
                path="/transactions"
                element={<Layout children={<Transactions />} />}
              />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route
                exact
                path="/transactions/register"
                element={<Layout children={<RegisterTransaction />} />}
              />
            </Route>
          </Routes>
    </Router>
  );
}

export default App;
