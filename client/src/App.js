import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/protected-route";
import Header from "./components/header/header";
import { AuthProvider } from "./context/auth-context";

// pages

import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="mainLayout">
          <Header></Header>

          <main>
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />

              {/* Protected routes */}
              <Route exact path="/" element={<ProtectedRoute />}>
                <Route exact path="/" element={<Home />} />
              </Route>
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
