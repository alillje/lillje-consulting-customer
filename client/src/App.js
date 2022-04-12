import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/protected-route";
import Header from "./components/header/header";
import { AuthProvider } from "./context/auth-context";

// pages

import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Dashboard from "./pages/dashboard/dashboard";

import Sidebar from "./components/sidebar/sidebar";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="mainLayout">
          <Header></Header>

          <main>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />

              {/* Protected routes */}
              <Route exact path="/dashboard" element={<ProtectedRoute />}>
                <Route exact path="/dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
