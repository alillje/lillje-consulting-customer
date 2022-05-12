import "./App.css";


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/protected-route";
import AdminRoute from "./utils/admin-route";

// Customer Pages
import Layout from "./components/layout/layout";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Dashboard from "./pages/dashboard/dashboard";
import MyPages from "./pages/my-pages/my-pages";

import Transaction from "./pages/transaction/transaction";
import Transactions from "./pages/transactions/transactions";
import TransactionsSearch from "./pages/transactions-search/transactions-search";
import RegisterTransaction from "./pages/register-transactions/register-transaction";
import UpdateCredentials from "./pages/update-credentials/update-credentials";
import UpdatePassword from "./pages/update-password/update-password";

// Admin Pages
import AdminTransactions from "./pages/admin-transactions/admin-transactions";
import AdminCustomers from "./pages/admin-customers/admin-customers";
import AdminCustomer from "./pages/admin-customer/admin-customer";
import RegisterCustomer from "./pages/register-customer/register-customer";

import AdminCustomerTransaction from "./pages/admin-customer-transaction/admin-customer-transaction";

// Error
import Error from "./pages/error/error";


function App() {

  return (
    <Router>

          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />

            {/* Protected routes */}

            <Route element={<ProtectedRoute />}>
              <Route
                exact
                path="/"
                element={<Layout children={<Dashboard />} />}
              />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route
                exact
                path="/dashboard"
                element={<Layout children={<Dashboard />} />}
              />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route
                exact
                path="/mina-uppgifter"
                element={<Layout children={<MyPages />} />}
              />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route
                exact
                path="/mina-uppgifter/password/uppdatera"
                element={<Layout children={<UpdatePassword />} />}
              />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route
                exact
                path="/mina-uppgifter/uppdatera"
                element={<Layout children={<UpdateCredentials />} />}
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
                element={<Layout children={<Transactions value="all" />} />}
              />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route
                exact
                path="/transactions/register"
                element={<Layout children={<RegisterTransaction />} />}
              />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route
                exact
                path="/transactions/done"
                element={<Layout children={<Transactions value='done' />} />}
              />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route
                exact
                path="/transactions/open"
                element={<Layout children={<Transactions value='open' />} />}
              />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route
                exact
                path="/transactions/leverantorsfakturor"
                element={<Layout children={<Transactions value='leverantorsfakturor' />} />}
              />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route
                exact
                path="/transactions/kundfakturor"
                element={<Layout children={<Transactions value='kundfakturor' />} />}
              />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route
                exact
                path="/transactions/utlagg"
                element={<Layout children={<Transactions value='utlagg' />} />}
              />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route
                exact
                path="/transactions/search"
                element={<Layout children={<TransactionsSearch />} />}
              />
            </Route>

            <Route element={<AdminRoute />}>
              <Route
                exact
                path="/admin/dashboard"
                element={<Layout children={<Dashboard />} />}
              />
            </Route>
            <Route element={<AdminRoute />}>
              <Route
                exact
                path="/admin/transactions"
                element={<Layout children={<AdminTransactions />} />}
              />
            </Route>

            <Route element={<AdminRoute />}>
              <Route
                exact
                path="/admin/transactions/search"
                element={<Layout children={<TransactionsSearch />} />}
              />
            </Route>

            <Route element={<AdminRoute />}>
              <Route
                exact
                path="/admin/customers"
                element={<Layout children={<AdminCustomers />} />}
              />
            </Route>

            <Route element={<AdminRoute />}>
              <Route
                exact
                path="/admin/customers/register"
                element={<Layout children={<RegisterCustomer />} />}
              />
            </Route>

            <Route element={<AdminRoute />}>
              <Route
                exact
                path="/admin/customers/:id"
                element={<Layout children={<AdminCustomer />} />}
              />
            </Route>

            <Route element={<AdminRoute />}>
              <Route
                exact
                path="/admin/customers/:id/transactions"
                element={<Layout children={<Transactions />} />}
              />
            </Route>

            <Route element={<AdminRoute />}>
              <Route
                exact
                path="/admin/transactions/:id"
                element={<Layout children={<Transaction />} />}
              />
            </Route>

            <Route element={<AdminRoute />}>
              <Route
                exact
                path="/admin/mina-uppgifter"
                element={<Layout children={<MyPages />} />}
              />
            </Route>


            <Route element={<ProtectedRoute />}>
              <Route
                exact
                path="*"
                element={<Layout children={<Error />} />}
              />
            </Route>
          </Routes>
    </Router>
  );
}

export default App;
