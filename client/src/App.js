import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from './utils/private-route'
import Header from "./components/header/header"

// pages

import Login from './pages/login/login'
import Register from './pages/register/register'


function App() {
  return (
    <Router>
    <div className="mainLayout">
      <Header></Header>

        <main>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            {/* Protected routes */}
            <Route exact path='/register' element={<ProtectedRoute/>}>
              <Route exact path='/register' element={<Register/>}/>
            </Route>
          </Routes>
        </main>
        </div>

    </Router>
  );
}

export default App;
