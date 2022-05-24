import './App.css'
import * as React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Private routes
import ProtectedRoute from './utils/protected-route'
import AdminRoute from './utils/admin-route'

// Customer Pages
import Layout from './components/layout/layout'
import Login from './pages/login/login'
import Dashboard from './pages/dashboard/dashboard'
import MyPages from './pages/my-pages/my-pages'
import Transaction from './pages/transaction/transaction'
import Transactions from './pages/transactions/transactions'
import TransactionsSearch from './pages/transactions-search/transactions-search'
import RegisterTransaction from './pages/register-transactions/register-transaction'
import UpdateCredentials from './pages/update-credentials/update-credentials'
import UpdatePassword from './pages/update-password/update-password'

// Admin Pages
import AdminTransactions from './pages/admin-transactions/admin-transactions'
import AdminCustomers from './pages/admin-customers/admin-customers'
import AdminCustomer from './pages/admin-customer/admin-customer'
import RegisterCustomer from './pages/register-customer/register-customer'
import AdminTransactionsSearch from './pages/admin-transactions-search/admin-transactions-search'
import PdfViewer from './components/pdf-viewer/pdf-viewer'
import AdminResetCustomerPassword from './pages/admin-reset-customer-password/admin-reset-customer-password'

// Error Page
import Error from './pages/error/error'

/**
 * App Component.
 * Represents the application and contains all components.
 *
 * @returns {React.ReactElement} - App Component.
 */
function App () {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />

        {/* Protected routes */}

        <Route element={<ProtectedRoute />}>
          <Route exact path="/" element={<Layout><Dashboard /></Layout>} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            exact
            path="/documents/:id"
            element={<Layout><PdfViewer /></Layout>}
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            exact
            path="/dashboard"
            element={<Layout><Dashboard /></Layout>}
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            exact
            path="/mina-uppgifter"
            element={<Layout><MyPages /></Layout>}
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            exact
            path="/mina-uppgifter/losenord/uppdatera"
            element={<Layout><UpdatePassword /></Layout>}
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            exact
            path="/mina-uppgifter/uppdatera"
            element={<Layout><UpdateCredentials /></Layout>}
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            path="/transactions/:id"
            element={<Layout><Transaction /></Layout>}
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            exact
            path="/transactions"
            element={<Layout><Transactions value="all" /></Layout>}
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            exact
            path="/transactions/register"
            element={<Layout><RegisterTransaction /></Layout>}
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            exact
            path="/transactions/done"
            element={<Layout><Transactions value="done" /></Layout>}
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            exact
            path="/transactions/open"
            element={<Layout><Transactions value="open" /></Layout>}
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            exact
            path="/transactions/leverantorsfakturor"
            element={
              <Layout><Transactions value="leverantorsfakturor" /></Layout>
            }
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            exact
            path="/transactions/kundfakturor"
            element={
              <Layout><Transactions value="kundfakturor" /></Layout>
            }
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            exact
            path="/transactions/utlagg"
            element={<Layout><Transactions value="utlagg" /></Layout>}
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            exact
            path="/transactions/search"
            element={<Layout><TransactionsSearch /></Layout>}
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route
            exact
            path="/admin/dashboard"
            element={<Layout><Dashboard /></Layout>}
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route
            exact
            path="/admin/documents/:id"
            element={<Layout><PdfViewer /></Layout>}
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route
            exact
            path="/admin/transactions"
            element={<Layout><AdminTransactions /></Layout>}
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route
            exact
            path="/admin/transactions/search"
            element={<Layout><AdminTransactionsSearch /></Layout>}
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route
            exact
            path="/admin/customers"
            element={<Layout><AdminCustomers /> </Layout>}
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route
            exact
            path="/admin/customers/register"
            element={<Layout><RegisterCustomer /></Layout>}
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route
            exact
            path="/admin/customers/:id"
            element={<Layout><AdminCustomer /></Layout>}
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route
            exact
            path="/admin/customers/:id/transactions"
            element={<Layout><Transactions /></Layout>}
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route
            exact
            path="/admin/transactions/:id"
            element={<Layout><Transaction /></Layout>}
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route
            exact
            path="/admin/mina-uppgifter/losenord/uppdatera"
            element={<Layout><UpdatePassword /></Layout>}
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route
            exact
            path="/admin/mina-uppgifter/uppdatera"
            element={<Layout><UpdateCredentials /></Layout>}
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route
            exact
            path="/admin/mina-uppgifter"
            element={<Layout><MyPages /></Layout>}
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route
            exact
            path="/admin/customer/losenord/uppdatera"
            element={<Layout><AdminResetCustomerPassword /></Layout>}
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route exact path="*" element={<Layout><Error /></Layout>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
