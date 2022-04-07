import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/header/header"

// pages

import Login from './pages/login/login'

function App() {
  return (
    <Router>
    <div className="mainLayout">
      <Header></Header>

        <main>
          <Routes>
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </main>
        </div>

    </Router>
  );
}

export default App;
